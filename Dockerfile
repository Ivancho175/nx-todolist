FROM node:current-alpine3.17

WORKDIR /nx-todolist

COPY . .

RUN npm install

CMD nx serve nx-todolist-backend