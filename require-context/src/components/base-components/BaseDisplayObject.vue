<template>
  <div>
    <ul>
      <li v-for="(data, key) in value" :key="key">{{key}}: {{data}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BaseDisplayObject",
  props: {
    value: {
      type: Object,
      required: true
    }
  }
};
</script>