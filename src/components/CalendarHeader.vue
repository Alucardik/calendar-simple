<template>
  <header class="header">
    <div class="header__info">
      <button v-on:click="selectedDate = getCurDate(selectedDate)">Сегодня</button>
      <button v-on:click="selectedDate = decMonth(selectedDate)">&lt;</button>
      <button v-on:click="selectedDate = incMonth(selectedDate)">&gt;</button>
      <div class="header__date">
        {{ selectedDate.day }}.{{ selectedDate.month }}.{{ selectedDate.year }}
      </div>
    </div>

    <nav class="header__settings">Settings Will be here</nav>
  </header>
</template>

<script>
import consts from "@/assets/scripts/utils/constants";
import shared from "@/assets/scripts/utils/shared";

export default {
  name: "CalendarHeader",

  created() {
    this.getCurDate = shared.getCurDate;
    this.months = consts.months;
  },

  data: function () {
    return {
    }
  },

  methods: {
    decMonth(date) {
      date.month -= 1;
      if (!date.month) {
        date.month = 12;
        date.year -= 1;
      }
      return date;
    },

    incMonth(date) {
      date.month += 1;
      if (date.month > 12) {
        date.month = 1;
        date.year += 1;
      }
      return date;
    }
  },

  props: {
    selectedDate: Object
  }
}
</script>

<style scoped>

</style>
