<template>
  <div id="app">
    <AppHeader />
    <router-view />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #424952;
  color: #f9f5ec;
  font-family: "RedHands";
  letter-spacing: 0.1em;
  font-weight: bolder;
  text-align: center;
}
</style>
