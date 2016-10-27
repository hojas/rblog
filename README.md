# rblog

A blog build with Koa2 and React.

## Main technology

1. Node.js v6.x
2. MongoDB
3. Koa
4. Babel
5. React
6. Redux
7. Webpack
8. PostCSS
9. Gulp

## Deploy

1. install npm packages:

```
$ npm install
```

2. build app and server:

```
$ npm run build
```

3. run app

```
$ npm run pm2
```

4. deploy Nginx

Install Nginx, and then copy `rblog/nginx.conf` to `/etc/nginx/conf.d/`.

Restart Nginx: 

```
$ sudo service nginx restart
```
