<template>
  <div class="hello">
    <h1>Auto components registration and local data reader with require.context</h1>
    <BaseSearch v-model="search" />

    <div v-for="data in blogDataFiltered" :key="data.title">
      <BaseDisplayObject :value="data" />
    </div>
  </div>
</template>

<script>
import BlogData from '../data';

export default {
  name: 'HelloWorld',
  data() {
    return {
      search: ""
    }
  },
  computed: {
    blogDataFiltered() {
      return BlogData.filter(blog => {
        return blog.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
