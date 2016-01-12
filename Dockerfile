FROM ubuntu:14.04
EXPOSE 80
VOLUME /src
WORKDIR /src
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
RUN apt-get install -y nodejs
RUN npm install -g forever
CMD forever -c node app.js
