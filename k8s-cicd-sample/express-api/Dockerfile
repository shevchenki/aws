FROM node:alpine
WORKDIR /app
ADD /express/ .
RUN npm install -g nodemon
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]