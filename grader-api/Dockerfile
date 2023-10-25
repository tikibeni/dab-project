FROM denoland/deno:alpine-1.31.0

EXPOSE 7000

WORKDIR /app

RUN apk add --update docker openrc
RUN rc-update add docker boot

RUN addgroup deno docker

COPY deps.js .

RUN deno cache deps.js

COPY . .

CMD [ "run", "--unstable", "--watch", "--allow-all", "app.js" ]