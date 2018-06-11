FROM node:8.11-alpine

COPY * /app/
WORKDIR /app

# Install dependencies
RUN npm i

EXPOSE 8080
ENTRYPOINT npm run watch
