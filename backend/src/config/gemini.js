const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-2.5-flash-lite" });

const generateAIResponse = async (prompt) => {
    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        });
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Error Details:", error);
        throw new Error(`AI Error: ${error.message} (Model: ${process.env.GEMINI_MODEL || "gemini-2.5-flash-lite"})`);
    }
};

module.exports = { generateAIResponse, model };
