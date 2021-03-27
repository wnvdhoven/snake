<template>
  <div
    class="absolute flex flex-col justify-center items-center w-full h-full bg-gray-500 bg-opacity-25"
  >
    <h2 class="text-3xl font-bold mb-3">Game over!</h2>
    <v-button
        text="Start new game"
        @click="$emit('start-game')"
    />
  </div>
</template>

<script>
import VButton from "@/components/VButton";

export default {
  name: 'GameOverOverlay',
  components: {
    VButton,
  },
};
</script>
