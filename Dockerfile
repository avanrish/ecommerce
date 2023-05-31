FROM node:16-alpine3.17
#RUN apk update && apk add build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3001
CMD [ "npm", "run", "start:dev"]
