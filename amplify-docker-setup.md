# AWS Amplify Docker Compose Setup

## Overview
This setup deploys both frontend and backend using Docker Compose on AWS Amplify, running both services on the same machine.

## Required Environment Variables

Set these in AWS Amplify Console > App Settings > Environment Variables:

### Required Variables
- `MONGODB_URI`: Your MongoDB connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/nutri2go`)
- `JWT_SECRET`: Random 32+ character string for JWT signing
- `CORS_ORIGIN`: Your Amplify app domain (e.g., `https://main.d1234567890.amplifyapp.com`)
- `OPENROUTER_API_KEY`: Your OpenRouter API key for LLM services

### Optional Variables
- `RATE_LIMIT_WINDOW_MS`: Rate limiting window in milliseconds (default: 900000 = 15 minutes)
- `RATE_LIMIT_MAX_REQUESTS`: Max requests per window (default: 100)

## Deployment Steps

1. **Push your code** to your connected Git repository
2. **Set environment variables** in Amplify Console
3. **Deploy** - Amplify will automatically:
   - Install Docker Compose
   - Build both frontend and backend containers
   - Start services with proper networking
   - Extract frontend build artifacts
   - Clean up containers

## Architecture

```
┌─────────────────┐    ┌──────────────────┐
│   Frontend      │    │    Backend       │
│   (React/Expo)  │────│   (Node.js/API)  │
│   Port: 80      │    │   Port: 3000     │
└─────────────────┘    └──────────────────┘
         │                       │
         └───────────────────────┘
              Docker Network
```

## Key Features

- **Single Machine Deployment**: Both services run on the same Amplify instance
- **Internal Networking**: Frontend and backend communicate via Docker network
- **Health Checks**: Backend includes health monitoring
- **Environment Variables**: Secure configuration via Amplify Console
- **Nginx Proxy**: Frontend proxies API requests to backend

## Monitoring

- Backend health check: `GET /api/health`
- Amplify build logs show Docker Compose output
- Container logs available during build process

## Local Development

```bash
# Run locally with Docker Compose
docker-compose up --build

# Or use production config
docker-compose -f docker-compose.prod.yml up --build
```

## Troubleshooting

1. **Build Failures**: Check environment variables are set
2. **Database Connection**: Verify MONGODB_URI is correct
3. **CORS Issues**: Ensure CORS_ORIGIN matches your Amplify domain
4. **Health Check Fails**: Backend may need more startup time