<template>
  <div style="margin-top: 20px;">
    <label for="title-input">Search:</label>
    <input id="title-input" class="input-css" :value="value" @input="$emit('input', $event.target.value)" placeholder="Type to search..." />
  </div>
</template>

<script>
export default {
  name: "BaseSearch",
  props: {
    value: {
      type: String,
      required: true
    }
  },
};
</script>

<style scoped>
  .input-css {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
</style>