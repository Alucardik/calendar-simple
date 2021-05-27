<template>
  <div @click="handleCustom" class="date-cell__table-cell"/>
</template>

<script>
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

  computed: {
  },

  methods: {
    handleCustom() {
      // console.log("CAPTURED", this.curItem , "in", this.props.row, this.props.half);
      console.log(`captured at row ${this.row} and half ${this.half}`);
      console.log(this.curItem.title);
    }
  }
}
</script>

<style scoped>

</style>
