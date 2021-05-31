<template>
  <section class="page">
    <p class="home__welcome">
      <span>Вам предстоит выполнить два задания.</span>
      <span>Перед каждым заданием будет показана инструкция.</span>
      <span>Нажмите на кнопку ниже, когда будете готовы.</span>
    </p>
    <div class="home">
      <router-link to="/about" class="home__link">
        Начать сессию
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
