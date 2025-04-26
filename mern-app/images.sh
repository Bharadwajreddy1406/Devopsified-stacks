#!/bin/bash

docker builder prune -f

cd client
docker build -t mern-client .
docker tag mern-client bharadwajreddy1406/mern-client:latest
cd ..

cd server
docker build -t mern-server .
docker tag mern-server bharadwajreddy1406/mern-server:latest
cd ..

docker login
docker push bharadwajreddy1406/mern-server:latest
docker push bharadwajreddy1406/mern-client:latest

