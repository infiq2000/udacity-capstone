FROM node:13.8.0 AS build
WORKDIR /
# COPY package.json ./
COPY . .

RUN npm install
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /dist /usr/share/nginx/html
EXPOSE 80
