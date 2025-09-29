

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

function parseAIResponse(rawResponse, fieldMapping) {
    const contentMap = {};

    const cleanedResponse = rawResponse.trim();

    const regex = /^(?:\*\*\s*)?([a-zA-Z0-9_]+)(?:\s*\*\*)?:\s*(.+?)(?=^\s*(?:\*\*\s*)?[a-zA-Z0-9_]+(?:\s*\*\*)?:|$)/gms;

    let match;
    while ((match = regex.exec(cleanedResponse)) !== null) {
        const key = match[1].trim().toLowerCase();
        const value = match[2].trim().replace(/^["']|["']$/g, '');

        if (fieldMapping[key]) {
            contentMap[key] = {
                path: fieldMapping[key],
                value
            };
        } else {
            console.log('unmapped key:', key, value.slice(0, 80));
        }
    }

    return contentMap;
}

export { parseAIResponse, mergeWithStoryblok };