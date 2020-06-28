FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install && npm audit fix

COPY . .

EXPOSE 3000

ENTRYPOINT [ "node", "app.js" ]