// import { openai } from "../utils/openai.js";
import ContentIdea from "../models/ContentIdea.model.js";
import { ai } from '../utils/gemini.js';

export const generateIdea = async (req, res) => {
  const { topic, niche } = req.body;

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Generate unique content ideas for Instagram related to topic "${topic}" in the niche of "${niche}". 
      Please follow this format:
        Reel Idea: 5 [One-line idea]
        Caption: [Instagram caption]
        Hashtags: [5 relevant hashtags]
        Hook: [A catchy opening line for the reel]`,
      
    });

    const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      console.error('⚠️ No content generated:', result);
      return res.status(500).json({ error: 'Failed to generate content.' });
    }

    res.json({ idea: generatedText });
  } catch (error) {
    console.error('❌ Error generating idea:', error);
    res.status(500).json({ error: 'Failed to generate content.' });
  }
};


export const getAllIdeas = async (req, res) => {
  try {
    const ideas = await ContentIdea.find().sort({ createdAt: -1 });
    res.status(200).json(ideas);
  } catch (error) {
    console.error("Error fetching ideas:", error);
    res.status(500).json({ error: "Failed to fetch content ideas" });
  }
};

