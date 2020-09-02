<template>
  <h1>This is a route test. Below is the currently rendered route:</h1>
  <router-view v-slot="{ Component }">
      <component :is="Component" />
  </router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>
