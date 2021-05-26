<template>
  <header class="header" >
    <div class="header__info">
      <button type="button" class="header__button header__button_type_menu"></button>
      <div class="header__project-name">
        <img src="../assets/images/calendar-image.svg" alt="App logo" class="header__project-image">
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

export default {
  name: "CalendarHeader",

  created() {
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

  beforeDestroy() {
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
