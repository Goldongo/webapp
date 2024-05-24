FROM node:lts-alpine

WORKDIR /webapp

COPY webapp/package*.json ./

RUN npm install

COPY webapp/ .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "8080"]

EXPOSE 8080
