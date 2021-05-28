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

        <TaskPopup :targetArray="pullSet[curPullInd].pull"
                   :isOpen="privateState.taskPopupOpened"/>
    <button type="button" class="header__button header__button_type_exit"
            style="width: 120px;"
            @click="handleProbeInterrupt">
      Закончить раунд
    </button>
  </section>
</template>

<script>
import CalendarHeader from "./CalendarHeader";
import SimpleCalendarView from "./SimpleCalendarView";
import AdvancedCalendarView from "./AdvancedCalendarView";
import TaskPopup from "./TaskPopup";
import shared from "../assets/scripts/utils/shared";
import constants from "../assets/scripts/utils/constants";
import * as pullsData from "../assets/scripts/utils/templates";
import sendStats from "../assets/scripts/utils/sheetsApi";

export default {
  name: 'Main',

  created() {
    this.json2csv = require('csvjson-json2csv');
    this.notifSignal = new Audio(require("../assets/media/notification.ogg"));
    this.signalTimerId = false;
    this.sparePositions = [];
    this.statistics = [];
    this.pullSet = Object.assign(pullsData.targetPulls);
    this.curPullInd = -1;
    this.probesTaken = 1;
    this.probeStart = Date.now();
    this.initWorkspace();
  },

  mounted() {
    this.intervalId = setInterval(this.reinitWorkspace, (this.sharedState.memOffset + this.sharedState.taskOffset) * 1000);
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
    window.removeEventListener("click", this.recordClicks);
    if (this.signalTimerId) {
      clearInterval(this.signalTimerId);
    }
    // switch task type
    (this.sharedState.taskType === "proofreading")
    ? (this.sharedState.taskType = "switchability")
    : (this.sharedState.taskType = "proofreading");
  },

  data: function() {
    return {
      privateState: {
        curDate: shared.getCurDate({}),
        curPeriod: {days: 7},
        workSpaceItems: [],
        taskPopupOpened: true,
        pullSet: [],
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
    recordClicks() {
      this.statistics[this.probesTaken - 1]["Clicks"].push(Math.floor((Date.now() - this.probeStart) / 1000)
        - this.sharedState.memOffset);
    },

    collectStat() {
      // TODO add separate button / page for successful send stats request confirmation
      this.statistics[this.probesTaken - 1]["Time"] =
        (Math.round(Math.floor(Date.now() - this.probeStart) / 1000 ) - this.sharedState.memOffset);
      // console.log("COLLECTING STAT for", this.privateState.probesTaken);
      // this.privateState.statistics[this.privateState.probesTaken - 1]["Probe"] = this.privateState.probesTaken;
      // this.privateState.statistics[this.privateState.probesTaken - 1]["Time"] =
      //   (Math.round(Math.floor(Date.now() - this.privateState.probeStart) / 1000 ) - this.sharedState.memOffset);
    },

    initWorkspace() {
      if (this.signalTimerId) {
        clearInterval(this.signalTimerId);
      }
      // this.notifSignal.play();
      window.removeEventListener("click", this.recordClicks);
      this.statistics.push(Object.create(constants.sampleStatObjects[this.sharedState.taskType]));
      this.statistics[this.probesTaken - 1]["Probe"] = this.probesTaken;
      // initialise empty clicks time array
      this.statistics[this.probesTaken - 1]["Clicks"] = [];
      if (this.curPullInd !== -1) {
        // delete selected pull from available ones
        this.pullSet.splice(this.curPullInd, 1);
      }
      this.curPullInd = Math.floor(Math.random() * this.pullSet.length);
      console.log("INDEX", this.curPullInd);
      this.sparePositions = pullsData.genPositions();
      this.privateState.workSpaceItems = this.genWorkSpace(this.pullSet[this.curPullInd]);
      this.privateState.taskPopupOpened = true;
      setTimeout(() => {
        this.privateState.taskPopupOpened = false;
        window.addEventListener("click", this.recordClicks);
        if (this.sharedState.taskType === "switchability") {
          this.signalTimerId = setInterval(() => {this.notifSignal.play()}, this.sharedState.signalOffset * 1000);
        }
      }, this.sharedState.memOffset * 1000);
    },

    reinitWorkspace() {
      this.collectStat();
      console.log("NEW STAT", this.statistics);
      this.probeStart = Date.now();
      ++this.probesTaken;
      if (this.probesTaken > this.sharedState.numberOfProbes) {
        console.log("Probes finished");
        console.log("Collected Info");
        clearInterval(this.intervalId);
        // save cur stats
        shared.allStats[this.sharedState.taskType] = Object.assign(this.statistics);
        // if all tasks have been accomplished => finish probe
        if (shared.allStats.proofreading && shared.allStats.switchability) {
          this.$router.push("/");
          // send data to Sheets API
          console.log("FINALLY", shared.allStats);
          Promise.all([sendStats(this.json2csv(shared.personalInfo), 0),
            sendStats(this.json2csv(shared.allStats), 916952360)])
            .then(() => {
              window.alert("All Data was successfully retrieved");
            })
            .catch((errs) => {
              window.alert(`API encountered errors with status:\n${errs}`);
            });
        } else {
          // else go for another task
          this.$router.push("/about");
        }


        return;
      }
      console.log("taking probe:", this.probesTaken);
      this.initWorkspace();
    },

    handleProbeInterrupt() {
      clearInterval(this.intervalId);
      this.reinitWorkspace();
      this.intervalId = setInterval(this.reinitWorkspace, (this.sharedState.memOffset + this.sharedState.taskOffset) * 1000);
    },

    genDragItem(actName, pos, targetNum=-1, isTarget=false) {
      return {
        id: `r${pos.row}c${pos.column}h${pos.half}`,
        row: pos.row,
        column: pos.column,
        half: pos.half,
        neighbours: [],
        posNum: 0,
        // duration: 15,
        height: 1,
        title: actName,
        // firstRender: true,
        isTarget: isTarget,
        targetNum: targetNum,
        isStriked: false
      }
    },

    genWorkSpace(selectedPull) {
      const newWorkspace = [];
      for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < selectedPull.targets / 3; ++j) {
          const selectedPosInd = Math.floor(Math.random() * this.sparePositions.length),
            selectedPos = this.sparePositions[selectedPosInd];
          // delete selected position from spare ones
          this.sparePositions.splice(selectedPosInd, 1);
          newWorkspace.push(this.genDragItem(selectedPull.pull[i], selectedPos, i, true));
        }
      }
      for (let i = 0; i < 210 - selectedPull.targets; ++i) {
        const selectedPosInd = Math.floor(Math.random() * this.sparePositions.length),
          selectedPos = this.sparePositions[selectedPosInd];
        // delete selected position from spare ones
        this.sparePositions.splice(selectedPosInd, 1);
        newWorkspace.push(this.genDragItem(pullsData.distractorPull[Math.floor(Math.random() * pullsData.distractorPull.length)],
          selectedPos));
      }
      return newWorkspace;
    }
  },
}
</script>

<style>
@import url('../assets/pages/index.css');
</style>
