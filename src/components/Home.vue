<template>
  <section class="page">
    <p class="home__welcome">
      <span>Добро пожаловать.</span>
      <span>Пожалуйста, выберите действие.</span>
    </p>
    <div class="home">
      <router-link to="/about" class="home__link">
        Начать сессию
      </router-link>
      <router-link to="/config" class="home__link">
        Настройки сессии
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>
@import url('../assets/pages/home.css');
</style>
