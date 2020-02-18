FROM node:latest

WORKDIR /usr/app/node-demo

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080 8000

CMD ["node", "index.js"]

