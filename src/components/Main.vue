<template>
  <section class="page page_type_main">
        <CalendarHeader :selectedDate="privateState.curDate"
                        :period="privateState.curPeriod"
                        :stats="privateState.workSpaceItems"/>
        <SimpleCalendarView :selectedDate="privateState.curDate"/>
        <AdvancedCalendarView :selectedDate="privateState.curDate"
                              :period="privateState.curPeriod"
                              :eventsArray="privateState.workSpaceItems"/>
        <TaskPopup :targetArray="pullSet[0]" :isOpen="privateState.taskPopupOpened"/>
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
  name: 'Main',

  created() {
    this.pullSet = getRandomPullSet();
    this.probesTaken = 1;
  },

  mounted() {
    this.privateState.workSpaceItems = this.genWorkSpace(15, .5);
    setTimeout(() => {
      this.privateState.taskPopupOpened = false;
    }, this.sharedState.memOffset * 1000);
    this.intervalId = setInterval(this.reinitWorkspace, (this.sharedState.memOffset + this.sharedState.taskOffset) * 1000);
  },

  data: function() {
    return {
      privateState: {
        curDate: shared.getCurDate({}),
        curPeriod: {days: 7},
        workSpaceItems: [],
        taskPopupOpened: true
      },
      sharedState: shared.sessionConfig
    }
  },

  components: {
    CalendarHeader,
    AdvancedCalendarView,
    SimpleCalendarView,
    TaskPopup
  },

  methods: {
    reinitWorkspace() {
      ++this.probesTaken;
      if (this.probesTaken > this.sharedState.numberOfProbes) {
        console.log("Probes finished");
        clearInterval(this.intervalId);
        this.$router.push("/");
        return;
      }
      console.log("taking probe:", this.probesTaken);
      this.pullSet = getRandomPullSet();
      this.privateState.workSpaceItems = this.genWorkSpace(15, .5);
      this.privateState.taskPopupOpened = true;
      setTimeout(() => {
        this.privateState.taskPopupOpened = false;
      }, this.sharedState.memOffset * 1000);
    },

    genDragItem(actName, pos, isTarget=false) {
      return {
        id: `act${pos.row}${pos.column}`,
        row: pos.row,
        column: pos.column,
        duration: 15,
        height: 1,
        title: actName,
        firstRender: true,
        isTarget: isTarget
      }
    },

    genWorkSpace(perColumn, targetPercentage) {
      const newWorkspace = [];
      console.log("TARGETS TO GENERATE:", Math.ceil(perColumn * targetPercentage));
      for (let i = 0; i < this.privateState.curPeriod.days; ++i) {
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
