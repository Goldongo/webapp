FROM node:lts-alpine

WORKDIR /webapp

COPY webapp/package*.json ./

RUN npm install

COPY . .

RUN npm run serve

EXPOSE 8080

CMD ["npm", "run", "serve"]
