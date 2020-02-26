FROM node:12.15-buster-slim as builder
WORKDIR /app/hashtag-watch
COPY package*.json ./
COPY ./src ./src
COPY tsconfig.json .
RUN npm i -s && npm run build

FROM node:12.15-buster-slim
RUN apt-get update && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /home/node/hashtag-watch/node_modules && chown -R node:node /home/node/hashtag-watch
WORKDIR /home/node/hashtag-watch
COPY package*.json ./
COPY --from=builder /app/hashtag-watch/dist ./dist
USER node
RUN npm i --production --no-optional -s
EXPOSE 3434
CMD ["node","./dist/index.js"]