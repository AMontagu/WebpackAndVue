import Vue from 'vue'
import App from './App.vue'
import ComponentRegistration from '@/setup/componentRegistration'

ComponentRegistration();

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
