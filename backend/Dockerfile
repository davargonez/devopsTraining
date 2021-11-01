#version of docker image
FROM node:12.22.3

#create workdir
RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend
#copy package.json with instructions to image
COPY package.json /usr/src/backend
#install dependencies
RUN npm install
#copy all data from backend of my project to image
COPY . /usr/src/backend
#port
EXPOSE 3000
#command to start app
CMD ["npm","start"]
