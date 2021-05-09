<template>
  <section class="page">
    <div class="instruction">
      <p v-html="this.taskText" class="instruction__container"></p>
      <router-link to="/workspace" class="instruction__link">
        Приступить к выполнению задания
      </router-link>
    </div>
  </section>
</template>

<script>
import shared from "../assets/scripts/utils/shared";

export default {
  name: "Instruction",

  created() {
    this.taskText = shared.genTaskInstruction(this.sharedState);
  },

  data: function() {
    return {
      privateState: {},
      sharedState: shared.sessionConfig
    }
  }
}
</script>

<style scoped>
@import url('../assets/pages/instruction.css');
</style>
