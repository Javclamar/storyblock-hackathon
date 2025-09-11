import express from "express"
import cors from "cors"
import util from 'util'

const app = express();
app.use(cors());
app.use(express.json());

function parseAIResponse(rawResponse, fieldMapping) {
    const lines = rawResponse.split('\n');
    const contentMap = {};
    
    lines.forEach(line => {
        line = line.replace(/^\*?\s*/, '').trim();
        if (!line || !line.includes(':')) return;
        
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();
        const cleanValue = value.replace(/^["']|["']$/g, '');
        const trimmedKey = key.trim();
        
        if (fieldMapping[trimmedKey]) {
            contentMap[trimmedKey] = {
                path: fieldMapping[trimmedKey],
                value: cleanValue
            };
        }
    });
    
    return contentMap;
}

function mergeWithStoryblok(storyblokData, generatedContent) {
    const merged = [];
    
    storyblokData.forEach(block => {
        const newBlock = { ...block };
        
        Object.entries(generatedContent).forEach(([key, content]) => {
            const [componentType] = content.path;
            
            if (block.component === componentType) {
                if (componentType === 'hero') {
                    const [_, field] = content.path;
                    newBlock[field] = content.value;
                }
                else if (componentType === 'features') {
                    const [_, items, index, field] = content.path;
                    if (!newBlock[items]) newBlock[items] = [...(block[items] || [])];
                    if (!newBlock[items][index]) {
                        newBlock[items][index] = {
                            ...block[items][index],
                            component: 'feature',
                            _uid: block[items][index]?._uid || `feature-${index}`,
                            [field]: content.value
                        };
                    } else {
                        newBlock[items][index] = {
                            ...block[items][index],
                            [field]: content.value
                        };
                    }
                }
                else if (componentType === 'about_hero') {
                    const [_, field] = content.path;
                    newBlock[field] = content.value;
                }
            }
        });
        
        merged.push(newBlock);
    });
    
    return merged;
}

// Endpoint to generate AI content for the home page
app.post("/api/generate/hackathon/home", async (req, res) => {
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
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Endpoint to generate AI content for other about page
app.post("/api/generate/hackathon/about", async (req, res) => {
    const { blocks, userContext } = req.body;
    
    const prompt = `
You are generating content for a React + Storyblok about page of a SaaS that provides an online coworking space.


${userContext ? `User context: ${JSON.stringify(userContext)}` : ''}

The structure of the storyblok json is:
${JSON.stringify(blocks, null, 2)}

IMPORTANT INSTRUCTIONS:

1. Look the structure for context
2. You are making just the content, just respond with the values for each field, dont make an html, markdown, just text
3. Your return must follow this template and this online, dont return anything more:

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
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});