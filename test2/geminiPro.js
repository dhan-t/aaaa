import { GoogleGenerativeAI  } from "@google/generative-ai";

const API_KEY = "AIzaSyAt3zWIVKFvCJqh2l_vCwL_8FI9uv0jTYA";
const genAI = new GoogleGenerativeAI(API_KEY);

var text = "";

const runGenerativeAI = async (prompt) => {
    const model = genAI.getGenerativeModel({model : "gemini-pro"});

    const result = await model.generateContent(prompt); // Prompt is the text input
    const response = await result.response;
    text = response.text();
    return text;
}

export { runGenerativeAI };