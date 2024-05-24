FROM node:lts-alpine

WORKDIR /webapp

COPY webapp/package*.json ./

RUN npm install

COPY webapp/ .

RUN npm run build

EXPOSE 8080
