import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import "../styles/Features.css";

const Features = ({ blok }) => (
  <div className="features" {...storyblokEditable(blok)}>
    {blok.items?.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </div>
);

export default Features;