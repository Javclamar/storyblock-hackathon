# Storyblok Hackathon - AI-Powered Personalized Content

A fictional webpage showcasing how Large Language Models (LLMs) can generate fully personalized content based on end-user preferences and characteristics.

## Overview

This project demonstrates the power of AI-driven content personalization by combining Storyblok's headless CMS with OpenAI's language models. The application dynamically generates and adapts content to match individual user preferences, creating unique experiences for each visitor.

## Features

- **AI-Generated Personalization**: Leverages OpenAI's LLMs to create tailored content
- **Storyblok Integration**: Utilizes Storyblok as a headless CMS for content management
- **Real-time Content Adaptation**: Generates content dynamically based on user data
- **Visual Editor Support**: Optional proxy setup for Storyblok's visual editor

## Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn package manager
- OpenAI API key
- Storyblok Delivery API token

### Preview  

There is a working review here:  

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

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_DELIVERY_API_TOKEN=your_storyblok_delivery_token_here
```

## Running the Application

### Start the Backend Server

```bash
cd backend
npm run start
```

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
├── backend/          # Backend server with OpenAI integration
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
| `OPENAI_API_KEY` | Your OpenAI API key for LLM access | Yes |

### Frontend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_DELIVERY_API_TOKEN` | Storyblok Delivery API token | Yes |

## How It Works

1. **User Data Collection**: The application gathers user preferences and characteristics
2. **AI Processing**: The backend uses OpenAI's API to generate personalized content based on user data
3. **Content Delivery**: Storyblok serves as the CMS, delivering structured content that's enhanced by AI personalization
4. **Dynamic Rendering**: The frontend displays the fully personalized experience to the end user

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js
- **CMS**: Storyblok
- **AI**: OpenAI API
- **Content Personalization**: LLM-based generation

## Contributing

This is a hackathon project demonstrating AI-powered personalization concepts. Feel free to fork and experiment!

## License  

MIT License

**Note**: This is a demonstration project showcasing the potential of AI-driven content personalization. The content generated is fictional and for educational purposes.