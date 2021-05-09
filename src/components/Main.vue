<template>
  <section class="page page_type_main">
        <CalendarHeader v-bind:selectedDate="curDate" v-bind:period="curPeriod" :stats="draGnDropItems"/>
        <SimpleCalendarView v-bind:selectedDate="curDate"/>
        <AdvancedCalendarView v-bind:selectedDate="curDate"
                              v-bind:period="curPeriod"
                              v-bind:eventsArray="workSpaceItems"/>
        <TaskPopup v-bind:targetArray="this.pullSet[0]"/>
  </section>
</template>

<script>
import CalendarHeader from "./CalendarHeader";
import SimpleCalendarView from "./SimpleCalendarView";
import AdvancedCalendarView from "./AdvancedCalendarView";
import TaskPopup from "./TaskPopup";
import shared from "../assets/scripts/utils/shared";
import getRandomPullSet from "../assets/scripts/utils/templates";

export default {
  name: 'App',

  created() {
    this.pullSet = getRandomPullSet();
  },

  mounted() {
    this.workSpaceItems = this.genWorkSpace(15, .5);
  },

  data: function() {
    return {
      curDate: shared.getCurDate({}),
      curPeriod: {days: 7},
      workSpaceItems: [],
      draGnDropItems:  [
        {
          id: "it0",
          row: 12,
          column: 1,
          duration: 15,
          height: 1,
          title: 'Item A',
          firstRender: true,
        },
        {
          id: "it1",
          row: 7,
          column: 1,
          duration: 15,
          height: 1,
          title: 'Item B',
          firstRender: true,
        },
        {
          id: "it2",
          row: 4,
          column: 2,
          duration: 15,
          height: 1,
          title: 'Item C',
          firstRender: true,
        },
        {
          id: "it3",
          row: 4,
          column: 1,
          duration: 15,
          height: 1,
          title: 'Item D',
          firstRender: true,
        },
        {
          id: "it4",
          row: 4,
          column: 6,
          duration: 15,
          height: 1,
          title: 'Item E',
          firstRender: true,
        },
        {
          id: "it5",
          row: 6,
          column: 5,
          duration: 15,
          height: 1,
          title: 'Item F',
          firstRender: true,
        },
        {
          id: "it6",
          row: 9,
          column: 7,
          duration: 15,
          height: 1,
          title: 'Item G',
          firstRender: true,
        },
      ],
    }
  },

  components: {
    CalendarHeader,
    AdvancedCalendarView,
    SimpleCalendarView,
    TaskPopup
  },

  computed: {
  },

  methods: {
    genDragItem(actName, pos, target=false) {
      return {
        id: `act${pos.row}${pos.column}`,
        row: pos.row,
        column: pos.column,
        duration: 15,
        height: 1,
        title: actName,
        firstRender: true,
        isTarget: target
      }
    },

    genWorkSpace(perColumn, targetPercentage) {
      const newWorkspace = [];
      console.log("TARGETS TO GENERATE:", Math.ceil(perColumn * targetPercentage));
      for (let i = 0; i < this.curPeriod.days; ++i) {
        let targetsLeft = Math.ceil(perColumn * targetPercentage);
        for (let j = 0; j < perColumn; ++j) {
          //checking slots left
          // if too few left => generate only targets
          if (perColumn - j === targetsLeft) {
            newWorkspace.push(this.genDragItem(
              this.pullSet[0][Math.floor(Math.random() * this.pullSet[0].length)],
              {column: i + 1, row: j + 1}, true));
            --targetsLeft;
            continue;
          }

          // if there are spare slots =>
          // choose targer or distractor randomly
          if (Math.random() > 0.5 && targetsLeft) {
            // chosen target if any are left
            newWorkspace.push(this.genDragItem(
              this.pullSet[0][Math.floor(Math.random() * this.pullSet[0].length)],
              {column: i + 1, row: j + 1}, true));
            --targetsLeft;
          } else {
            // chosen distractor
            newWorkspace.push(this.genDragItem(
              this.pullSet[1][Math.floor(Math.random() * this.pullSet[1].length)],
              {column: i + 1, row: j + 1}));
          }
        }
      }

      return newWorkspace;
    }
  },
}
</script>

<style>
@import url('../assets/pages/index.css');
</style>
