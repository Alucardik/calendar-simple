<template>
  <div class="main-space">
    <div class="weekdays-row" :style="calcWeekRowAlignment">
      <div class="weekdays-row__cell" v-for="day in period.days" :key="`day${day}`">
        {{ weekdays[getDayOfTheWeek(selectedDate, day - 1)] }}
        <h2 class="weekdays-row__day">{{ selectedDate.day + day - 1 }}</h2>
      </div>
    </div>
    <div class="date-cell" :style="calcTableSz">
      <!-- fictional cell for alignment -->
      <div/>
      <div class="date-cell__border-gap" v-for="_ in period.days" :key="`border-day${_}`"></div>
      <div style="min-height: 100%; width: 100%; display: flex; flex-direction: column">
        <div class="date-cell__border-gap date-cell__border-gap_type_vertical" v-for="_ in 24" :key="`timeline-cell${_}`">
          <span style="position: relative; right: 30px; bottom: 6px;">{{ _ - 1 }}:00</span>
        </div>
      </div>
      <div class="date-cell__contents" v-for="column in period.days" :key="`column${column}`">
        <TableCell @add-item="handleDropOnCell" :column="column" :items="eventsArray" :stats="stats" :probeNum="probeNum"/>
        <div @click="handleCustom" class="date-cell__table-cell"
             v-for="_ in 24"
             :key="`column${column}cell${(_ + _ % 2) / 2}half${-(_ % 2) + 2}`"
             :row="(_ + _ % 2) / 2" :half="-(_ % 2) + 2"/>
        <div @click="handleCustom" class="date-cell__table-cell"
             v-for="_ in 24"
             :key="`column${column}cell${(_ + _ % 2) / 2 + 12}half${-(_ % 2) + 2}`"
             :row="(_ + _ % 2) / 2 + 12" :half="-(_ % 2) + 2"/>
<!--        <PositionalCell v-for="_ in 24"-->
<!--             :key="`column${column}cell${(_ + _ % 2) / 2}half${-(_ % 2) + 2}`"-->
<!--             :row="(_ + _ % 2) / 2" :half="-(_ % 2) + 2"-->
<!--             :curItem="droppedItem"/>-->
<!--        <PositionalCell v-for="_ in 24"-->
<!--             :key="`column${column}cell${(_ + _ % 2) / 2 + 12}half${-(_ % 2) + 2}`"-->
<!--             :row="(_ + _ % 2) / 2 + 12" :half="-(_ % 2) + 2"-->
<!--             :curItem="droppedItem"/>-->
      </div>
    </div>
  </div>
</template>

<script>
import TableCell from "@/components/TableCell";
import consts from "../assets/scripts/utils/constants.js";
import shared from "@/assets/scripts/utils/shared";

export default {
  name: "AdvancedCalendarView",

  components: {
    TableCell,
    // PositionalCell
  },

  props: {
    eventsArray: Array,
    selectedDate: Object,
    period: Object,
    stats: Array,
    probeNum: Number,
  },

  data: function () {
    return {
      droppedItem: {}
    };
  },

  created() {
    this.months = consts.months;
    this.weekdays = consts.weekdays;
    this.getDayOfTheWeek = shared.getDayOfTheWeek;
  },

  // пересчитываются каждый раз, когда меняются параметры, от которых зависит return
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
    },
  },

  methods: {
    handleCustom() {
      // console.log(`captured at row ${this.row} and half ${this.half}`);
      // console.log(this.curItem.title);
    },

    handleDropOnCell(item) {
      // console.log("Passing dragged", item);
      this.droppedItem = item;
    },
  },
}
</script>

<style scoped>

</style>
