FROM postgres:9-alpine

COPY test.sh /docker-entrypoint-initdb.d/test.sh
RUN chmod +x /docker-entrypoint-initdb.d/test.sh

# Install node
RUN apk add --update --no-cache \
    nodejs

# Copy and install application --quiet
COPY / /app/
RUN cd /app && npm install

# Run migrations
RUN cd /app && npm start
