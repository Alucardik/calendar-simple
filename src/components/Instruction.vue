<template>
  <section class="page">
    <p>
      Instruction set will be here
    </p>
    <router-link to="/workspace">
      Приступить к выполнению задания
    </router-link>
  </section>
</template>

<script>
import shared from "../assets/scripts/utils/shared";

export default {
  name: "Instruction",

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
