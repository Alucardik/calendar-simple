export default {
  getCurDate(date) {
      const today = new Date();
      date.day = today.getDate();
      date.month = today.getMonth() + 1;
      date.year = today.getFullYear();
      return date;
  },

  getDayOfTheWeek: (baseDate, dayOffset) => {
      const someDay = new Date(baseDate.year, baseDate.month - 1, baseDate.day + dayOffset);
      // console.log("Начальная дата");
      // console.log(someDay.getDay());
      return someDay.getDay()

  },

  sessionConfig: {
    // what type of task will be tested
    taskType: "proofreading",
    // how many times it will be tested
    numberOfRepeats: 1,
    // how much time (in seconds) does participant have for memorising
    memOffset: 5,
    // how much time (in seconds) does participant have for completing the task
    taskOffset: 60
  }
}
