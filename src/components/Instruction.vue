<template>
  <section class="page">
    <div class="instruction">
      <p>
        Здравствуйте!
      </p>
      <p>
        Сейчас Вам предстоит пройти эксперимент. Эксперимент состоит из {{sharedState.numberOfProbes}} раундов.
        В каждом раунде Вам необходимо запомнить 3 слова (время предъявления {{sharedState.memOffset}} секунд),
        затем перед Вами появится разворот календаря со словами.
      </p>
      <p v-if="sharedState.taskType === 'proofreading'">
        ВАЖНО: необходимо найти ВСЕ СИНИЕ ЯЧЕЙКИ, СОДЕРЖАЩИЕ эти 3 слова (ЯЧЕЕК БОЛЬШЕ 3).
        Найдя нужную ячейку, нажмите на неё, тем самым перечеркнув.
        На поиск в каждом раунде у Вас есть {{sharedState.taskOffset}} секунд.
        Если Вы считаете, что нашли все ячейки, то нажмите на кнопку "Закончить раунд".
        Общее время прохождения: 30-35 минут.
      </p>
      <p v-if="sharedState.taskType === 'switchability'">
        Выберите слово, которое будете искать первым. Во время раунда будет подаваться звук,
        который означает, что вы должны перестать искать первое слово и начинать искать второе слово,
        после еще одного звукового сигнала Вы должна начать искать третье слово, а после опять вернуться по сигналу к первому.
        Пример: слова для запоминания: тренировка(1), звонок(2), встреча(3)
        Схема по словам: 1-2-3-1
        Необходимо найти как можно больше СИНИХ ЯЧЕЕК, СОДЕРЖАЩИХ нужные слова (ЯЧЕЕК БОЛЬШЕ 3) за {{sharedState.taskOffset}} секунд
        с переключением между словами.
        Общее время прохождения: 30-35 минут
      </p>
      <p>
        ВАЖНО:
        Будьте максимально сосредоточены, не отвлекайтесь на посторонние шумы (уведомления, звонки), желательно отключить всплывающие окна, звуковые сигналы из других вкладок браузера.
        Это поможет сделать эксперимент максимально чистым.
        Не переключайтесь между вкладками – это может помешать записи данных, что обесценит Ваш труд и приведёт к искаженным данным.
        После прохождения эксперимента сообщите экспериментатору ваш никнейм для проверки корректности записи данных.
        Если у Вас возникли вопросы или проблемы – свяжитесь с экспериментатором.
        Спасибо, что помогаете развивать науку!
      </p>
      <router-link to="/workspace" class="instruction__link">
        Приступить к выполнению задания
      </router-link>
    </div>
  </section>
</template>

<script>
import shared from "../assets/scripts/utils/shared";

export default {
  name: "Instruction",

  data: function() {
    return {
      privateState: {},
      sharedState: shared.sessionConfig
    }
  }
}
</script>

<style scoped>
@import url('../assets/pages/instruction.css');
</style>
