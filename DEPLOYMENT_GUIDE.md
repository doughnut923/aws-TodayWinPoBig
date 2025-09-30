# Nutri2Go Deployment Guide

## Two-Service Architecture

Since Amplify only serves static files, deploy frontend and backend separately:

### 1. Deploy Backend (AWS App Runner)

```bash
# Create App Runner service
aws apprunner create-service \
  --service-name nutri2go-backend \
  --source-configuration '{
    "CodeRepository": {
      "RepositoryUrl": "https://github.com/your-username/aws-TodayWinPoBig",
      "SourceCodeVersion": {
        "Type": "BRANCH",
        "Value": "main"
      },
      "CodeConfiguration": {
        "ConfigurationSource": "CONFIGURATION_FILE",
        "CodeConfigurationValues": {
          "Runtime": "NODEJS_18",
          "BuildCommand": "cd backend && npm install --production",
          "StartCommand": "cd backend && npm start",
          "RuntimeEnvironmentVariables": {
            "NODE_ENV": "production",
            "MONGODB_URI": "your-mongodb-uri",
            "JWT_SECRET": "your-jwt-secret",
            "OPENROUTER_API_KEY": "your-openrouter-key"
          }
        }
      }
    }
  }'
```

### 2. Deploy Frontend (AWS Amplify)

1. **Set Environment Variable** in Amplify Console:
   - `EXPO_PUBLIC_API_BASE_URL`: `https://your-apprunner-url.region.awsapprunner.com/api`

2. **Update amplify.yml** to build frontend only:

```yaml
version: 1
applications:
  - appRoot: frontend
    frontend:
      phases:
        preBuild:
          commands:
            - npm install
        build:
          commands:
            - npm run web:build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
```

### 3. Update CORS in Backend

Add your Amplify domain to CORS_ORIGIN:
```
CORS_ORIGIN=https://main.d1234567890.amplifyapp.com
```

## Alternative: Single Service with Railway/Render

For simpler deployment, use Railway or Render which support monorepos:

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

### Render
1. Connect GitHub repo
2. Create Web Service
3. Set build command: `npm install && cd frontend && npm run web:build`
4. Set start command: `cd backend && npm start`
5. Add environment variables