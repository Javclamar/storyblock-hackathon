const MAX_RETRIES = 3;
const TIMEOUT = 120000;
const RETRY_DELAY = 1000;

export async function makeAIRequest(prompt) {
    let attempts = 0;
    
    while (attempts < MAX_RETRIES) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
            
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "llama3:8b",
                    prompt: prompt,
                    stream: false,
                    oprions: {
                        temperature: 0.7,
                        top_p: 0.9,
                        repeat_penalty: 1.1,
                    }
                })
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`AI request failed: ${response.statusText}`);
            }
            const data = await response.json();
            return data
            
        } catch (error) {
            attempts++;
            console.log(`Attempt ${attempts} failed: ${error.message}`);
            
            if (attempts === MAX_RETRIES) {
                throw new Error(`Failed after ${MAX_RETRIES} attempts: ${error.message}`);
            }
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
    }
}