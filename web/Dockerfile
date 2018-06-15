FROM node:8.11-alpine

EXPOSE 8080
WORKDIR /app

# Copy wait-for utl
COPY /utils/wait-for /usr/local/bin/wait-for
RUN chmod +x /usr/local/bin/wait-for

# Install dependencies
COPY package.json package-lock.json /app/
RUN npm install

CMD ["/usr/local/bin/wait-for", "-t", "30", "database:5432", "--", "npm", "run", "watch"]
