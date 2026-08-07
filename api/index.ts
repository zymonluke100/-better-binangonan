import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || '';
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API Route: Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Better Binangonan', environment: 'Vercel Serverless' });
});

// API Route: AI Assistant for Binangonan Residents
app.post('/api/binangonan/ai-assistant', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message text is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.json({
        reply: `Mabuhay! I am Binangonan's Resident AI Assistant. To activate live AI responses on Vercel, please set your GEMINI_API_KEY in your Vercel Project Environment Variables. In the meantime:
- Emergency Hotline: MDRRMO (02) 8652-1875 / Police (02) 8652-0123.
- Municipal Treasury: Located in Brgy. Calumpang for Cedula & Permits.
- Talim Island Ferry: Boats depart from Pritil & Pila-pila ports.`
      });
      return;
    }

    const ai = getAIClient();

    const systemInstruction = `You are "Binangonan AI Assistant" (Gabay Binangoneño), an official & friendly AI helper for residents of Binangonan, Rizal, Philippines.
Your goals:
1. Provide accurate, empathetic, and clear guidance in Tagalog, English, or Taglish.
2. Assist residents with LGU services, Emergency hotlines, commuting, barangays, and local landmarks.`;

    const prompt = `System Context: ${systemInstruction}\n\nResident Query: ${message}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const replyText = response.text || "Patawad, hindi ko naiproseso ang iyong katanungan. Pakisubukan muli o tumawag sa MDRRMO Hotline (02) 8652-1875.";

    res.json({ reply: replyText });
  } catch (err: any) {
    console.error('Error in Vercel Gemini API route:', err);
    res.status(500).json({
      error: 'Failed to process AI assistant query.',
      details: err?.message || String(err)
    });
  }
});

export default app;
