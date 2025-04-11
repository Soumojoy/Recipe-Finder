import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(ingredients) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
    const prompt = `I have the following ingredients: ${ingredients}. Suggest 3 easy recipes I can make. `;
  
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();
  
    return text; // just return the full response text
  }
  

// GET endpoint to handle recipe search
app.get('/recipes', async (req, res) => {
  const ingredients = req.query.ingredients;

  if (!ingredients) {
    return res.status(400).json({ success: false, error: 'No ingredients provided' });
  }

  try {
    const recipes = await run(ingredients);
    res.json({ success: true, data: recipes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(5000, () => {
  console.log('🚀 Server is running at http://localhost:5000');
});
