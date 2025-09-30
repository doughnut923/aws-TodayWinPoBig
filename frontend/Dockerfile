FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run web
FROM nginx:alpine
COPY --from=0 /app/web-build /usr/share/nginx/html
EXPOSE 80