FROM node:14

COPY ./ ./

RUN npm install --force

EXPOSE 3000