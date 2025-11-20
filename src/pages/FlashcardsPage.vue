<template>
  <div class="flashcards-page">
    <h2>{{ set.title }} - Flashcards</h2>
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
    <div v-else class="end-screen">
      <p>All words reviewed!</p>
      <button @click="resetFlashcards">Restart Flashcards</button>
      <router-link to="/" class="link">Back to Sets</router-link>
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
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    loadSet() {
      const setData = sets.find((s) => s.id === parseInt(this.id));
      if (setData) {
        // shuffle vocab when loading
        this.set = {
          ...setData,
          vocab: this.shuffleArray([...setData.vocab]), // copy then shuffle
        };
      } else {
        this.set = null;
      }
      this.currentIndex = 0;
      this.showDefinition = false;
    },
    resetFlashcards() {
      this.loadSet();
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2em;
}

.flashcard {
  margin-top: 2em;
  padding: 1em;
  padding-bottom: 0.5em;
  border: 2px solid #52596e;
  border-radius: 1em;
  background-color: #373c44;
  color: #f9f5ec;
  width: 70vw;
  height: 60vh;
  overflow-wrap: anywhere;
  align-content: center;
}

.word {
  font-size: 5vw;
  font-weight: bold;
  margin-bottom: 0.2em;
}

.definition {
  margin-top: 0.2em;
  font-size: 5vw;
  font-weight: bold;
  margin-bottom: 0.2em;
}

.end-screen {
  display: flex;
  flex-direction: column;

  transform: translateY(10vw);

  padding: 2em;
  gap: 0.7em;
}

button {
  margin: 1em;
  padding: 0.6em;

  background-color: #424952;

  transform: translateY(0);

  color: #e2e5de;
  font-family: RedHands;

  border-radius: 0.5em;
  border: 0.5px solid #e2e5de;

  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: #52596e;
  transform: translateY(-3px);
  cursor: pointer;
}
</style>
