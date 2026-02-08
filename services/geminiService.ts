
import { GoogleGenAI, Type } from "@google/genai";
import { YouthMember } from "../types";

export const getPastoralAdvice = async (member: YouthMember): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const recentLogs = member.spiritualLogs
    .slice(-5)
    .map(log => `- ${log.date}: [${log.status}] ${log.note}`)
    .join('\n');

  const prompt = `
    Actúa como un mentor espiritual y pastor de jóvenes experimentado.
    Analiza la situación actual de ${member.name}.
    Estado actual: ${member.status}
    Fecha de nacimiento: ${member.birthDate}
    Notas recientes de seguimiento:
    ${recentLogs}

    Basado en esto, proporciona 3 consejos prácticos y empáticos para ayudar a este joven en su crecimiento espiritual. 
    Usa un tono alentador y bíblico. Mantén la respuesta breve (máximo 150 palabras).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "No se pudo generar el consejo en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error al conectar con el consejero espiritual AI.";
  }
};
