FROM node:alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
RUN npm install express
RUN npm install axios
COPY . . 
CMD ["npm","start"]