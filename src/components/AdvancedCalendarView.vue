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
      <div style="min-height: 100%; width: 100%; display: flex; flex-direction: column">
        <div class="date-cell__border-gap date-cell__border-gap_type_vertical" v-for="_ in 24" :key="`timeline-cell${_}`">
          <span style="position: relative; right: 30px; bottom: 6px;">{{ _ - 1 }}:00</span>
        </div>
      </div>
      <div class="date-cell__contents" v-for="_ in period.days" :key="`column${_}`">
        <div class="date-cell__table-cell" v-for="_ in 2" :key="_" v-on:drop="onDrop($event, 1)">
          <div draggable="true" v-on:dragstart="onStartDrag($event, listOne[_ - 1])">
            {{ listOne[_ - 1].title }}
          </div>
        </div>
        <div class="date-cell__table-cell" v-for="_ in 1" :key="_" v-on:drop="onDrop($event, 1)">
          <div draggable="true" v-on:dragstart="onStartDrag($event, listTwo[_ - 1])">
            {{ listTwo[_ - 1].title }}
          </div>
        </div>
        <div class="date-cell__table-cell" v-for="_ in 21" :key="_" v-on:drop="onDrop($event, 2)"></div>
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
      draGnDropItems:  [
        {
          id: "it0",
          title: 'Item A',
          list: 1
        },
        {
          id: "it1",
          title: 'Item B',
          list: 1
        },
        {
          id: "it2",
          title: 'Item C',
          list: 2
        }]
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
    },

    listOne () {
      // console.log("List 1", this.draGnDropItems.filter(item => item.list === 1));
      return this.draGnDropItems.filter(item => item.list === 1);
    },

    listTwo () {
      // console.log("List 2", this.draGnDropItems.filter(item => item.list === 2));
      return this.draGnDropItems.filter(item => item.list === 2);
    }
  },

  // статические функции
  methods: {
    onStartDrag: (evt, item) => {
      console.log("Drag evt:", evt);
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('itemID', item.id);
    },

    onDrop (evt, list) {
      const itemID = evt.dataTransfer.getData('itemID');
      const item = this.items.find(item => item.id === itemID);
      item.list = list;
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
