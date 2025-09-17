import { parseAIResponse, mergeWithStoryblok } from "../utils/jsonParsing.js";
import util from 'util';

const homeController = async (req, res) => {
    const { blocks, userContext } = req.body;
    
    const prompt = `
You are generating content for a React + Storyblok home page for a SaaS to provide an online coworking space.

${userContext ? `User context: ${JSON.stringify(userContext)}` : ''}

The structure of the storyblok json is:
${JSON.stringify(blocks, null, 2)}

IMPORTANT INSTRUCTIONS:

1. Look the structure for context
2. You are making just the content, just respond with the values for each field, dont make an html, markdown, just text
3. Your return must follow this template and this online, dont return anything more:

hero_headline: your response
hero_subheadline: your response
cta_hero_text: your response
feature1_title: your response
feature1_description: your response
feature2_title: your response
feature2_description: your response
feature3_title: your response
feature3_description: your response


Generate personalized content based on the template structure:`;

    try {
        const aiResponse = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3:8b",
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.7,
                    top_p: 0.9,
                    repeat_penalty: 1.1
                }
            })
        });

        if (!aiResponse.ok) {
            throw new Error(`AI API responded with status: ${aiResponse.status}`);
        }

        const aiData = await aiResponse.json();
        
        console.log("Raw AI Response:", aiData.response);
        
        if (!aiData.response) {
            throw new Error("No response from AI model");
        }

        const fieldMapping = {
            'hero_headline': ['hero', 'headline'],
            'hero_subheadline': ['hero', 'subheadline'],
            'cta_hero_text': ['hero', 'cta_text'],
            'feature1_title': ['features', 'items', 0, 'title'],
            'feature1_description': ['features', 'items', 0, 'description'],
            'feature2_title': ['features', 'items', 1, 'title'],
            'feature2_description': ['features', 'items', 1, 'description'],
            'feature3_title': ['features', 'items', 2, 'title'],
            'feature3_description': ['features', 'items', 2, 'description']
        };

        const parsedContent = parseAIResponse(aiData.response, fieldMapping);
        console.log("Parsed content:", util.inspect(parsedContent, {
            depth: null,
            colors: true,
            maxArrayLength: null
        }));

        const mergedContent = mergeWithStoryblok(blocks, parsedContent);
        console.log("Merged content:", util.inspect(mergedContent, {
            depth: null,
            colors: true,
            maxArrayLength: null
        }));
        
        res.json({
            content: {
                body: mergedContent
            }
        });
        
    } catch (err) {
        console.error("Error details:", err.message);
        console.error("Full error:", err);
        
        res.status(500).json({ 
            success: false,
            error: "AI generation failed",
            details: err.message
        });
    }
}

export default homeController;