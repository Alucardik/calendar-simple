<template>
  <header class="header">
    <div class="header__info">
      <button type="button" class="header__button header__button_type_menu" v-on:click="triggerAPI"></button>
      <div class="header__project-name">
        <img src="../assets/images/calendar-image.svg" alt="App logo" class="header__project-image"
             v-on:click="$router.push({path: '/'})">
        Календарь
      </div>
      <button type="button" class="header__button header__button_type_today" v-on:click="selectedDate = getCurDate(selectedDate)">
        Сегодня
      </button>
      <button type="button" class="header__button header__button_type_change-per" v-on:click="selectedDate = decMonth(selectedDate)"></button>
      <button type="button" class="header__button header__button_type_change-per" v-on:click="selectedDate = incMonth(selectedDate)"></button>
      <div class="header__date">
        {{ months[selectedDate.month - 1] }} {{ selectedDate.year }}
      </div>
    </div>

    <nav class="header__settings">
      <button type="button" class="header__button header__button_type_options"
      v-on:click="toggleDropdown">{{ calcPeriodName }} &#9660;</button>
      <div class="header__dropdown">
        <span class="header__dropdown-elem" v-on:click="period.days = 1; toggleDropdown()">День</span>
        <span class="header__dropdown-elem" v-on:click="period.days = 4; toggleDropdown()">4 Дня</span>
        <span class="header__dropdown-elem" v-on:click="period.days = 7; toggleDropdown()">Неделя</span>
      </div>
    </nav>
  </header>
</template>

<script>
import consts from "@/assets/scripts/utils/constants";
import shared from "@/assets/scripts/utils/shared";
import Pizzly from 'pizzly-js';

export default {
  name: "CalendarHeader",

  created() {
    this.json2csv = require('csvjson-json2csv');
    this.pizzly = new Pizzly({
      host: "https://psyc-calendar.herokuapp.com/",
      publishableKey: "pope8Qy8qfYyppnHRMgLMpQ8MuEUKDGeyhfGCj"
    });
    this.spreadsheetId = '1Ruh0BsRYzwbePVC8SczTSGxLRlNQtCyCMZn7ez0W14U';
    this.authId = "20d47430-9980-11eb-849a-795b78c342fc";


    this.getCurDate = shared.getCurDate;
    this.months = consts.months;
  },

  mounted() {
    this.dropdown = document.querySelector(".header__dropdown");
  },

  data: function () {
    return {
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
      const csv = this.json2csv(this.stats);
      console.log("STATS\n", csv);

      this.pizzly
        .integration("google-sheets")
        .auth(this.authId)
        .post(`${this.spreadsheetId}:batchUpdate`,{
          body: JSON.stringify({
            "requests": [
              {
                "pasteData": {
                  "coordinate": {
                    "sheetId": 0,
                    "rowIndex": 0,
                    "columnIndex": 0
                  },
                  "data": csv,
                  "type": "PASTE_VALUES",
                  "delimiter": ",",
                }
              }
            ],
            "includeSpreadsheetInResponse": false,
            "responseRanges": [],
            "responseIncludeGridData": false
          })
        })
        .then((response) => {
          if (response.ok) {
            window.alert("Data was successfully retrieved");
            return response.json();
          }
          // return response.status;
          return new Promise.reject(response.status);
        })
        .then((res) => {
          console.log(res);
        })
        .catch(err => {
          window.alert(`API encountered error with status:\n${err}`);
        });

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

  props: {
    selectedDate: Object,
    period: Object,
    stats: Array
  }
}
</script>

<style scoped>

</style>
