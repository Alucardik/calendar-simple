<template>
  <section class="page">
    <h1 class="home__welcome">
      <span>Добро пожаловать.</span>
      <span>Пожалуйста, введите ваши данные перед началом эксперимента.</span>
    </h1>
    <form name="personal_info" class="form" @submit="handleSubmit">
      <h2 class="form__title">Введите указанные ниже данные</h2>
      <div class="form__fieldset">
        <label class="form__field">
          <input v-model="privateState.name"
                 placeholder="Ваши имя и фамилия"
                 name="name"
                 type="text"
                 class="form__input" required>
        </label>
        <label class="form__field">
          <input v-model="privateState.age"
                 placeholder="Ваш возраст"
                 name="age"
                 type="number"
                 class="form__input" required>
        </label>
        <label class="form__field">
          Ваш пол:
            <select v-model="privateState.gender" name="gender" type="radio" class="form__input form__input_type_select" required>
              <option>
                Мужчина
              </option>
              <option>
                Женщина
              </option>
            </select>
        </label>
      </div>
      <button type="submit" class="form__submit-btn">Отправить</button>
    </form>
  </section>
</template>

<script>
import shared from "../assets/scripts/utils/shared";

export default {
  name: "PersonalInfoForm",

  data: function () {
    return {
      privateState: {
        name: "",
        age: "",
        gender: "Мужчина"
      },
      sharedState: shared.personalInfo
    };
  },

  mounted() {
    // clear all data before starting new probe
    shared.allStats.proofreading = false;
    shared.allStats.proofreading = false;
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.sharedState.Name = this.privateState.name;
      this.sharedState.Age = this.privateState.age;
      this.sharedState.Gender = this.privateState.gender;
      this.$router.push("/home");
    }
  },
}
</script>

<style scoped>
@import url(../assets/pages/auth.css);
</style>
