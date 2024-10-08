FROM node:lts-alpine

WORKDIR /usr/src/app
COPY package.json yarn.lock .
RUN yarn install
COPY . .
CMD ["node", "server.js"]
