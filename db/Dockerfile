FROM postgres:9-alpine

COPY test.sh /docker-entrypoint-initdb.d/test.sh
RUN chmod +x /docker-entrypoint-initdb.d/test.sh
