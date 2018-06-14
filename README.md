# docker-mocha-example

## Build and run

### Development:

```bash
docker-compose up --build
```

In this development workflow, [nodemon](https://www.npmjs.com/package/nodemon)
watches for changes in the **/web** directory and automatically
restarts server.

### Production:

```bash
docker-compose -f docker-compose.prod.yml up --build
```
