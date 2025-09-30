# AWS Environment Variables Setup

## 1. AWS Amplify
Set in Amplify Console > Environment Variables:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Random 32+ character string
- `CORS_ORIGIN`: Your frontend domain

## 2. AWS App Runner
```bash
aws apprunner create-service \
  --service-name nutri2go \
  --source-configuration '{
    "ImageRepository": {
      "ImageConfiguration": {
        "RuntimeEnvironmentVariables": {
          "NODE_ENV": "production",
          "MONGODB_URI": "mongodb+srv://...",
          "JWT_SECRET": "your-secret"
        }
      }
    }
  }'
```

## 3. ECS/Fargate
Add to task definition:
```json
"environment": [
  {"name": "NODE_ENV", "value": "production"},
  {"name": "MONGODB_URI", "value": "mongodb+srv://..."},
  {"name": "JWT_SECRET", "value": "your-secret"}
]
```