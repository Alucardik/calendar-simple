<template>
  <header class="header">
    <div class="header__info">
      <button class="header__button header__button_type_menu"></button>
      <div class="header__project-name">
        <img src="../assets/images/calendar-image.svg" alt="App logo" class="header__project-image">
        Календарь
      </div>
      <button class="header__button header__button_type_today" v-on:click="selectedDate = getCurDate(selectedDate)">
        Сегодня
      </button>
      <button class="header__button header__button_type_change-per" v-on:click="selectedDate = decMonth(selectedDate)"></button>
      <button class="header__button header__button_type_change-per" v-on:click="selectedDate = incMonth(selectedDate)"></button>
      <div class="header__date">
        {{ months[selectedDate.month - 1] }} {{ selectedDate.year }}
      </div>
    </div>

    <nav class="header__settings">
      <button v-on:click="++period.days">++</button>
      <button v-on:click="--period.days">--</button>
    </nav>
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
    },
  },

  props: {
    selectedDate: Object,
    period: Object
  }
}
</script>

<style scoped>

</style>
