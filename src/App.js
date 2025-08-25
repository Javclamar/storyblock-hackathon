import { StoryblokComponent, useStoryblok } from "@storyblok/react";

function App() {
  // Fetch the "home" story
  const story = useStoryblok("hackathon/home", {
    version: "draft",
  });

  if (!story?.content) {
    return <div>Loading...</div>;
  }

  return <StoryblokComponent blok={story.content} />;
}

export default App;