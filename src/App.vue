<template>
  <section class="page">
    <CalendarHeader v-bind:selectedDate="curDate"/>
    <SimpleCalendarView v-bind:selectedDate="curDate"/>
    <AdvancedCalendarView v-bind:selectedDate="curDate" v-bind:period="curPeriod"/>
  </section>
</template>

<script>
import CalendarHeader from "@/components/CalendarHeader";
import SimpleCalendarView from "@/components/SimpleCalendarView";
import AdvancedCalendarView from "@/components/AdvancedCalendarView";
import shared from "@/assets/scripts/utils/shared";
import consts from "@/assets/scripts/utils/constants";

export default {
  name: 'App',

  created() {
    this.months = consts.months;
  },

  data: function() {
    return {
      curDate: shared.getCurDate({}),
      curPeriod: 4,
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
