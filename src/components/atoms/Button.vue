<template>
  <span
      class="rounded-md	border border-green-500	px-3 py-2 text-white font-bold bg-green-500 cursor-pointer hover:border-green-400 hover:bg-green-400"
  >
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: ''
    },
  },
};
</script>
