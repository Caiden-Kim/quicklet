<template>
  <div class="page">
    <div class="page-title">
      <img class="logo" src="@/assets/QuickletLogo.png" />
      <div class="title-block">
        <h1>Quicklet</h1>
        <p>A project by Caiden Kim & Jacob Branson</p>
      </div>
    </div>

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
import SetCard from "./components/SetCard.vue";
import sets from "./data/sets.json";

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
      console.log("Go to Flashcards for:", this.selectedSet.title);
      this.closeMenu();
      // example: this.$router.push(`/flashcards/${this.selectedSet.id}`)
    },

    goToQuiz() {
      console.log("Go to Quiz for:", this.selectedSet.title);
      this.closeMenu();
      // example: this.$router.push(`/quiz/${this.selectedSet.id}`)
    },
  },
};
</script>

<style></style>
