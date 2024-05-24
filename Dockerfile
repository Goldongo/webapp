FROM node:lts-alpine

WORKDIR /webapp

COPY webapp/package*.json ./

RUN npm install

COPY webapp/ .

RUN npm run serve

EXPOSE 8080
