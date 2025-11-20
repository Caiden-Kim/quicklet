<template>
  <div class="page">
    <h2 class="heading">Choose a Set:</h2>

    <div class="sets">
      <SetCard v-for="(s, i) in sets" :key="i" :set="s" @select="showMenu" />
    </div>

    <div v-if="menuVisible" class="menu-overlay" @click="closeMenu">
      <div class="menu" @click.stop>
        <h3>{{ selectedSet.title }}</h3>
        <button @click="goToFlashcards">Flashcards</button>
        <button @click="goToQuiz">Quiz</button>
        <button @click="closeMenu">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import SetCard from "../components/SetCard.vue";
import sets from "../data/sets.json";

export default {
  name: "App",
  components: { SetCard },

  data() {
    return {
      sets,
      menuVisible: false,
      selectedSet: null,
    };
  },

  methods: {
    showMenu(set) {
      this.selectedSet = set;
      this.menuVisible = true;
    },

    closeMenu() {
      this.menuVisible = false;
      this.selectedSet = null;
    },

    goToFlashcards() {
      // Navigate to Flashcards page for this set
      this.$router.push(`/flashcards/${this.selectedSet.id}`);
      this.closeMenu();
    },

    goToQuiz() {
      // Navigate to Quiz page (you can create a similar route)
      this.$router.push(`/quiz/${this.selectedSet.id}`);
      this.closeMenu();
    },
  },
};
</script>

<style></style>
