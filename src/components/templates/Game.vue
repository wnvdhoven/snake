<template>
  <div
      class="flex flex-col items-center"
  >
    <h2 class="text-3xl font-bold">
      <slot name="title" />
    </h2>

    <slot name="game" />
  </div>
</template>

<script>
export default {
  name: 'Game',
};
</script>
