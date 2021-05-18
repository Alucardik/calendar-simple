
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
    "Probe": [],
    "Time": [],
    "Total_words_struck": [],
    "Total_targets": [],
    "Targets_struck": [],
  }
};

const weekdays = ['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ'];
const weekdayNames = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
const months =  [
    'Январь','Февраль','Март','Апрель','Май','Июнь','Июль',
    'Август','Сентябрь','Октябрь','Ноябрь','Декабрь'
];

export default {weekdays, weekdayNames, months, tasksTexts, sampleStatObjects}
