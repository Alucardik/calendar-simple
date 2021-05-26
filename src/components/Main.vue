<template>
  <section class="page page_type_main">
        <CalendarHeader :probeStart="probeStart"
                        :selectedDate="privateState.curDate"
                        :period="privateState.curPeriod"
                        :stats="privateState.workSpaceItems"
                        :onInterrupt="handleProbeInterrupt.bind(this)"/>

        <SimpleCalendarView :selectedDate="privateState.curDate"/>

        <AdvancedCalendarView :selectedDate="privateState.curDate"
                              :period="privateState.curPeriod"
                              :eventsArray="privateState.workSpaceItems"
                              :stats="statistics"
                              :probeNum="probesTaken" />

        <TaskPopup :targetArray="pullSet[0]"
                   :isOpen="privateState.taskPopupOpened"/>
  </section>
</template>

<script>
import CalendarHeader from "./CalendarHeader";
import SimpleCalendarView from "./SimpleCalendarView";
import AdvancedCalendarView from "./AdvancedCalendarView";
import TaskPopup from "./TaskPopup";
import shared from "../assets/scripts/utils/shared";
import constants from "../assets/scripts/utils/constants";
import getRandomPullSet from "../assets/scripts/utils/templates";
// import sendStats from "../assets/scripts/utils/sheetsApi";

export default {
  name: 'Main',

  created() {
    this.json2csv = require('csvjson-json2csv');
    this.statistics = [];
    this.pullSet = [];
    this.probesTaken = 1;
    this.probeStart = Date.now();
    this.initWorkspace();
  },

  mounted() {
    // this.initWorkspace();
    this.intervalId = setInterval(this.reinitWorkspace, (this.sharedState.memOffset + this.sharedState.taskOffset) * 1000);
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

  data: function() {
    return {
      privateState: {
        curDate: shared.getCurDate({}),
        curPeriod: {days: 7},
        workSpaceItems: [],
        taskPopupOpened: true,
        pullSet: [],
        // probeStart: Date.now(),
        // probesTaken: 1,
        // probeStart: Date.now(),
        // statistics: [],
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
    collectStat() {
      // TODO add clicks array (seconds since probe start)
      // TODO add by word target strikes separation (strikes per target word)
      // TODO add separate button / page for send data confirmation
      // TODO ask about storing data to local storage in case api is unavailable
      // TODO ask about saving personal data
      this.statistics[this.probesTaken - 1]["Time"] =
        (Math.round(Math.floor(Date.now() - this.probeStart) / 1000 ) - this.sharedState.memOffset);
      // console.log("COLLECTING STAT for", this.privateState.probesTaken);
      // this.privateState.statistics[this.privateState.probesTaken - 1]["Probe"] = this.privateState.probesTaken;
      // this.privateState.statistics[this.privateState.probesTaken - 1]["Time"] =
      //   (Math.round(Math.floor(Date.now() - this.privateState.probeStart) / 1000 ) - this.sharedState.memOffset);
    },

    initWorkspace() {
      // this.statistics["Total_words_struck"].push(0);
      // this.statistics["Total_targets"].push(0);
      // this.statistics["Targets_struck"].push(0);
      // console.log("CHECK AVAILABILITY", this.privateState.taskPopupOpened);
      this.statistics.push(Object.create(constants.sampleStatObjects[this.sharedState.taskType]));
      this.statistics[this.probesTaken - 1]["Probe"] = this.probesTaken;
      this.pullSet = getRandomPullSet();
      // console.log("Stats before push", this.privateState.statistics);
      // this.privateState.statistics.push(constants.sampleStatObjects[this.sharedState.taskType]);
      // console.log("Stats after push", this.privateState.statistics);
      // this.privateState.pullSet = getRandomPullSet();
      this.privateState.workSpaceItems = this.genWorkSpace(15, .5);
      this.privateState.taskPopupOpened = true;
      setTimeout(() => {
        this.privateState.taskPopupOpened = false;
      }, this.sharedState.memOffset * 1000);
    },

    reinitWorkspace() {
      this.collectStat();
      console.log("NEW STAT", this.statistics);
      this.probeStart = Date.now();
      // this.privateState.probeStart = Date.now();
      ++this.probesTaken;
      // ++this.privateState.probesTaken;
      if (this.probesTaken > this.sharedState.numberOfProbes) {
        console.log("Probes finished");
        clearInterval(this.intervalId);
        this.$router.push("/");
        // sending data to Sheets API
        // sendStats(this.json2csv(this.statistics));
        console.log(this.json2csv(this.statistics));
        return;
      }
      console.log("taking probe:", this.probesTaken);
      // console.log("taking probe:", this.privateState.probesTaken);
      this.initWorkspace();
    },

    handleProbeInterrupt() {
      clearInterval(this.intervalId);
      this.reinitWorkspace();
      this.intervalId = setInterval(this.reinitWorkspace, (this.sharedState.memOffset + this.sharedState.taskOffset) * 1000);
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
        isTarget: isTarget,
        isStriked: false
      }
    },

    genWorkSpace(perColumn, targetPercentage) {
      // TODO remake generation
      const newWorkspace = [], targetsToGen = Math.ceil(perColumn * targetPercentage);
      for (let i = 0; i < this.privateState.curPeriod.days; ++i) {
        this.statistics[this.probesTaken - 1]["Total_targets"] += targetsToGen;
        // this.privateState.statistics[this.privateState.probesTaken - 1]["Total_targets"] += targetsToGen;
        let targetsLeft = targetsToGen;
        for (let j = 0; j < perColumn; ++j) {
          //checking slots left
          // if too few left => generate only targets
          if (perColumn - j === targetsLeft) {
            newWorkspace.push(this.genDragItem(
              this.pullSet[0][Math.floor(Math.random() * this.pullSet[0].length)],
              {column: i + 1, row: j + 1}, true));
            // this.privateState.pullSet[0][Math.floor(Math.random() * this.privateState.pullSet[0].length)],
            //   {column: i + 1, row: j + 1}, true));
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
              // this.privateState.pullSet[0][Math.floor(Math.random() * this.privateState.pullSet[0].length)],
              // {column: i + 1, row: j + 1}, true));
            --targetsLeft;
          } else {
            // chosen distractor
            newWorkspace.push(this.genDragItem(
              this.pullSet[1][Math.floor(Math.random() * this.pullSet[1].length)],
              {column: i + 1, row: j + 1}));
            // newWorkspace.push(this.genDragItem(
            //   this.privateState.pullSet[1][Math.floor(Math.random() * this.privateState.pullSet[1].length)],
            //   {column: i + 1, row: j + 1}));
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
