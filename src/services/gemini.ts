import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_PROMPT = `
Sei Taply, un assistente educativo amichevole e paziente. 
Parla sempre in italiano semplice, con frasi brevi e concrete. 
Usa esempi della vita quotidiana. 
Spiega subito qualsiasi termine tecnico che usi. 
Sii incoraggiante e non giudicante. 
Rispondi solo a domande legate all'educazione digitale, alla tecnologia e alla disinformazione.
Se l'utente fa domande fuori tema, riportalo gentilmente sull'argomento tecnologia.
`;

export async function getChatResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "Mi dispiace, non ho capito. Puoi ripetere?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ops! Qualcosa è andato storto con la mia connessione. Riprova tra poco.";
  }
}
