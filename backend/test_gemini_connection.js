const axios = require('axios');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

dotenv.config();

async function testGemini() {
    let logBuffer = "";
    const log = (msg) => {
        console.log(msg);
        logBuffer += msg + "\n";
    };

    log("---------------------------------------------------");
    log("       GEMINI CONNECTION DIAGNOSTIC TOOL           ");
    log("---------------------------------------------------");

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        log("CRITCAL: No GEMINI_API_KEY found in .env");
        fs.writeFileSync('gemini_test_result.txt', logBuffer);
        return;
    }
    log("API Key Status: PRESENT");

    // 1. Check Available Models (GET /models)
    log("\n>>> Checking Available Models (GET /models)...");
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    try {
        const listRes = await axios.get(listUrl);
        if (listRes.status === 200) {
            log("✅ API Key is Valid. Available Models:");
            const models = listRes.data.models || [];
            if (models.length === 0) log("   (No models returned)");
            models.forEach(m => log(`   - ${m.name}`));
        }
    } catch (err) {
        log("❌ Failed to list models.");
        if (err.response) {
            log(`   Status: ${err.response.status}`);
            log(`   Data: ${JSON.stringify(err.response.data)}`);
        } else {
            log(`   Error: ${err.message}`);
        }
    }

    // 2. Probe Models for Content Generation
    const modelsToProbe = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-pro",
        "gemini-1.5-pro",
        "gemini-1.0-pro"
    ];

    let validModel = null;
    log("\n>>> Probing Models for Content Generation...");

    for (const model of modelsToProbe) {
        log(`Testing '${model}'... `);
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        try {
            const response = await axios.post(url, {
                contents: [{ parts: [{ text: "Hello" }] }]
            });

            if (response.status === 200) {
                log("✅ SUCCESS");
                validModel = model;
                break;
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) log("❌ Not Found (404)");
                else if (error.response.status === 403) log("⛔ Permission Denied (403)");
                else log(`❌ Failed (${error.response.status})`);
            } else {
                log(`❌ Network Error: ${error.message}`);
            }
        }
    }

    if (validModel) {
        log(`\n---------------------------------------------------`);
        log(`RECOMMENDATION: Use model '${validModel}'`);
        log(`---------------------------------------------------`);
        // Verify with SDK
        log("\n>>> Final Verification with Google SDK...");
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: validModel });
            const result = await model.generateContent("Say 'System Operational'");
            log("SDK Response: " + result.response.text().trim());
            log("SYSTEM STATUS: 🟢 OPERATIONAL");
        } catch (e) {
            log("SDK Error: " + e.message);
        }
    } else {
        log(`\n---------------------------------------------------`);
        log("FATAL: No working models found for this API Key.");
        log("Please create a new key at https://aistudio.google.com");
        log(`---------------------------------------------------`);
    }

    fs.writeFileSync('gemini_test_result.txt', logBuffer);
}

testGemini();
