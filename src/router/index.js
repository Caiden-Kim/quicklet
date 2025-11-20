import { createRouter, createWebHistory } from "vue-router";
import SetsPage from "@/pages/SetsPage.vue";
import FlashcardsPage from "@/pages/FlashcardsPage.vue";
import QuizPage from "@/pages/QuizPage.vue";

const routes = [
  { path: "/", component: SetsPage },
  { path: "/flashcards/:id", component: FlashcardsPage, props: true },
  { path: "/quiz/:id", component: QuizPage, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
