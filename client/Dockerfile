FROM nginx:1.19.1-alpine
COPY dist /usr/share/nginx/html/test
COPY test.nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
