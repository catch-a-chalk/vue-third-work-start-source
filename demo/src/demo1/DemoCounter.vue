<template>
  <demo-counter>
    <div class="counter">
      <counter-button @click="decrement"> - </counter-button>
      <counter-value :value="count"/>
      <counter-button @click="increment"> + </counter-button>
    </div>
  </demo-counter>
</template>

<script setup>
import CounterButton from "./CounterButton.vue";
import CounterValue from "./CounterValue.vue";
</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  align-items: center;
}
</style>