import { StoryblokComponent, useStoryblok } from "@storyblok/react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PreferencesForm from "./utils/PreferencesForm";

function Page({ slug, preferences }) {
  const story = useStoryblok(slug, { version: "draft" });
  const [aiContent, setAiContent] = useState(null);

  useEffect(() => {
    if (!story?.content) return;

    async function fetchAiContent() {
      try {
        const response = await fetch(`http://localhost:5000/api/generate${slug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blocks: story.content.body,
            preferences,
          }),
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
  }, [story, slug, preferences]);

  if (!story?.content) return <div>Loading Storyblok...</div>;
  if (!aiContent) return <div>Generating AI content...</div>;

  return <StoryblokComponent blok={aiContent} />;
}

function App() {
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userPreferences");
    if (stored) {
      setPreferences(JSON.parse(stored));
    }
  }, []);

  if (!preferences) {
    return <PreferencesForm onSave={setPreferences} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/hackathon/home" element={<Page slug="/hackathon/home" preferences={preferences} />} />
        <Route path="/hackathon/about" element={<Page slug="/hackathon/about" preferences={preferences}/>} />
        <Route path="/hackathon/pricing" element={<Page slug="/hackathon/pricing" preferences={preferences}/>} />
        <Route path="/hackathon/features" element={<Page slug="/hackathon/features" preferences={preferences}/>} />
      </Routes>
    </Router>
  );
}

export default App;