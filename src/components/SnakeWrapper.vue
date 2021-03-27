<style lang="scss">
.snake-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.board {
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
}

.row {
  display: flex;
  flex-direction: row;
}

.cell {
  min-width: 20px;
  min-height: 20px;
  border: 1px solid grey;
}
</style>

<template>
  <div
    class="snake-wrapper"
  >
    <h1>Snake</h1>
    <div
      class="board"
    >
      <div
        v-for="rowIndex in Array.from(Array(boardHeight).keys())"
        :key="rowIndex"
        class="row"
      >
        <div
            v-for="columnIndex in Array.from(Array(boardWidth).keys())"
            :key="columnIndex"
            class="cell"
        >

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SnakeWrapper',
  components: {

  },
  props: {

  },
  data() {
    return {
      boardWidth: 20,
      boardHeight: 20,
    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {

  },
};
</script>
