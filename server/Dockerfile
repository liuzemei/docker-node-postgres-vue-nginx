FROM node:12.18.3-alpine3.12
ADD . /app/
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]