<template>
  <div @click="handleCustom" class="date-cell__table-cell"/>
</template>

<script>
// potential component for reimplementing drag n drop

export default {
  name: "PositionalCell",

  props: {
    row: Number,
    half: Number,
    curItem: Object
  },

  data: function () {
    return {
      storedItems: []
    };
  },

  methods: {
    handleCustom() {
      console.log(`captured at row ${this.row} and half ${this.half}`);
      console.log(this.curItem.title);
    }
  }
}
</script>

<style scoped>
</style>
