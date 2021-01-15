FROM node:12 
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5000
RUN npm run build
RUN npm i -g serve
ADD start.sh /
RUN chmod +x /start.sh
CMD ["/start.sh"]
