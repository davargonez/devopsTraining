FROM node:12.22.3 AS ui-build

WORKDIR /devopsTraining
COPY frontend/ ./frontend/ 
RUN cd frontend && npm install angular/cli && npm install && npm run build
COPY backend/ ./backend/
RUN cd backend && npm install nodemon && npm install

FROM node:12.22.3 AS server-build
WORKDIR /root/
COPY --from=ui-build /devopsTraining/frontend/dist ./frontend/dist
COPY package*.json ./
RUN npm install
COPY server.js .
COPY --from=ui-build /devopsTraining/backend/dist ./backend/dist
COPY package*.json ./
RUN npm install
COPY app.js .

EXPOSE 4200

CMD ["node","server.js"]
