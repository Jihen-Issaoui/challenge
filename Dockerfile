ARG NODE_VERSION=16.14.2-alpine
ARG NGINX_VERSION=1.15

# Stage build

FROM node:${NODE_VERSION} AS jihen_challenge_builder

WORKDIR /app

COPY package*.json /app/
COPY .env.dist /app/.env

RUN npm install

COPY ./ /app/

RUN npm run build

CMD ["ls", "-la", "/app"]

# Stage run

FROM nginx:${NGINX_VERSION} AS jihen_challenge_ui

COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY .docker/nginx/docker-entrypoint.sh /docker-entrypoint.sh

COPY --from=jihen_challenge_builder /app/dist/ /usr/share/nginx/html

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD [ "nginx", "-g","daemon off;" ]
