import { createRouter, createWebHashHistory } from "vue-router";
import SetsPage from "@/views/SetsPage.vue";
import FlashcardsPage from "@/views/FlashcardsPage.vue";
import QuizPage from "@/views/QuizPage.vue";

const routes = [
  { path: "/", component: SetsPage },
  { path: "/flashcards/:id", component: FlashcardsPage, props: true },
  { path: "/quiz/:id", component: QuizPage, props: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
