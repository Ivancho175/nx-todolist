FROM node:current-alpine3.17

WORKDIR /nx-todolist

COPY . .

RUN npm install

RUN npx nx run nx-todolist-backend:build:production

CMD npx nx run nx-todolist-backend:serve:production