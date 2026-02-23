# Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Your application will be available at http://localhost:80 (or simply http://localhost).

### About this configuration

This setup uses a multi-stage Docker build:
1. The first stage uses Node.js to build the React application
2. The second stage uses Nginx to serve the static files efficiently

This approach results in a smaller final image and better performance for serving static content.

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References
* [Docker's Nginx guide](https://docs.docker.com/samples/nginx/)
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)