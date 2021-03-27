<template>
  <game>
    <template v-slot:title>
      Snake
    </template>

    <template v-slot:game>
      <snake-organism />
    </template>
  </game>
</template>

<script>
import Game from '@/components/templates/Game';
import Snake from '@/components/organisms/Snake';

export default {
  name: 'Snake',
  components: {
    Game,
    SnakeOrganism: Snake,
  },
};
</script>
