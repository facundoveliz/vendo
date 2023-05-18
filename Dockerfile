FROM node
WORKDIR /usr/app
COPY package*.json yarn.lock ./

RUN yarn install
COPY . ./

CMD node server.js
