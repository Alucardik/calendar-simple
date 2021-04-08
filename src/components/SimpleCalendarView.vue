<template>
  <div class="calendar-mini">
    <h3 class="calendar-mini__heading">
      {{ months[selectedDate.month - 1] }} {{ selectedDate.year }}
    </h3>

    <div class="calendar-mini__table">
      <div class="calendar-mini__cell calendar-mini__cell_type_weekday" v-for="_ in 7" :key="`dayName${_}`">
        {{ weekdayNamesShort[_ - 1] }}
      </div>
      <div class="calendar-mini__cell" v-on:click="prevSelectedDay = handleCellClick($event, selectedDate, prevSelectedDay)"
           v-for="curDay in (new Date(selectedDate.year, selectedDate.month, 0).getDate())"
           :key="curDay">
        {{ curDay }}
      </div>
    </div>
  </div>
</template>

<script>
import consts from "../assets/scripts/utils/constants.js";
import shared from "@/assets/scripts/utils/shared";

export default {
  name: "SimpleCalendarView",

  created() {
    this.months = consts.months;
    this.weekdayNamesShort = consts.weekdays;
    this.getDayOfTheWeek = shared.getDayOfTheWeek;
  },

  data: function() {
    return {
      prevSelectedDay: ""
    }
  },

  // пересчитываются каждый раз, когда меняется параметры, от которых зависит return (или типа того)
  computed: {

  },

  // статические функции
  methods: {
    handleCellClick: (evt, date, prevDay) => {
      const curObj = evt.target;
      if (prevDay) {
        prevDay.classList.remove("calendar-mini__cell_selected");
      }
      curObj.classList.add("calendar-mini__cell_selected");
      date.day = parseInt(curObj.textContent);
      return curObj;
    },
  },

  props: {
    selectedDate: Object
  }

}
</script>

<style scoped>

</style>
