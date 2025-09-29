import express from "express"
import cors from "cors";
import "dotenv/config";
import { sessionConfig, generateUserId } from "./utils/session.js";
import homeController from "./controllers/homeController.js";
import aboutController from "./controllers/aboutController.js";

const app = express();
app.use(cors({
    origin: ['https://storyblock-hackathon.vercel.app', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST'],
}));
app.use(express.json());
app.use(sessionConfig);


app.use((req, res, next) => {
    if (!req.session.userId) {
        req.session.userId = generateUserId();
    }
    next();
});

app.get("/api/session", (req, res) => {
    res.json({ userId: req.session.userId });
});

// Endpoint to generate AI content for the home page
app.post("/api/generate/hackathon/home", async (req, res) => {
    return homeController(req, res);
});

// Endpoint to generate AI content for other about page
app.post("/api/generate/hackathon/about", async (req, res) => {
    return aboutController(req, res);
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});