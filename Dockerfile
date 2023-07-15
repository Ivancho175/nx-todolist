FROM node:current-alpine3.17

WORKDIR /nx-todolist

COPY . .

RUN npm install

CMD npx nx run nx-todolist-backend:serve:production