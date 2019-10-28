FROM node:12-buster
COPY package*.json ./
RUN npm install
COPY *.js ./
COPY ./build/*.js ./
EXPOSE 3000
CMD [ "npm", "run", "serve" ]