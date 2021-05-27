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
// import getRandomPullSet from "../assets/scripts/utils/templates";
import sendStats from "../assets/scripts/utils/sheetsApi";

export default {
  name: 'Main',

  created() {
    this.json2csv = require('csvjson-json2csv');
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
      // TODO ask about storing data to local storage in case api is unavailable
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
      // console.log("Stats before push", this.privateState.statistics);
      // this.privateState.statistics.push(constants.sampleStatObjects[this.sharedState.taskType]);
      // console.log("Stats after push", this.privateState.statistics);
      // this.privateState.pullSet = getRandomPullSet();
      this.privateState.workSpaceItems = this.genWorkSpace(this.pullSet[this.curPullInd]);
      this.privateState.taskPopupOpened = true;
      setTimeout(() => {
        this.privateState.taskPopupOpened = false;
        window.addEventListener("click", this.recordClicks);
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
        console.log("Collected Info");
        clearInterval(this.intervalId);
        this.$router.push("/");
        // sending data to Sheets API
        Promise.all([sendStats(this.json2csv(shared.personalInfo), 0),
        sendStats(this.json2csv(this.statistics), 916952360)])
        .then(() => {
          window.alert("All Data was successfully retrieved");
        })
        .catch((errs) => {
          window.alert(`API encountered errors with status:\n${errs}`);
        });

        // console.log(this.json2csv(this.statistics));
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
      // TODO remake generation
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
      // for (let i = 0; i < this.privateState.curPeriod.days; ++i) {
      //   this.statistics[this.probesTaken - 1]["Total_targets"] += targetNum;
      //   // this.privateState.statistics[this.privateState.probesTaken - 1]["Total_targets"] += targetsToGen;
      //   let targetsLeft = targetsToGen;
      //   for (let j = 0; j < perColumn; ++j) {
      //     //checking slots left
      //     // if too few left => generate only targets
      //     if (perColumn - j === targetsLeft) {
      //       const chosenPos = Math.floor(Math.random() * this.pullSet[0].length);
      //       newWorkspace.push(this.genDragItem(
      //         this.pullSet[0][chosenPos],
      //         {column: i + 1, row: j + 1, half: (i + j) % 2 + 1}, chosenPos, true));
      //       // this.privateState.pullSet[0][Math.floor(Math.random() * this.privateState.pullSet[0].length)],
      //       //   {column: i + 1, row: j + 1}, true));
      //       --targetsLeft;
      //       continue;
      //     }
      //
      //     // if there are spare slots =>
      //     // choose targer or distractor randomly
      //     if (Math.random() > 0.5 && targetsLeft) {
      //       const chosenPos = Math.floor(Math.random() * this.pullSet[0].length);
      //       // chosen target if any are left
      //       newWorkspace.push(this.genDragItem(
      //         this.pullSet[0][chosenPos],
      //         {column: i + 1, row: j + 1, half: (i + j) % 2 + 1}, chosenPos,true));
      //         // this.privateState.pullSet[0][Math.floor(Math.random() * this.privateState.pullSet[0].length)],
      //         // {column: i + 1, row: j + 1}, true));
      //       --targetsLeft;
      //     } else {
      //       // chosen distractor
      //       newWorkspace.push(this.genDragItem(
      //         this.pullSet[1][Math.floor(Math.random() * this.pullSet[1].length)],
      //         {column: i + 1, row: j + 1, half: (i + j) % 2 + 1}));
      //       // newWorkspace.push(this.genDragItem(
      //       //   this.privateState.pullSet[1][Math.floor(Math.random() * this.privateState.pullSet[1].length)],
      //       //   {column: i + 1, row: j + 1}));
      //     }
      //   }
      // }
      return newWorkspace;
    }
  },
}
</script>

<style>
@import url('../assets/pages/index.css');
</style>
