FROM node:alpine
WORKDIR "/worker"
COPY ./package.json ./
RUN npm install
RUN npm install express
RUN npm install body-parser
RUN npm install axios
COPY . . 
CMD ["npm","start"]