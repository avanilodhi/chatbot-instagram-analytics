// import { openai } from "../utils/openai.js";
import ContentIdea from "../models/ContentIdea.model.js";
import { ai } from '../utils/gemini.js';

export const generateIdea = async (req, res) => {
  const { topic, niche } = req.body;

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Generate unique content ideas for Instagram related to topic "${topic}" in the niche of "${niche}". Return 5 bullet points.`,
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




// export const generateIdea = async (req, res) => {
//   try {
//     const { topic, niche } = req.body;

//     if (!topic || !niche) {
//       return res.status(400).json({ error: "Topic and niche are required" });
//     }

//     const prompt = `
//     You are a content strategist. Suggest one trending Instagram reel idea for a creator in the ${niche} niche about ${topic}.
//     Include:
//     - Reel idea
//     - Caption
//     - 5 relevant hashtags
//     - A strong opening hook.
//     `;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 500,
//     });

//     const idea = completion.choices[0].message.content;

//     // Save to DB (Content Bank)
//     const newIdea = new ContentIdea({ topic, niche, idea });
//     await newIdea.save();

//     res.status(200).json({ topic, niche, idea });
//   } catch (error) {
//     console.error("❌ Full OpenAI Error:", JSON.stringify(error, null, 2));
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

export const getAllIdeas = async (req, res) => {
  try {
    const ideas = await ContentIdea.find().sort({ createdAt: -1 });
    res.status(200).json(ideas);
  } catch (error) {
    console.error("Error fetching ideas:", error);
    res.status(500).json({ error: "Failed to fetch content ideas" });
  }
};

