<template>
  <div>
    <h2>Price calculator</h2>
    <IpPriceCalculator/>
    <h2>Text renderer</h2>
    <IpTextRenderer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IpPriceCalculator from "@/components/IpPriceCalculator.vue";
import IpTextRenderer from "@/components/IpTextRenderer.vue";

@Component({
  components: {
    IpPriceCalculator,
    IpTextRenderer,
  }
})
export default class IpChallengeWrapper extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
