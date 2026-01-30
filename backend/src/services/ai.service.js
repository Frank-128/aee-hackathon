const { generateAIResponse } = require('../config/gemini');

// Helper to clean JSON string from LLM
const parseJSON = (text) => {
  try {
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("JSON Parse Error:", text);
    throw new Error("Invalid AI Response Format");
  }
};

const getCropActivity = async (location) => {
  const prompt = `
    You are an expert agricultural planning AI.
    Using ONLY the following information:
    - Location State: ${location.state}

    Independently determine:
    - Current season in this region
    - Typical current weather conditions
    - Ongoing agricultural cycle

    Based on your analysis, predict:
    1. Best crop-related activity to perform now
    2. Crop name
    3. Reason for recommendation
    4. Expected benefit for the farmer

    Respond strictly in JSON:
    {
      "location": "${location.state || 'Unknown'}",
      "inferredSeason": "",
      "recommendedActivity": "",
      "crop": "",
      "reason": "",
      "expectedBenefit": ""
    }`;

  const response = await generateAIResponse(prompt);
  return parseJSON(response);
};

const getAverageMarketPrice = async (location) => {
  const prompt = `
    You are an agricultural market intelligence AI.
    Using ONLY:
    - Location: ${JSON.stringify(location)}

    Automatically infer:
    - Crops currently being traded
    - Current season and supply levels
    - Typical mandi demand trends

    Predict the average market prices of the TOP traded crops.

    Respond strictly in JSON:
    {
      "location": "${location.state || 'Unknown'}",
      "marketDate": "inferred",
      "averagePrices": [
        {
          "crop": "",
          "averagePrice": "",
          "unit": "INR per kg",
          "confidence": ""
        }
      ]
    }`;

  const response = await generateAIResponse(prompt);
  return parseJSON(response);
};

const getBestCropToday = async (location) => {
  const prompt = `
    You are a real-time agricultural decision-making AI.
    Given ONLY:
    - Location: ${JSON.stringify(location)}

    Automatically determine:
    - Today's date
    - Current demand–supply balance
    - Ongoing harvest cycles
    - Market urgency

    Identify:
    1. Best crop to sell TODAY
    2. Best expected selling price
    3. Reason for selection

    Respond in JSON only:
    {
      "location": "${location.state || 'Unknown'}",
      "bestCropToday": "",
      "recommendedPrice": "",
      "unit": "INR per kg",
      "reason": ""
    }`;

  const response = await generateAIResponse(prompt);
  return parseJSON(response);
};

const getBestSellingWindow = async (location) => {
  const prompt = `
    You are an agricultural market timing AI.
    Using ONLY:
    - Location: ${JSON.stringify(location)}

    Automatically infer:
    - Major crops grown
    - Seasonal harvest timelines
    - Expected price fluctuations

    Predict:
    - Best future selling window for maximum profit
    - Expected price behavior

    Return JSON only:
    {
      "location": "${location.state || 'Unknown'}",
      "recommendedCrop": "",
      "bestSellingWindow": {
        "startDate": "",
        "endDate": ""
      },
      "expectedPriceRange": "",
      "reason": ""
    }`;

  const response = await generateAIResponse(prompt);
  return parseJSON(response);
};

const getHighDemandForecast = async (location) => {
  const prompt = `
    You are an agricultural demand forecasting AI.
    Using ONLY:
    - Location: ${JSON.stringify(location)}

    Automatically infer:
    - Upcoming festivals / consumption cycles
    - Seasonal demand shifts
    - Historical demand behavior

    Predict crops likely to experience HIGH demand in the near future.

    Respond strictly in JSON:
    {
      "location": "${location.state || 'Unknown'}",
      "forecastPeriod": "next 30 days",
      "highDemandCrops": [
        {
          "crop": "",
          "expectedDemandLevel": "High | Medium",
          "reason": ""
        }
      ]
    }`;

  const response = await generateAIResponse(prompt);
  return parseJSON(response);
};

module.exports = {
  getCropActivity,
  getAverageMarketPrice,
  getBestCropToday,
  getBestSellingWindow,
  getHighDemandForecast
};
