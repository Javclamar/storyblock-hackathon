# Storyblok Hackathon - AI-Powered Personalized Content

A fictional webpage showcasing how Large Language Models (LLMs) can generate fully personalized content based on end-user preferences and characteristics.

## Overview

This project demonstrates the power of AI-driven content personalization by combining Storyblok's headless CMS with OpenAI's language models. The application dynamically generates and adapts content to match individual user preferences, creating unique experiences for each visitor.

## Features

- **AI-Generated Personalization**: Leverages OpenAI's LLMs or local Llama models to create tailored content
- **Flexible LLM Options**: Choose between OpenAI's API or a local Llama 3 8B model
- **Storyblok Integration**: Utilizes Storyblok as a headless CMS for content management
- **Real-time Content Adaptation**: Generates content dynamically based on user data
- **Visual Editor Support**: Optional proxy setup for Storyblok's visual editor

## Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn package manager
- OpenAI API key (if using OpenAI)
- Storyblok Delivery API token
- Ollama (if using local Llama 3 model)

### Preview  

There is a working preview here:  

```bash
https://storyblock-hackathon.vercel.app/hackathon/home
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Javclamar/storyblock-hackathon.git
cd storyblock-hackathon
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: The `OPENAI_API_KEY` is only required if you plan to use OpenAI's official SDK. If you're using the local Llama 3 model, this can be omitted.

#### Using Local Llama 3 Model (Optional)

If you prefer to use a local Llama 3 8B model instead of OpenAI:

1. Install Ollama from [https://ollama.ai](https://ollama.ai)

2. Pull the Llama 3 8B model:
```bash
ollama pull llama3:8b
```

3. Start the Ollama service:
```bash
ollama serve
```

The Ollama API will be available at `http://localhost:11434/api/generate`

4. In the `backend/controllers/aiController.js` file, switch between OpenAI and Llama 3 by modifying the code to use the appropriate implementation. The controller supports both:
   - OpenAI's official SDK
   - Local Llama 3 via HTTP calls to `http://localhost:11434/api/generate`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_DELIVERY_API_TOKEN=your_storyblok_delivery_token_here
REACT_APP_URL_BACKEND=http://localhost:3001
```

**Note**: Set `REACT_APP_URL_BACKEND` to your backend URL:
- For local development: `http://localhost:5000`
- For production: Your deployed backend URL

## Running the Application

### Start the Backend Server

```bash
cd backend
npm run start
```

The backend server will typically run on `http://localhost:5000`

### Start the Frontend Application

```bash
cd frontend
npm run start
```

The application should now be running with both frontend and backend services active.

## Using the Visual Editor (Optional)

If you want to use Storyblok's visual editor for real-time content editing:

```bash
npm run proxy
```

This command sets up a proxy connection that allows the Storyblok visual editor to communicate with your local development environment.

## Project Structure

```
storyblock-hackathon/
├── backend/          # Backend server with OpenAI/Llama integration
│   ├── controllers/  # Contains aiController.js with LLM logic
│   ├── .env         # Backend environment variables
│   └── ...
├── frontend/         # React frontend application
│   ├── .env         # Frontend environment variables
│   └── ...
└── README.md
```

## Environment Variables

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key for LLM access | Only if using OpenAI |

### Frontend (.env)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `REACT_APP_DELIVERY_API_TOKEN` | Storyblok Delivery API token | Yes | - |
| `REACT_APP_URL_BACKEND` | Backend server URL | Yes | `http://localhost:5000` or production URL |

## Choosing Your LLM Provider

The `aiController.js` file in `backend/controllers/` supports two LLM options:

### Option 1: OpenAI (Cloud-based)
- Requires an OpenAI API key
- Uses OpenAI's official SDK
- Faster setup, no local installation needed
- Requires internet connection and API credits

### Option 2: Llama 3 8B (Local)
- Free to use, runs locally
- Requires Ollama installation
- Makes HTTP calls to `http://localhost:11434/api/generate`
- No API costs, works offline
- Requires sufficient local computing resources

You can switch between providers by modifying the implementation in `aiController.js`.

## How It Works

1. **User Data Collection**: The application gathers user preferences and characteristics
2. **AI Processing**: The backend uses OpenAI's API or local Llama 3 to generate personalized content based on user data
3. **Content Delivery**: Storyblok serves as the CMS, delivering structured content that's enhanced by AI personalization
4. **Dynamic Rendering**: The frontend displays the fully personalized experience to the end user

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js
- **CMS**: Storyblok
- **AI**: OpenAI API or Llama 3 (via Ollama)
- **Content Personalization**: LLM-based generation

## Contributing

This is a hackathon project demonstrating AI-powered personalization concepts. Feel free to fork and experiment!

## License  

MIT License

**Note**: This is a demonstration project showcasing the potential of AI-driven content personalization. The content generated is fictional and for educational purposes.