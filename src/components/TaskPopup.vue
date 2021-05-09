<template>
  <div class="popup" :style="checkPopup">
    <span v-for="i in targetArray.length" :key="`target${i}`" style="margin-right: 20px">
      {{targetArray[i - 1]}}
    </span>
  </div>
</template>

<script>
import shared from "../assets/scripts/utils/shared";

export default {
  name: "TaskPopup",

  mounted() {
    setTimeout(this.closePopup, this.sharedState.memOffset * 1000);
  },

  data: function() {
    return {
      privateState: {
        isOpen: true,
      },
      sharedState: shared.sessionConfig
    }
  },

  props: {
    targetArray: Array
  },

  computed: {
    checkPopup() {
      console.log("check popup:", this.privateState.isOpen);
      return (this.privateState.isOpen) ? ("visibility: visible;") : ("");
    }
  },

  methods: {
    closePopup() {
      console.log("closed popup");
      this.privateState.isOpen = false;
    },

    openPopup() {
      this.privateState.isOpen = true;
    }
  }
}
</script>

<style scoped>
</style>
