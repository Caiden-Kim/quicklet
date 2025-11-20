<template>
  <div class="flashcards-page">
    <h2>{{ set.title }}</h2>
    <p>{{ set.description }}</p>

    <div v-if="currentWord" class="flashcard">
      <p class="word">{{ currentWord.word }}</p>
      <button @click="flipCard">
        {{ showDefinition ? "Hide" : "Show" }} Definition
      </button>
      <p v-if="showDefinition" class="definition">
        {{ currentWord.definition }}
      </p>
      <button @click="nextWord">Next Word</button>
    </div>

    <div v-else>
      <p>All words reviewed!</p>
      <router-link to="/">Back to Sets</router-link>
    </div>
  </div>
</template>

<script>
import sets from "@/data/sets.json";

export default {
  name: "FlashcardsPage",
  props: ["id"],
  data() {
    return {
      set: null,
      currentIndex: 0,
      showDefinition: false,
    };
  },
  computed: {
    currentWord() {
      return this.set?.vocab[this.currentIndex] || null;
    },
  },
  methods: {
    flipCard() {
      this.showDefinition = !this.showDefinition;
    },
    nextWord() {
      this.showDefinition = false;
      this.currentIndex++;
    },
    loadSet() {
      this.set = sets.find((s) => s.id === parseInt(this.id));
      this.currentIndex = 0;
      this.showDefinition = false;
    },
  },
  created() {
    this.loadSet(); // load when first created
  },
  watch: {
    id() {
      this.loadSet(); // reload if route changes
    },
  },
};
</script>

<style scoped>
.flashcards-page {
  text-align: center;
  padding: 2em;
}

.flashcard {
  margin-top: 2em;
  padding: 2em;
  border: 2px solid #52596e;
  border-radius: 1em;
  background-color: #373c44;
  color: #f9f5ec;
}

.word {
  font-size: 2em;
  font-weight: bold;
}

.definition {
  margin-top: 1em;
  font-size: 1.5em;
}
</style>
