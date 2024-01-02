### BUILD ###
FROM node:20.10.0-bullseye-slim AS build

WORKDIR /usr/src/app
COPY . .

RUN yarn install --frozen-lockfile \
&& yarn build \
&& yarn cache clean --force

### PRODUCTION ###
FROM node:20.10.0-bullseye-slim AS production
ENV NODE_ENV=production

EXPOSE $PORT

WORKDIR /usr/src/app
COPY package.json .

COPY --from=build /usr/src/app/dist .

RUN yarn install --frozen-lockfile --production \
&& yarn cache clean --force \
&& apt-get update && apt-get install -y --no-install-recommends dumb-init=1.2.5-1 \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/*

USER node

CMD ["dumb-init", "node", "index.js"]
