import { StoryblokComponent, useStoryblok } from "@storyblok/react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Page({ slug }) {
  const story = useStoryblok(slug, { version: "draft" });
  const [aiContent, setAiContent] = useState(null);

  useEffect(() => {
    if (!story?.content) return;

    async function fetchAiContent() {
      try {
        const response = await fetch(`http://localhost:5000/api/generate${slug}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blocks: story.content.body }),
        });

        const data = await response.json();

        setAiContent({
          ...story.content,
          body: data.content?.body || data,
        });
      } catch (err) {
        console.error("Error fetching AI content:", err);
      }
    }

    fetchAiContent();
  }, [story, slug]);

  if (!story?.content) return <div>Loading Storyblok...</div>;
  if (!aiContent) return <div>Generating AI content...</div>;

  return <StoryblokComponent blok={aiContent} />;
}

function App() {

  return (
     <Router>
      <Routes>
        <Route path="/hackathon/home" element={<Page slug="/hackathon/home" />} />
        <Route path="/hackathon/about" element={<Page slug="/hackathon/about" />} />
        <Route path="/hackathon/pricing" element={<Page slug="/hackathon/pricing" />} />
        <Route path="/hackathon/features" element={<Page slug="/hackathon/features" />} />
      </Routes>
    </Router>
  );
}

export default App;