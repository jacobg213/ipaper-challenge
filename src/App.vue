<template>
  <div id="app">
    <h1>IPaper coding challenge</h1>
    <IpChallengeWrapper />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IpChallengeWrapper from "./components/IpChallengeWrapper.vue";

@Component({
  components: {
    IpChallengeWrapper
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
