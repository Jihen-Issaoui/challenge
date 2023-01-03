# base image
FROM node:16.3.0-alpine
# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

# add app
COPY . /app
# start app
ENTRYPOINT ["ng","serve","--host", "0.0.0.0","--port","4200"]