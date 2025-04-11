import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Use the correct model that works with v1beta
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run() {
  const prompt = "Tell me abot delle ali ";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  console.log("🪐", text);
}

run();

