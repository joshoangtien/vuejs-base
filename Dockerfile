# Dockerfile
FROM node:16.18-alpine3.15

# create destination directory
RUN mkdir -p /usr/src/base_vuejs
WORKDIR /usr/src/base_vuejs

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/base_vuejs/
RUN npm install

EXPOSE 8080
