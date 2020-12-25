# Set the base image to node:12-alpine
FROM node:12-alpine as build

# Specify where our app will live in the container
WORKDIR /app

COPY package.json /app/package.json
# Prepare the container for building node
RUN npm install

# Copy the Node App to the container
COPY . /app/


EXPOSE 8000
CMD ["npm","start"]
