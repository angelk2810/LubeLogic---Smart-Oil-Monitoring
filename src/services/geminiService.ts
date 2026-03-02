import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askOilAssistant(prompt: string, context: any) {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are LubeLogic AI, a specialist automotive oil condition monitoring assistant.
    You have access to the following vehicle data: ${JSON.stringify(context)}.
    
    Provide concise, professional, and technical advice about engine oil health.
    If the oil health is low, explain why based on the sensors (viscosity, contamination, metal particles).
    Always maintain a helpful, automotive-expert persona.
    Use markdown for formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my diagnostic database. Please try again shortly.";
  }
}
