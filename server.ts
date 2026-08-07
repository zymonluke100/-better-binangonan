import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily or safely on server
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
    res.json({ status: 'ok', app: 'Better Binangonan', time: new Date().toISOString() });
  });

  // API Route: AI Assistant for Binangonan Residents
  app.post('/api/binangonan/ai-assistant', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message text is required' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback response if GEMINI_API_KEY is not configured yet
        res.json({
          reply: `Mabuhay! I am Binangonan's Resident AI Assistant. To get full live AI responses, please set your GEMINI_API_KEY in the Secrets settings. In the meantime:
- For Emergency Hotline: MDRRMO (02) 8652-1875 / Police (02) 8652-0123 / Hospital (02) 8652-0112.
- For Cedula / Barangay Clearance: Visit Municipal Hall Treasury in Calumpang or your local Barangay Hall.
- For Talim Island Ferry: Motorized bancas depart regularly from Pritil Port (Libis) and Pila-pila Port.`
        });
        return;
      }

      const ai = getAIClient();

      const systemInstruction = `You are "Binangonan AI Assistant" (Gabay Binangoneño), an official & friendly AI helper for residents of Binangonan, Rizal, Philippines.
Your goals:
1. Provide accurate, empathetic, and clear guidance in Tagalog, English, or Taglish (whichever language the user speaks).
2. Assist residents with questions regarding:
   - Municipal LGU services (Cedula, Barangay clearance, Business permit, RPT / Amortization, Senior Citizen ID, Solo Parent).
   - Emergency hotlines (MDRRMO rescue, Police station, BFP fire station, Pag-asa hospital).
   - Commuting & travel (Jeepneys from Crossing/EDSA/Angono to Binangonan, Talim Island ferry boats from Pritil / Pila-pila ports to Janosa / Subay).
   - 40 Barangays of Binangonan (Mainland: Calumpang, Darangan, Bilibiran, Lunsad, Libis, Tagpos, Pantok, etc. & Talim Island: Janosa, Habagatan, Subay, Rayap, etc.).
   - Binangonan history & landmarks (Santa Ursula Parish, Petroglyphs, Mt. Tagapo, Carabao Festival).
   - Weather alerts, road traffic along Manila East Road / Quarry Road, and waste management.
3. Keep responses structured with bullet points or bold key contacts when applicable. Be extremely helpful and community-oriented!`;

      // Build context
      const prompt = `System Context: ${systemInstruction}\n\nResident Query: ${message}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      const replyText = response.text || "Patawad, hindi ko naiproseso ang iyong katanungan. Pakisubukan muli o tumawag sa MDRRMO Hotline (02) 8652-1875.";

      res.json({ reply: replyText });
    } catch (err: any) {
      console.error('Error in Gemini API route:', err);
      res.status(500).json({
        error: 'Failed to process AI assistant query.',
        details: err?.message || String(err)
      });
    }
  });

  // Vite Middleware in Development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Better Binangonan server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
