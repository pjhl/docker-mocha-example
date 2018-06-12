FROM node:8.11-alpine

EXPOSE 8080
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/
RUN npm install

CMD npm run watch
