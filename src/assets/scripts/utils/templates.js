// TODO add all pulls and test block by block

const targetPulls = [
  {
    pull: ["тренировка", "звонок", "отдых"],
    targets: 21
  },
  {
    pull: ["покупка", "свидание", "встреча"],
    targets: 21
  },
  {
    pull: ["оплата", "поездка", "экзамен"],
    targets: 21
  },
  {
    pull: ["собрание", "уборка", "работа"],
    targets: 21
  },
  {
    pull: ["отдых", "встреча", "собрание"],
    targets: 21
  },
  {
    pull: ["экзамен", "оплата", "работа"],
    targets: 21
  },
  {
    pull: ["свидание", "покупка", "поездка"],
    targets: 21
  },
  {
    pull: ["тренировка", "уборка", "звонок"],
    targets: 21
  },
  {
    pull: ["отдых", "встреча", "звонок"],
    targets: 21
  },
  {
    pull: ["поездка", "уборка", "экзамен"],
    targets: 21
  },
  {
    pull: ["покупка", "отдых", "тренировка"],
    targets: 51
  },
  {
    pull: ["встреча", "свидание", "экзамен"],
    targets: 51
  },
  {
    pull: ["оплата", "звонок", "уборка"],
    targets: 51
  },
  {
    pull: ["поездка", "собрание", "работа"],
    targets: 51
  },
  {
    pull: ["звонок", "тренировка", "свидание"],
    targets: 51
  },
  {
    pull: ["собрание", "работа", "экзамен"],
    targets: 51
  },
  {
    pull: ["отдых", "оплата", "поездка"],
    targets: 51
  },
  {
    pull: ["уборка", "встреча", "покупка"],
    targets: 51
  },
  {
    pull: ["поездка", "звонок", "тренировка"],
    targets: 51
  },
  {
    pull: ["свидание", "покупка", "работа"],
    targets: 51
  },
  {
    pull: ["собрание", "экзамен", "встреча"],
    targets: 51
  },
  {
    pull: ["уборка", "отдых", "оплата"],
    targets: 51
  },
  {
    pull: ["экзамен", "отдых", "покупка"],
    targets: 90
  },
  {
    pull: ["свидание", "встреча", "тренировка"],
    targets: 90
  },
  {
    pull: ["поездка", "собрание", "уборка"],
    targets: 90
  },
  {
    pull: ["работа", "оплата", "звонок"],
    targets: 90
  },
  {
    pull: ["экзамен", "поездка", "собрание"],
    targets: 90
  },
  {
    pull: ["тренировка", "встреча", "уборка"],
    targets: 90
  },
  {
    pull: ["работа", "свидание", "покупка"],
    targets: 90
  },
  {
    pull: ["оплата", "звонок", "отдых"],
    targets: 90
  },
];

const distractorPull =
  ["выходной", "отпуск", "магазин", "пробежка", "переезд", "ужин", "офис", "занятие", "каникулы", "лекция", "планирование"];

const genPositions = () => {
  const newPosArr = [];
  for (let i = 1; i < 8; ++i) {
    for (let j = 1; j < 16; ++j) {
      for (let k = 1; k < 3; ++k) {
        newPosArr.push({
          column: i,
          row: j,
          half: k
        });
      }
    }
  }

  return newPosArr;
}

export {targetPulls, distractorPull, genPositions};

// export default function getRandomPullSet() {
//   const pullNum = Math.floor(Math.random() * targetPulls.length);
//   return [targetPulls[pullNum], distractorPull];
// }
