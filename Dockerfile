FROM node:14
WORKDIR /Users/patrick/Desktop/NodeJSScraper
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node","main.js"]