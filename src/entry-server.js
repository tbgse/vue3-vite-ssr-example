import { createSSRApp } from 'vue'
import renderer from '@vue/server-renderer';
import App from './App.vue'
import createRouter from './router'

const express = require('express');
const path = require('path');
const server = express();

server.use('/_assets', express.static(path.join(__dirname, '../../client/_assets')));

server.get('*', (req, res) => {
  const router = createRouter();
  const app = createSSRApp(App);
  app.use(router);
  router.push(req.url)
  router.isReady().then(() => {
    if (router.currentRoute.value.matched.length === 0) {
      res.end();
      return;
    }
    ; (async () => {
      const html = await renderer.renderToString(app)
      res.end(`__HTML__`)
    })()
  });
})

console.log('started server...');
server.listen(8080);