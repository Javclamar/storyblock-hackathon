import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { apiPlugin, storyblokInit } from "@storyblok/react";

import Feature from "./components/Feature";
import Grid from "./components/Grid";
import Page from "./components/Page";
import Teaser from "./components/Teaser";

storyblokInit({
  accessToken: process.env.REACT_APP_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    teaser: Teaser,
    grid: Grid,
    feature: Feature,
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
