FROM node:alpine
WORKDIR "/api"
COPY ./package.json ./
RUN npm install
RUN npm install axios 
RUN npm install redis
RUN npm install jsonwebtoken
RUN npm install express
RUN npm install body-parser
COPY . . 
CMD ["npm","start"]