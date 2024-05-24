FROM node:22-alpine3.18

WORKDIR /webapp

COPY . .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]
