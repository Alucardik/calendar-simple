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

  genTaskInstruction: (config) => {
    const template = constants.tasksTexts[config.taskType];
    switch (config.taskType) {
      case "proofreading":
        return (
          "<span class='instruction__line'>" +
            `${template.intro}` +
         "</span>" +
         "<span class='instruction__line'>" +
            `${template.memTime + config.memOffset}` +
          "</span>" +
          "<span class='instruction__line'>" +
            `${template.conclusion}` +
          "</span>" +
         " <span class='instruction__line'>" +
            `${template.taskTime + config.taskOffset}` +
          "</span>" +
          " <span class='instruction__line'>" +
          `Вам предстоит пройти задание ${config.numberOfProbes} раз(-а).` +
          "</span>"
      );
      default:
        return "Задание указанного типа не было найдено.";
    }
  }
}
