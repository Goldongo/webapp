FROM node:lts-alpine

WORKDIR /webapp

COPY webapp/package*.json ./

COPY . .

RUN npm install

RUN npm run serve

EXPOSE 8080
