import { createSSRApp, createRenderer } from 'vue'
import App from './App.vue'
import './index.css'
import createRouter from './router'

const router = createRouter('client');

const app = createSSRApp(App);
app.use(router);

// this will hydrate the app
router.isReady().then(() => {
  app.mount('#app', true);
});

// it is possible to debug differences of SSR / Hydrated app state
// by adding a timeout between rendering the SSR version and hydrating it later
// window.setTimeout(() => {
//   console.log('The app has now hydrated');
//   router.isReady().then(() => {
//     app.mount('#app', true);
//   });
// }, 5000);
