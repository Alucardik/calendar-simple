<template>
  <div class="popup" :style="checkPopup">
    <div style="margin: auto">
      <span v-for="i in targetArray.length" :key="`target${i}`" style="margin-right: 20px">
        {{targetArray[i - 1]}}
      </span>
    </div>
  </div>
</template>

<script>
import shared from "../assets/scripts/utils/shared";

export default {
  name: "TaskPopup",

  data: function() {
    return {
      privateState: {
      },
      sharedState: shared.sessionConfig
    }
  },

  props: {
    targetArray: Array,
    isOpen: Boolean
  },

  computed: {
    checkPopup() {
      return (this.isOpen) ? ("visibility: visible;") : ("");
    }
  },
}
</script>

<style scoped>
</style>
