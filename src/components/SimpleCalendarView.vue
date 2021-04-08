<template>
  <div class="calendar-mini">
    <h3 class="calendar-mini__heading">
      {{ months[selectedDate.month - 1] }} {{ selectedDate.year }}
    </h3>

    <div class="calendar-mini__table">
      <div class="calendar-mini__cell"
           v-for="curDay in (new Date(selectedDate.year, selectedDate.month, 0).getDate())"
           :key="curDay">
        {{ curDay }}
      </div>
    </div>
  </div>
</template>

<script>
import data from "../assets/scripts/utils/constants.js";

export default {
  name: "SimpleCalendarView",

  data: function() {
    return {
      months: data.months
    }
  },

  // пересчитываются каждый раз, когда меняется параметры, от которых зависит return (или типа того)
  computed: {

  },

  // статические функции
  methods: {

  },

  props: {
    selectedDate: Object
  }

}
</script>

<style scoped>

</style>
