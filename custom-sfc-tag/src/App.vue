<template>
  <div id="app">
    <div v-for="(components, type) in getComponentByType" :key="type">
      <h1>Components of type {{type}}:</h1>
      <div v-for="component in components" :key="component.name">
        <component :is="component" />
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BaseButton from './components/BaseButton.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    BaseButton
  },
  computed: {
    getComponentByType() {
      // This is basically a group by
      return Object.keys(this.$options.components).reduce((componentGroupedBy, componentKey) => {
        const component = this.$options.components[componentKey]
        if (!component.meta || !component.meta.type) {
          return componentGroupedBy
        }
        if(!componentGroupedBy[component.meta.type]) {
          componentGroupedBy[component.meta.type] = []
        }
        componentGroupedBy[component.meta.type].push(component)
        return componentGroupedBy;
      }, {});
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
