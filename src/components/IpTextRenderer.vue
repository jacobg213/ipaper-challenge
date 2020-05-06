<template>
  <div>
    <label for="text">Text to render</label>
    <input id="text" placeholder="Text to render" type="text" v-model="text" />
    <span class="small">The maximum possible font size is set to 1000px.</span>

    <div>
      <label for="width">Max width</label>
      <input
        placeholder="Width"
        id="width"
        min="0"
        step="10"
        type="number"
        v-model="width"
      />

      <label for="height">Max height</label>
      <input
        placeholder="Height"
        id="height"
        min="0"
        step="10"
        type="number"
        v-model="height"
      />
    </div>

    <label for="font">Font</label>
    <select id="font" name="Font" v-model="font">
      <option value="Verdana">Verdana</option>
      <option value="Arial">Arial</option>
      <option value="Times New Roman">Times New Roman</option>
    </select>

    <button @click="renderText()">Match the container</button>
    <span class="small"
      >Please remember to press the button after any changes to re-render.</span
    >
    <div
      class="render-container"
      :style="{ width: `${width}px`, height: `${height}px` }"
    >
      <span
        ref="textElement"
        :style="{ fontFamily: font, fontSize: `${fontSize}px` }"
        >{{ text }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Watch } from "vue-property-decorator";

@Component
export default class IpTextRenderer extends Vue {
  // Increasing this value will drastically slow down the calculation.
  private static MAX_FONT_SIZE = 1000;

  private text = "";
  private width = "0";
  private height = "0";
  private font = "Arial";

  private fontSize = 0;
  private textElementWidth = 0;
  private textElementHeight = 0;

  @Ref("textElement") private readonly textElement!: HTMLSpanElement;

  @Watch("fontSize")
  onFontSizeChanged(): void {
    this.$nextTick(() => {
      this.updateBounds();
    });
  }

  renderText(): void {
    this.fontSize = IpTextRenderer.MAX_FONT_SIZE;

    this.$nextTick(() => {
      this.updateBounds();
      this.$forceUpdate();
    });
  }

  updateBounds(): void {
    const bounds = this.textElement.getBoundingClientRect();
    this.textElementWidth = bounds.width;
    this.textElementHeight = bounds.height;
  }

  /**
   * Using Vue's updated hook instead of creating the recalculation loop myself.
   */
  updated(): void {
    const width = parseInt(this.width);
    const height = parseInt(this.height);
    if (this.textElementWidth > width) {
      this.fontSize -= 0.5;
      this.$forceUpdate();
    }

    if (this.textElementHeight > height) {
      this.fontSize -= 0.5;
      this.$forceUpdate();
    }
  }
}
</script>

<style scoped>
.render-container {
  margin: 1rem;
  text-align: center;
  background-color: #efefef;
}

label,
input,
button {
  display: block;
}

button {
  margin-top: 1rem;
}

.small {
  font-size: 0.75rem;
}
</style>
