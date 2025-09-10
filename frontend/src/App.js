import { StoryblokComponent, useStoryblok } from "@storyblok/react";
import { useState, useEffect } from "react";

function App() {
  const story = useStoryblok("hackathon/home", {
    version: "draft",
  });

  const [aiContent, setAiContent] = useState(null);

  useEffect(() => {
    if (!story?.content) return;

    async function fetchAiContent() {
      try {
        const response = await fetch("http://localhost:5000/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blocks: story.content.body }),
        });
        const data = await response.json();
        console.log("AI Content:", data);
        setAiContent(data.content?.body || data); // Ensure we get the body array
      } catch (err) {
        console.error("Error fetching AI content:", err);
      }
    }

    fetchAiContent();
  }, [story]);

  if (!story?.content) {
    return <div>Loading Storyblok...</div>;
  }

  if (!aiContent) {
    return <div>Generating content...</div>;
  }

  // Make sure aiContent is an array before using it
  const contentBody = Array.isArray(aiContent) ? aiContent : story.content.body;

  return (
    <StoryblokComponent
      blok={{
        ...story.content,
        body: contentBody,
      }}
    />
  );
}

export default App;