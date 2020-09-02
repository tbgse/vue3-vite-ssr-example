import { defineAsyncComponent } from "vue"
import { createRouter, createMemoryHistory } from 'vue-router'

export default function (type) {
  const routerHistory = createMemoryHistory();

  return createRouter({
    history: routerHistory,
    routes: [
      { path: '/', component: defineAsyncComponent(() => import("./components/Homepage.vue")), props: true },
      { path: '/a', component: defineAsyncComponent(() => import("./components/PageA.vue")), props: true },
      { path: '/b', component: defineAsyncComponent(() => import("./components/PageB.vue")), props: true },
    ]
  });
}