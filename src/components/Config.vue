<template>
  <section class="page">
    Config will be here
  </section>
</template>

<script>
import shared from "../assets/scripts/utils/shared";

export default {
  name: "Config",

  data: function() {
    return {
      privateState: {},
      sharedState: shared.sessionConfig
    }
  }
}
</script>

<style scoped>

</style>
