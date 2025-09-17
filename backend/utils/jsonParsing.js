

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

export { parseAIResponse, mergeWithStoryblok };