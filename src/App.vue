<template>
  <section class="page">
    <header class="header">
      <div class="header__info">
        <button @click="curDate = getCurDate()">Сегодня</button>
        <button @click="decMonth()">&lt;</button>
        <button @click="incMonth()">&gt;</button>
        <div class="header__date">
          {{ curDate.day }}.{{ curDate.month }}.{{ curDate.year }}
        </div>
      </div>

      <nav class="header__settings">Settings Will be here</nav>
    </header>
    <SimpleCalendarView v-bind:selectedDate="curDate"/>
    <AdvancedCalendarView v-bind:selectedDate="curDate" v-bind:period="curPeriod"/>
  </section>
</template>

<script>
import SimpleCalendarView from "@/components/SimpleCalendarView";
import AdvancedCalendarView from "@/components/AdvancedCalendarView";

export default {
  name: 'App',

  data: function() {
    return {
      curDate: this.getCurDate(),
      curPeriod: 7,

    }
  },

  components: {
    AdvancedCalendarView,
    SimpleCalendarView,
  },

  computed: {
  },

  methods: {
    getCurDate() {
      let today = new Date();
      return {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
      }
    },

    decMonth() {
      this.curDate.month -= 1;
      if (!this.curDate.month) {
        this.curDate.month = 12;
        this.curDate.year -= 1;
      }
    },

    incMonth() {
      this.curDate.month += 1;
      if (this.curDate.month > 12) {
        this.curDate.month = 1;
        this.curDate.year += 1;
      }
    }
  },
}
</script>

<style>
@import url('./assets/styles/vendor/normalize.css');
@import url('assets/pages/index.css');
</style>
