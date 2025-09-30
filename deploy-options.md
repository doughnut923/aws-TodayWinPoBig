# Quick AWS Deployment Options

## Option 1: Frontend Only (Amplify)
- Deploy frontend to Amplify
- Deploy backend separately to App Runner/ECS
- Use the fixed amplify.yml

## Option 2: Backend to App Runner (Fastest)
```bash
# 1. Push backend to ECR
aws ecr create-repository --repository-name nutri2go-backend

# 2. Build and push
docker build -t nutri2go-backend ./backend
docker tag nutri2go-backend:latest [ECR-URI]:latest
docker push [ECR-URI]:latest

# 3. Create App Runner service
aws apprunner create-service --cli-input-json file://apprunner-config.json
```

## Option 3: Serverless (AWS SAM)
```bash
sam init --runtime nodejs18.x
# Move backend code to SAM template
sam deploy --guided
```