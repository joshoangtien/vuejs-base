<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script>
  import BaseLayout from './layouts/BaseLayout'
  import MainLayout from './layouts/MainLayout'

  export default {
    name: 'App',
    components: {
      'base-layout': BaseLayout,
      'main-layout': MainLayout
    },
    computed: {
      layout() {
        return (this.$route.meta?.layout || 'base') + '-layout'
      },
    }
  }
</script>

<style scoped>

</style>
