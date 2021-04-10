<template>
  <section class="page">
    <CalendarHeader v-bind:selectedDate="curDate" v-bind:period="curPeriod"/>
    <SimpleCalendarView v-bind:selectedDate="curDate"/>
    <AdvancedCalendarView v-bind:selectedDate="curDate" v-bind:period="curPeriod"/>
  </section>
</template>

<script>
import CalendarHeader from "@/components/CalendarHeader";
import SimpleCalendarView from "@/components/SimpleCalendarView";
import AdvancedCalendarView from "@/components/AdvancedCalendarView";
import shared from "@/assets/scripts/utils/shared";
import constants from "@/assets/scripts/utils/constants";
import Pizzly from 'pizzly-js';

export default {
  name: 'App',

  created() {
    const json2csv = require('csvjson-json2csv');
    const csv = json2csv(constants.obj_test);
    console.log(csv);
    // console.log(JSON.stringify(constants.obj_test));
    // console.log(JSON.stringify(csv));

    //______________________________________________________________
    // const demoInstance = "https://psyc-calendar.herokuapp.com/";
    // const pubKey = "pope8Qy8qfYyppnHRMgLMpQ8MuEUKDGeyhfGCj";
    //______________________________________________________________

    const pizzly = new Pizzly({
      host: "https://psyc-calendar.herokuapp.com/",
      publishableKey: "pope8Qy8qfYyppnHRMgLMpQ8MuEUKDGeyhfGCj"
    });
    const spreadsheetId = '1Ruh0BsRYzwbePVC8SczTSGxLRlNQtCyCMZn7ez0W14U';

    pizzly
      .integration("google-sheets")
      .auth("20d47430-9980-11eb-849a-795b78c342fc")
      .post(`${spreadsheetId}:batchUpdate`,{
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
        console.log(response.status);
        return response.json();
        // return response.body;
      })
      .then((res) => {
        console.log(res);
      });
  },

  data: function() {
    return {
      curDate: shared.getCurDate({}),
      curPeriod: {days: 7},
    }
  },

  components: {
    CalendarHeader,
    AdvancedCalendarView,
    SimpleCalendarView,
  },

  computed: {
  },

  methods: {
  },
}
</script>

<style>
@import url('./assets/styles/vendor/normalize.css');
@import url('assets/pages/index.css');
</style>
