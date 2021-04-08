<template>
  <div class="main-space">
<!--    <div class="timeline-column">-->
<!--      <div class="timeline-column__cell" v-for="hour in 24" :key="hour">-->
<!--        {{ hour - 1 }}:00-->
<!--      </div>-->
<!--    </div>-->
    <div class="weekdays-row" :style="calcWeekRowAlignment">
      <div class="weekdays-row__cell" v-for="day in period.days" :key="`day${day}`">
        {{ weekdays[getDayOfTheWeek(selectedDate, day - 1)] }}
        <h2 class="weekdays-row__day">{{ selectedDate.day + day - 1 }}</h2>
      </div>
    </div>
    <div class="date-cell" :style="calcTableSz">
      <!-- fictional cell for alignment -->
      <div></div>
      <div class="date-cell__border-gap" v-for="_ in period.days" :key="`border-day${_}`"></div>
      <div style=" min-height: 100%; width: 100%; display: flex; flex-direction: column">
        <div class="date-cell__border-gap date-cell__border-gap_type_vertical" v-for="_ in 24" :key="_">
          <span style="position: relative; right: 30px; bottom: 6px;">{{ _ - 1 }}:00</span>
        </div>
      </div>
      <div class="date-cell__contents" v-for="_ in period.days" :key="_">
        <div class="date-cell__table-cell" v-for="_ in 24" :key="_"></div>
      </div>
    </div>
  </div>
</template>

<script>
import consts from "../assets/scripts/utils/constants.js";
import shared from "@/assets/scripts/utils/shared";

export default {
  name: "AdvancedCalendarView",

  created() {
    this.months = consts.months;
    this.weekdays = consts.weekdays;
    this.getDayOfTheWeek = shared.getDayOfTheWeek;
  },

  data: function() {
    return {
    }
  },

  // пересчитываются каждый раз, когда меняется параметры, от которых зависит return
  computed: {
    calcTableSz() {
      return {
        "grid-template-columns": `10px repeat(${this.period.days}, 1fr)`
      }
    },

    calcWeekRowAlignment() {
      return {
        "justify-content": this.period.days === 1 ? "flex-start" : "space-around",
        "padding-left": this.period.days === 1 ? "40px" : "0"
      }
    }
  },

  // статические функции
  methods: {
  },

  props: {
    selectedDate: Object,
    period: Object
  }

}
</script>

<style scoped>

</style>
