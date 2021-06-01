import constants from "./constants";

export default {
  getCurDate: (date) => {
      const today = new Date();
      date.day = today.getDate();
      date.month = today.getMonth() + 1;
      date.year = today.getFullYear();
      return date;
  },

  getDayOfTheWeek: (baseDate, dayOffset) => {
      const someDay = new Date(baseDate.year, baseDate.month - 1, baseDate.day + dayOffset);
      return someDay.getDay()
  },

  personalInfo: {
    "Name": "",
    "Age": "",
    "Gender": ""
  },

  allStats: {
    proofreading: false,
    switchability: false
  },

  sessionConfig: {
    // what type of task will be tested (first one is picked randomly)
    taskType: constants.taskTypes[Math.floor(Math.random() * 2)],
    // how many times it will be tested
    numberOfProbes: 3,
    // how much time (in seconds) does participant have for memorising
    memOffset: 5,
    // how much time (in seconds) does participant have for completing the task
    taskOffset: 60,
    // when signal for switching should be heard
    signalOffset: 15,
  },
}
