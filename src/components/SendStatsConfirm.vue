<template>
  <section class="page">
    <h1 class="home__welcome">
      <span>Статистика прохождения эксперимента была собрана.</span>
      <span>{{genStatusText}}</span>
    </h1>
    <button type="button"
            class="send-button"
            @click="handleBtnClick"
            :style="selectColor"
            :disabled="!buttonStatus">
      {{genButtonText}}
    </button>
  </section>
</template>

<script>
import sendStats from "../assets/scripts/utils/sheetsApi";
import shared from "../assets/scripts/utils/shared";

export default {
  name: "SendStatsConfirm",

  created() {
    this.json2csv = require('csvjson-json2csv');
  },

  mounted() {
    // start sending data
    console.log("FINALLY", shared.allStats);
    this.createRequest();
  },

  data: function () {
    return {
      // 0 - in process, -1 - failed => retry, 1 - success => exit
      buttonStatus: 0,
      statusText: ""
    };
  },

  computed: {
    genButtonText() {
      switch(this.buttonStatus) {
        case 0:
          return "Данные в процессе отправки...";
        case 1:
          return "Завершить эксперимент"
        case -1:
          return "Повторить отправку"
        default:
          return "Отправить данные сессии"
      }
    },

    genStatusText() {
      switch(this.buttonStatus) {
        case 0:
          return "Пожалуйста, дождитесь окончания отправки данных.";
        case 1:
          return "Данные были успешно отправлены. Можете нажать кнопку ниже и покинуть страницу."
        case -1:
          return "Что-то пошло не так. Свяжитесь с экспериментатором или повторите отправку данных."
        default:
          return "Пожалуйста, отправьте данные, нажав кнопку ниже."
      }
    },

    selectColor() {
      switch(this.buttonStatus) {
        case 0:
          return "background-color: hsl(59.4, 85.7%, 73.7%)";
        case 1:
          return "background-color: hsl(131.1, 85.7%, 73.7%)";
        case -1:
          return "background-color: hsl(6.1, 85.7%, 63.7%)";
        default:
          return "background-color: gray";
      }
    }
  },

  methods: {
    handleBtnClick() {
      switch(this.buttonStatus) {
        case 0:
          return;
        case 1:
          this.$router.push("/");
          break;
        default:
          this.createRequest();
          break;
      }
    },

    createRequest() {
      this.buttonStatus = 0;
      // Promise.all([sendStats(this.json2csv(shared.personalInfo), 0),
      //   sendStats(this.json2csv(shared.allStats), 916952360)])
      //   .then(() => {
      //     this.buttonStatus = 1;
      //     // window.alert("Все данные были успешно отправлены, можете выходить");
      //   })
      //   .catch((errs) => {
      //     this.buttonStatus = -1;
      //     console.log("Errors", errs);
      //     // window.alert(`Возникла ошибка:\n${errs}\nПожалуйста обратитесь к организатору или повторить отправку.`);
      //   });
      // shared.allStats.proofreading[0].Clicks = JSON.stringify(shared.allStats.proofreading[0].Clicks);
      // shared.allStats.switchability[0].Clicks = JSON.stringify(shared.allStats.switchability[0].Clicks);
      // console.log("CHECK", this.json2csv(shared.personalInfo).split("\n"))
      Promise.all([sendStats(this.json2csv(shared.personalInfo), "'Данные Участников'"),
        sendStats(this.json2csv(shared.allStats.proofreading), "'Пробы по Задаче1'"),
        sendStats(this.json2csv(shared.allStats.switchability), "'Пробы по Задаче2'")])
        .then(() => {
          this.buttonStatus = 1;
        })
        .catch((errs) => {
          this.buttonStatus = -1;
          console.log("Errors", errs);
        });
    }
  },
}
</script>

<style scoped>
@import url(../assets/pages/send.css);
</style>
