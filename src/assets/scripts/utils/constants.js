
const tasksTexts = {
  proofreading: {
    intro: "Сейчас перед Вами появится список слов для запоминания.",
    memTime: "Время предъявления (в секундах): ",
    conclusion: "После этого вы будете перенаправлены в пространство ежедневника." +
      "Вы должны щелчком мыши отмечать дела, соответствующие только что запомненным словам.",
    taskTime: "Время на выполнение (в секундах): "
  },
};

const sampleStatObjects = {
  proofreading: {
    "Probe": 0,
    "Time": 0,
    "Total_words_struck": 0,
    "Target1_struck": 0,
    "Target2_struck": 0,
    "Target3_struck": 0,
    "Total_targets": 0,
    "Targets_struck": 0,
    "Clicks": 0
  }
};

const weekdays = ['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ'];
const weekdayNames = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
const months =  [
    'Январь','Февраль','Март','Апрель','Май','Июнь','Июль',
    'Август','Сентябрь','Октябрь','Ноябрь','Декабрь'
];

export default {weekdays, weekdayNames, months, tasksTexts, sampleStatObjects}
