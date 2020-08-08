FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
