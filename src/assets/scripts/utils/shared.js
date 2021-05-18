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

  sessionConfig: {
    // what type of task will be tested
    taskType: "proofreading",
    // how many times it will be tested
    numberOfProbes: 3,
    // how much time (in seconds) does participant have for memorising
    memOffset: 5,
    // how much time (in seconds) does participant have for completing the task
    taskOffset: 5
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
          "</span>"
      );
      default:
        return "Задание указанного типа не было найдено.";
    }
  }
}
