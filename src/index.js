import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { apiPlugin, storyblokInit } from "@storyblok/react";

import Feature from "./components/Feature";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Link from "./components/Link";
import Page from "./components/Page";
import Plans from "./components/Plans";
import Pricing from "./components/Pricing";

storyblokInit({
  accessToken: process.env.REACT_APP_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    feature: Feature,
    features: Features,
    footer: Footer,
    plans: Plans,
    plan: Plans,
    pricing: Pricing,
    link: Link,
    hero: Hero,
    header: Header
  },
  
  apiOptions: {
    // for spaces located in the US or China:
    // region: "us" or "cn", // you need to specify the region
    region: 'eu'
  }
});

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
