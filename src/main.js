import { createSSRApp } from 'vue'
import renderer from '@vue/server-renderer';
import App from './App.vue'
import createRouter from './router'

const express = require('express');
const path = require('path');
const server = express();

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
      res.end(html);
    })()
  });
})

console.log('started server on port 8080');
server.listen(8080);
