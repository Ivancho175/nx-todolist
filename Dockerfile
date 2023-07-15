FROM node:current-alpine3.17

WORKDIR /nx-todolist

COPY . .

RUN npm install

CMD npm run start nx-todolist-backend