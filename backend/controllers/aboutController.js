import { parseAIResponse, mergeWithStoryblok } from "../utils/jsonParsing.js";
import { getCachedContent, setCachedContent} from "../utils/cache.js";
import { makeAIRequest } from "./aiController.js";

const aboutController = async (req, res) => {
    const { blocks, preferences } = req.body;
    const sessionId = req.session.id;

    console.log("Received preferences:", preferences);
    
    const cacheKey = `${sessionId}`;

    // Enhanced prompt that incorporates user preferences
    const buildPersonalizedPrompt = (preferences) => {
        let basePrompt = `You are generating content for a React + Storyblok About page of a SaaS that provides an online coworking space named OnTime.
OnTime is a fictional company from Seville that wants to expand its presence while still maintaining its local roots and values.`;
        
        if (preferences?.isComplete) {
            basePrompt += `

ERSONALIZATION CONTEXT:
- Target Industry: (${preferences.industry} industry)
- Target Language: (${preferences.language})
- Team Size: (${preferences.teamSize})

PERSONALIZATION INSTRUCTIONS:
- Tailor the language and messaging for the ${preferences.industry} industry
- Write in a tone that appeals to ${preferences.teamSize} teams
- Reference how OnTime can specifically help ${preferences.industry} companies`;
        }

        return basePrompt + `

IMPORTANT INSTRUCTIONS:

1. You are making just the content, just respond with the values for each field, don't make HTML, markdown, just text
2. Your return must follow this template exactly, don't return anything more:
3. The description must be at least 70 words long
4. The title must be catchy and attractive
${preferences?.isComplete ? `
5. Make the content relevant to ${preferences.industry} companies and ${preferences.audience}
6. Use ${preferences.tone} language throughout
7. Reference our Seville heritage in a way that resonates with ${preferences.audience}
8. Subtly address the needs of companies like ${preferences.companyName}` : ''}

Follow this structure exactly and only respond with this structure:

title: your response
subtitle: your response
description: your response

Generate personalized content about OnTime's story and mission:`;
    };
    
    try {
        // Check cache with personalized key
        const cached = await getCachedContent(cacheKey, 'hackathon/about');

        if (cached) {
            console.log(`About page cache hit for ${preferences?.isComplete ? 'personalized' : 'generic'} content - ${cacheKey}`);
            return res.json({
                content: {
                    body: cached
                },
                cached: true,
                personalized: preferences?.isComplete || false
            });
        }
        
        console.log(`About page cache miss for ${preferences?.isComplete ? 'personalized' : 'generic'} content - ${cacheKey}`);

        // Generate personalized prompt
        const personalizedPrompt = buildPersonalizedPrompt(preferences);
        
        // Make AI request
        const aiData = await makeAIRequest(personalizedPrompt);
                
        if (!aiData.response) {
            throw new Error("No response from AI model");
        }

        // Field mapping remains the same
        const fieldMapping = {
            'title': ['about_hero', 'title'],
            'subtitle': ['about_hero', 'subtitle'],
            'description': ['about_hero', 'description']
        };

        const parsedContent = parseAIResponse(aiData.response, fieldMapping);
        const mergedContent = mergeWithStoryblok(blocks, parsedContent);

        // Cache with personalized key
        await setCachedContent(cacheKey, 'hackathon/about', mergedContent);

        res.json({
            content: {
                body: mergedContent
            },
            cached: false,
            personalized: preferences?.isComplete || false,
            preferences: preferences?.isComplete ? {
                industry: preferences.industry,
                tone: preferences.tone,
                audience: preferences.audience,
                company: preferences.companyName
            } : null
        });
        
    } catch (err) {
        console.error("About controller error details:", err.message);
        console.error("Full error:", err);
        
        res.status(500).json({ 
            success: false,
            error: "AI generation failed",
            details: err.message,
            personalized: false
        });
    }
}

export default aboutController;