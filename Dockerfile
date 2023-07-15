FROM node:current-alpine3.17

WORKDIR /nx-todolist

COPY . .

RUN npm install

CMD nx run start nx-todolist-backend:serve:production