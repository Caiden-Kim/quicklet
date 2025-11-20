<template>
  <div class="quiz-page">
    <h2>{{ set.title }} - Quiz</h2>
    <p>{{ set.description }}</p>

    <div v-if="currentQuestion" class="quiz-card">
      <p class="word">{{ currentQuestion.word }}</p>

      <div class="options">
        <button
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          @click="selectOption(option)"
          :class="{
            correct: showAnswer && option === currentQuestion.correct,
            incorrect:
              showAnswer &&
              option !== currentQuestion.correct &&
              option === selectedOption,
          }"
          :disabled="showAnswer"
        >
          {{ option }}
        </button>
      </div>

      <p v-if="showAnswer">
        {{ selectedOption === currentQuestion.correct ? "Correct!" : "Wrong!" }}
      </p>

      <button v-if="showAnswer" @click="nextQuestion">Next Question</button>
    </div>

    <div v-else class="summary">
      <h3>Quiz Complete!</h3>
      <p>You scored {{ score }} / {{ questions.length }} ({{ percentage }}%)</p>

      <div class="summary-buttons">
        <button @click="retryQuiz">Retry Quiz</button>
        <button v-if="wrongQuestions.length" @click="reviewWrong">
          Review Wrong Answers
        </button>
        <router-link to="/">Back to Sets</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import sets from "@/data/sets.json";

export default {
  name: "QuizPage",
  props: ["id"],
  data() {
    return {
      set: null,
      questions: [],
      currentIndex: 0,
      selectedOption: null,
      showAnswer: false,
      score: 0,
      wrongQuestions: [],
      reviewingWrong: false,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || null;
    },
    percentage() {
      return Math.round((this.score / this.questions.length) * 100);
    },
  },
  methods: {
    shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    },

    generateQuestions(vocab) {
      return vocab.map((wordObj) => {
        const wrongDefs = vocab
          .filter((w) => w.word !== wordObj.word)
          .map((w) => w.definition);

        const randomWrong = this.shuffleArray(wrongDefs).slice(0, 3);
        const options = this.shuffleArray([wordObj.definition, ...randomWrong]);

        return {
          word: wordObj.word,
          correct: wordObj.definition,
          options,
        };
      });
    },

    loadSet() {
      this.set = sets.find((s) => s.id === parseInt(this.id));
      if (this.set) {
        this.questions = this.shuffleArray(
          this.generateQuestions(this.set.vocab)
        );
        this.currentIndex = 0;
        this.score = 0;
        this.wrongQuestions = [];
        this.reviewingWrong = false;
        this.selectedOption = null;
        this.showAnswer = false;
      }
    },

    selectOption(option) {
      this.selectedOption = option;
      this.showAnswer = true;

      if (option === this.currentQuestion.correct) {
        this.score++;
      } else {
        this.wrongQuestions.push(this.currentQuestion);
      }
    },

    nextQuestion() {
      this.currentIndex++;
      this.selectedOption = null;
      this.showAnswer = false;

      // If reviewing wrong answers, stop when done
      if (this.reviewingWrong && this.currentIndex >= this.questions.length) {
        this.questions = [];
      }
    },

    retryQuiz() {
      this.questions = this.shuffleArray(
        this.generateQuestions(this.set.vocab)
      );
      this.currentIndex = 0;
      this.score = 0;
      this.wrongQuestions = [];
      this.reviewingWrong = false;
      this.selectedOption = null;
      this.showAnswer = false;
    },

    reviewWrong() {
      if (!this.wrongQuestions.length) return;

      this.questions = [...this.wrongQuestions];
      this.currentIndex = 0;
      this.wrongQuestions = [];
      this.reviewingWrong = true;
      this.selectedOption = null;
      this.showAnswer = false;
      this.score = 0;
    },
  },

  created() {
    this.loadSet();
  },

  watch: {
    id() {
      this.loadSet();
    },
  },
};
</script>

<style scoped>
.quiz-page {
  text-align: center;
  padding: 2em;
}

.quiz-card {
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
  margin-bottom: 1em;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  margin-bottom: 1em;
}

.options button {
  padding: 0.5em 1em;
  border-radius: 0.5em;
  border: none;
  background-color: #52596e;
  color: #f9f5ec;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.options button.correct {
  background-color: #4caf50;
}

.options button.incorrect {
  background-color: #f44336;
}

.summary {
  margin-top: 2em;
}

.summary-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin-top: 1em;
}

.summary-buttons button {
  padding: 0.5em 1em;
  border-radius: 0.5em;
  border: none;
  background-color: #52596e;
  color: #f9f5ec;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.summary-buttons button:hover {
  background-color: #2b3036;
}
</style>
