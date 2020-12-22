FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install --production
COPY . /usr/src/app

EXPOSE 3000

ENV DB_URL=localhost
ENV DB_PORT=27017
ENV DB_NAME=devpot-main-service
ENV NODE_ENV=dev
ENV PORT=3000
ENV UPLOAD_PATH='files/images'
ENV NODE_BASEPATH=/api/v1

ENV JWT_SECRET=secret
ENV NODE_BASEPATH=/api/v1
ENV SWAGGER_BASEPATH=/api/v1

ENV SCRIPT=start
CMD npm run $SCRIPT
