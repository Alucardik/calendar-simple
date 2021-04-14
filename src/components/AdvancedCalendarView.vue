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
      <div class="date-cell__contents" v-for="column in period.days" :key="`column${column}`">
        <TableCell :column="column" :items="eventsArray"/>
        <div class="date-cell__table-cell" v-for="_ in 24" :key="`column${column}cell${_}`" :row="_"></div>
<!--        <TableCell v-for="_ in 2"-->
<!--             :column="column"-->
<!--             :row="_"-->
<!--             :items="[draGnDropItems[_ - 1]]"-->
<!--             :key="`column${column}cell${_}`">-->
<!--&lt;!&ndash;          <div draggable="true" v-on:dragstart="onDragStart($event, draGnDropItems[_ - 1])">&ndash;&gt;-->
<!--&lt;!&ndash;            {{ draGnDropItems[_ - 1].title }}&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--        </TableCell>-->
<!--        <TableCell v-for="_ in 1"-->
<!--             :column="column"-->
<!--             :row="_ + 2"-->
<!--             :items="[draGnDropItems[2]]"-->
<!--             :key="`column${column}cell${_ + 2}`">-->
<!--&lt;!&ndash;          <div draggable="true" v-on:dragstart="onDragStart($event, draGnDropItems[_ - 1])">&ndash;&gt;-->
<!--&lt;!&ndash;            {{ draGnDropItems[_].title }}&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--        </TableCell>-->
<!--        <TableCell v-for="_ in 21"-->
<!--             :column="column"-->
<!--             :row="_ + 3"-->
<!--             :items="[]"-->
<!--             :key="`column${column}cell${_ + 3}`"></TableCell>-->
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
  },

  created() {
    this.months = consts.months;
    this.weekdays = consts.weekdays;
    this.getDayOfTheWeek = shared.getDayOfTheWeek;
    // this.
  },

  mounted() {
    // this.timetable = document.querySelectorAll(".date-cell__table-cell");
  },

  data: function() {
    return {

    }
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

    // listOne () {
    //   // console.log("List 1", this.draGnDropItems.filter(item => item.list === 1));
    //   return this.draGnDropItems.filter(item => item.list === 1);
    // },
    //
    // listTwo () {
    //   // console.log("List 2", this.draGnDropItems.filter(item => item.list === 2));
    //   return this.draGnDropItems.filter(item => item.list === 2);
    // }
  },

  // статические функции
  methods: {
    // moveCellsOnTop(dragInProcess) {
    //   console.log("Invoked", dragInProcess);
    //   if (dragInProcess) {
    //     this.timetable.forEach(cell => {
    //       cell.classList.add("date-cell__table-cell_on-top");
    //     });
    //   } else {
    //     this.timetable.forEach(cell => {
    //       cell.classList.add("date-cell__table-cell_on-top");
    //     });
    //   }
    // }
    // onDragStart: (evt, item) => {
    //   const chosenDiv = evt.target.closest(".date-cell__table-cell");
    //   console.log("Picked at:", chosenDiv);
    //   console.log(chosenDiv.attributes["row"].textContent, chosenDiv.attributes["column"]);
    //   // console.log("Drag evt:", evt);
    //   // console.log("params:", evt.target.closest(".date-cell__table-cell").row,
    //   //   evt.target.closest(".date-cell__table-cell").column);
    //   // item.row = evt.target.closest(".date-cell__table-cell").row;
    //   // item.column = evt.target.closest(".date-cell__table-cell").column;
    //   evt.dataTransfer.dropEffect = 'move';
    //   evt.dataTransfer.effectAllowed = 'move';
    //   evt.dataTransfer.setData('itemID', item.id);
    // },
    //
    // onDrop (evt) {
    //   console.log("Dropped at:", evt.target.closest(".date-cell__table-cell"));
    //   // console.log("Drop evt:", evt);
    //   // const itemID = evt.dataTransfer.getData('itemID');
    //   // const item = this.draGnDropItems.find(it => it.id === itemID);
    //   // item.row = evt.target.row;
    //   // item.column = evt.target.column;
    // },
  },

  props: {
    eventsArray: Array,
    selectedDate: Object,
    period: Object
  }

}
</script>

<style scoped>

</style>
