import { parseAIResponse, mergeWithStoryblok } from "../utils/jsonParsing.js";
import util from 'util';

const aboutController = async (req, res) => {
    const { blocks, userContext } = req.body;
    
    const prompt = `
You are generating content for a React + Storyblok About page of a SaaS that provides an online coworking space name OnTime.

${userContext ? `User context: ${JSON.stringify(userContext)}` : ''}

The structure of the storyblok json is:
${JSON.stringify(blocks, null, 2)}

IMPORTANT INSTRUCTIONS:

1. Look the structure for context
2. You are making just the content, just respond with the values for each field, dont make an html, markdown, just text
3. Your return must follow this template and this online, dont return anything more:
4. The description must be at leats 70 words long
5. The title must be catchy and attractive

title: your response
subtitle: your response
description: your response

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
            'title': ['about_hero', 'title'],
            'subtitle': ['about_hero', 'subtitle'],
            'description': ['about_hero', 'description']
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

export default aboutController;