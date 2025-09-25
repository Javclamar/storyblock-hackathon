import { parseAIResponse, mergeWithStoryblok } from "../utils/jsonParsing.js";
import { getCachedContent, setCachedContent } from "../utils/cache.js";
import { makeAIRequest } from "./aiController.js";

const homeController = async (req, res) => {
    const { blocks, preferences } = req.body;
    const sessionId = req.session.id;

    console.log("Received preferences:", preferences);
    
    const cacheKey = `${sessionId}-${preferences?.isComplete ? 'personalized' : 'generic'}`;

    const buildPersonalizedPrompt = (preferences) => {
        let basePrompt = `You are generating content for a React + Storyblok home page for a SaaS that provides an online coworking space named OnTime.`;
        
        if (preferences?.isComplete) {
            basePrompt += `

PERSONALIZATION CONTEXT:
- Target Industry: (${preferences.industry} industry)
- Target Language: (${preferences.language})
- Team Size: (${preferences.teamSize})

PERSONALIZATION INSTRUCTIONS:
- Tailor the language and messaging for the ${preferences.industry} industry
- Write in a tone that appeals to ${preferences.teamSize} teams
- Reference how OnTime can specifically help ${preferences.industry} companies`;
        }

        return basePrompt + `

The platform features: real-time collaboration, task management, video conferencing, and integrations with popular tools like Jira and Notion.

IMPORTANT INSTRUCTIONS:

1. Your return must follow this template exactly, don't return anything more:

headline: your response
subheadline: your response
cta_hero_text: your response
feature1_title: your response
feature1_description: your response
feature2_title: your response
feature2_description: your response
feature3_title: your response
feature3_description: your response

2. Feature1 must focus on portability, Feature2 on collaboration, Feature3 on connectivity
3. The headline must be at least 8 words long
4. The subheadline must be at least 15 words long
5. Each feature description must be at least 30 words long
${preferences?.isComplete ? `
6. Make the content relevant to ${preferences.industry} professionals
7. Use ${preferences.tone} language throughout
8. Include subtle references to ${preferences.companyName} or similar companies when appropriate` : ''}

Generate engaging content that would attract users to the OnTime platform:`;
    };

    try {
        const cached = await getCachedContent(cacheKey, 'hackathon/home', blocks);
        if (cached) {
            console.log(`Cache hit for ${preferences?.isComplete ? 'personalized' : 'generic'} content - ${cacheKey}`);
            return res.json({
                content: {
                    body: cached
                },
                cached: true,
                personalized: preferences?.isComplete || false
            });
        }

        console.log(`Cache miss for ${preferences?.isComplete ? 'personalized' : 'generic'} content - ${cacheKey}`);

        // Generate personalized prompt
        const personalizedPrompt = buildPersonalizedPrompt(preferences);
        
        // Make AI request
        const aiData = await makeAIRequest(personalizedPrompt);
        
        if (!aiData.response) {
            throw new Error("No response from AI model");
        }

        // Field mapping remains the same
        const fieldMapping = {
            'headline': ['hero', 'headline'],
            'subheadline': ['hero', 'subheadline'],  
            'cta_hero_text': ['hero', 'cta_text'],
            'feature1_title': ['features', 'items', 0, 'title'],
            'feature1_description': ['features', 'items', 0, 'description'],
            'feature2_title': ['features', 'items', 1, 'title'],
            'feature2_description': ['features', 'items', 1, 'description'],
            'feature3_title': ['features', 'items', 2, 'title'],
            'feature3_description': ['features', 'items', 2, 'description']
        };

        const parsedContent = parseAIResponse(aiData.response, fieldMapping);
        const mergedContent = mergeWithStoryblok(blocks, parsedContent);
        
        // Cache with personalized key
        await setCachedContent(cacheKey, 'hackathon/home', mergedContent);

        res.json({
            content: {
                body: mergedContent
            },
            cached: false,
            personalized: preferences?.isComplete || false,
            preferences: preferences?.isComplete ? {
                industry: preferences.industry,
                tone: preferences.tone,
                goal: preferences.primaryGoal
            } : null
        });
        
    } catch (err) {
        console.error("Error details:", err.message);
        console.error("Full error:", err);
        
        res.status(500).json({ 
            success: false,
            error: "AI generation failed",
            details: err.message,
            personalized: false
        });
    }
}

export default homeController;