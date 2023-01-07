FROM node:18.12.1

WORKDIR /home

COPY package.json .

RUN npm install --registry=http://registry.npm.taobao.org

COPY . .

RUN npm run build

COPY ./dist /home/dist
