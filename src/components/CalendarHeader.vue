<template>
  <header class="header">
    <div class="header__info">
      <button type="button" class="header__button header__button_type_menu" @click="triggerAPI"></button>
      <div class="header__project-name">
        <img src="../assets/images/calendar-image.svg" alt="App logo" class="header__project-image"
             @click="$router.push({path: '/'})">
        Календарь
      </div>
      <button type="button" class="header__button header__button_type_today" @click="selectedDate = getCurDate(selectedDate)">
        Сегодня
      </button>
      <button type="button" class="header__button header__button_type_change-per" @click="selectedDate = decMonth(selectedDate)"></button>
      <button type="button" class="header__button header__button_type_change-per" @click="selectedDate = incMonth(selectedDate)"></button>
      <div class="header__date">
        {{ months[selectedDate.month - 1] }} {{ selectedDate.year }}
      </div>
    </div>
    <nav class="header__settings">
<!--      <div class="header__timer">-->
<!--        До конца пробы: {{sessionInfo.taskOffset - privateState.elapsed}} секунд-->
<!--      </div>-->
      <button type="button" class="header__button header__button_type_options"
        @click="toggleDropdown">{{ calcPeriodName }} &#9660;</button>
      <div class="header__dropdown">
        <span class="header__dropdown-elem" @click="period.days = 1; toggleDropdown()">День</span>
        <span class="header__dropdown-elem" @click="period.days = 4; toggleDropdown()">4 Дня</span>
        <span class="header__dropdown-elem" @click="period.days = 7; toggleDropdown()">Неделя</span>
      </div>
      <button type="button" class="header__button header__button_type_exit" @click="onInterrupt">
        Завершить
      </button>
    </nav>
  </header>
</template>

<script>
import consts from "@/assets/scripts/utils/constants";
import shared from "@/assets/scripts/utils/shared";
// import Pizzly from 'pizzly-js';

export default {
  name: "CalendarHeader",

  created() {
    // this.pizzly = new Pizzly({
    //   host: "https://psyc-calendar.herokuapp.com/",
    //   publishableKey: "pope8Qy8qfYyppnHRMgLMpQ8MuEUKDGeyhfGCj"
    // });
    // this.spreadsheetId = '1Ruh0BsRYzwbePVC8SczTSGxLRlNQtCyCMZn7ez0W14U';
    // this.authId = "6cd51f80-b7f1-11eb-88ce-f3631f229918";
    this.getCurDate = shared.getCurDate;
    this.months = consts.months;
    this.sessionInfo = shared.sessionConfig;
  },

  mounted() {
    this.dropdown = document.querySelector(".header__dropdown");
    this.timerId = setInterval(() => {
      this.privateState.elapsed = Math.floor((Date.now() - this.probeStart) / 1000) - this.sessionInfo.memOffset;
    }, 500);
  },

  beforeUnmount() {
    clearInterval(this.timerId);
  },

  props: {
    selectedDate: Object,
    period: Object,
    stats: Array,
    probeStart: Number,
    onInterrupt: Function
  },

  data: function() {
    return {
        privateState: {
          elapsed: 0
        }
    }
  },

  computed: {
    calcPeriodName() {
      if (this.period.days === 7) {
        return "Неделя";
      } else if (this.period.days === 4) {
        return "4 Дня";
      }
      return "День";
    },
  },

  methods: {
    triggerAPI() {
      // const csv = this.json2csv(this.stats);
      //
      // this.pizzly
      //   .integration("google-sheets")
      //   .auth(this.authId)
      //   .post(`${this.spreadsheetId}:batchUpdate`,{
      //     body: JSON.stringify({
      //       "requests": [
      //         {
      //           "pasteData": {
      //             "coordinate": {
      //               "sheetId": 0,
      //               "rowIndex": 0,
      //               "columnIndex": 0
      //             },
      //             "data": csv,
      //             "type": "PASTE_VALUES",
      //             "delimiter": ",",
      //           }
      //         }
      //       ],
      //       "includeSpreadsheetInResponse": false,
      //       "responseRanges": [],
      //       "responseIncludeGridData": false
      //     })
      //   })
      //   .then((response) => {
      //     if (response.ok) {
      //       window.alert("Data was successfully retrieved");
      //       return response.json();
      //     }
      //     // return response.status;
      //     return Promise.reject(response.status);
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     window.alert(`API encountered error with status:\n${err}`);
      //   });
    },

    decMonth(date) {
      date.month -= 1;
      if (!date.month) {
        date.month = 12;
        date.year -= 1;
      }
      return date;
    },

    incMonth(date) {
      date.month += 1;
      if (date.month > 12) {
        date.month = 1;
        date.year += 1;
      }
      return date;
    },

    toggleDropdown() {
      this.dropdown.classList.toggle("header__dropdown_visible");
    }
  },
}
</script>

<style scoped>

</style>
