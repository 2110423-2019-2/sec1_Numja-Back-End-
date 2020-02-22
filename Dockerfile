FROM node:10-alpine
WORKDIR /server
COPY ./package.json .
COPY ./dist .
RUN yarn
EXPOSE 3000
CMD ["node", "main"]