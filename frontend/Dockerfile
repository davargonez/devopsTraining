#version of docker image
FROM node:12.22.3

#create workdir
RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend
#copy package.json with instructions to image
COPY package.json /usr/src/frontend
#install dependencies
RUN npm install -g @angular/cli && npm install
#copy all data from backend of my project to image
COPY . /usr/src/frontend
#build app version
RUN npm run build
#port
EXPOSE 4200
#command to start app
CMD ["npm","start"]
