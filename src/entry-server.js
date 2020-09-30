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
      // __HTML__ will be replaced by rollup during build to contain the references
      // to the client side bundles, after that the rendered html will be injected
      const html = await renderer.renderToString(app)
      res.end(`__HTML__`)
    })()
  });
})

console.log('started server...');
server.listen(8080);