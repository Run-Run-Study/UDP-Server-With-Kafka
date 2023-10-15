FROM node:20.5.0-alpine3.17

RUN mkdir -p /app

WORKDIR /app

ADD .. /app

RUN npm install -g npm@latest

CMD npm run production