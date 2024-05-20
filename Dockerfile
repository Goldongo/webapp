FROM node:22-alpine3.18

WORKDIR /webapp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run serve

EXPOSE 8080