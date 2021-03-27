<template>
  <div
    class="absolute flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-25"
  >
    <v-button
      text="Start game"
      @click="$emit('start-game')"
    />
  </div>
</template>

<script>
import VButton from "@/components/VButton";

export default {
  name: 'StartOverlay',
  components: {
    VButton,
  },
};
</script>
