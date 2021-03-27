<style lang="scss">

</style>

<template>
  <div
    class="flex flex-col items-center"
  >
    <h2 class="text-3xl font-bold">Snake</h2>
    <div
      class="relative flex flex-col border"
    >
      <div
        v-if="status === gameStatus.START"
        class="absolute flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-25"
      >
        <span
          class="rounded-md	border border-green-500	px-3 py-2 text-white font-bold bg-green-500 cursor-pointer hover:border-green-400 hover:bg-green-400"
          @click="startGame"
        >Start game</span>
      </div>
      <div
          v-else-if="status === gameStatus.GAME_OVER"
          class="absolute flex flex-col justify-center items-center w-full h-full bg-gray-500 bg-opacity-25"
      >
        <h2 class="text-3xl font-bold mb-3">Game over!</h2>
        <span
            class="rounded-md	border border-green-500	px-3 py-2 text-white font-bold bg-green-500 cursor-pointer hover:border-green-400 hover:bg-green-400"
            @click="startGame"
        >Start new game</span>
      </div>
      <div
        v-for="(row, rowIndex) in grid"
        :key="rowIndex"
        class="flex flex-row"
      >
        <div
            v-for="(coordinate, columnIndex) in row"
            :key="columnIndex"
            class="border min-w-20 min-h-20"
            :class="{
              'bg-green-600	': containsSnake(coordinate),
              'bg-red-600': containsApple(coordinate)
            }"
        >

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Coordinate from "@/Coordinate";
import { arrayOfLength, randomArrayElement } from "@/helpers";
import { directions } from "@/constants/directions";
import { gameStatus } from "@/constants/game-status";

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
      snakeLength: 3,
      speed: 500, // ms
      moveIntervalId: null,
      snake: [],
      apple: null,
      direction: directions.RIGHT,
      status: gameStatus.START,
      gameStatus,
    };
  },
  computed: {
    grid() {
      return arrayOfLength(this.boardHeight).map((y) => {
        return arrayOfLength(this.boardWidth).map((x) => {
          return new Coordinate(x, y);
        });
      });
    },
    emptyCoordinates() {
      return this.grid.flat().filter((gridCoordinate) => {
        return !this.snake.some((snakeCoordinate) => {
          return snakeCoordinate.x === gridCoordinate.x
              && snakeCoordinate.y === gridCoordinate.y;
        });
      });
    },
  },
  created() {
    window.addEventListener('keydown', (e) => {
      this.handleKeyPress(e.key);
    });
  },
  mounted() {

  },
  methods: {
    move() {
      const nextCoordinate = this.getNextCoordinate();

      if (
          !this.coordinateIsOnGrid(nextCoordinate)
          || this.containsSnake(nextCoordinate)
      ) {
        this.endGame();
        return;
      }

      if (!this.containsApple(nextCoordinate)) {
        // Remove last element
        this.snake.shift();
      }

      // Add new element
      this.snake.push(nextCoordinate);

      if (this.containsApple(nextCoordinate)) {
        this.placeApple();
      }
    },
    containsSnake(coordinate) {
      return this.snake.some((snakeCoordinate) => {
        return coordinate.x === snakeCoordinate.x
            && coordinate.y === snakeCoordinate.y;
      });
    },
    containsApple(coordinate) {
      if (this.apple === null) {
        return false;
      }

      return coordinate.x === this.apple.x
          && coordinate.y === this.apple.y;
    },
    getNextCoordinate() {
      const latestCoordinate = this.snake.slice(-1).pop();

      switch(this.direction) {
        case directions.UP:
          return new Coordinate(
              latestCoordinate.x,
              latestCoordinate.y - 1
          );
        case directions.RIGHT:
          return new Coordinate(
              latestCoordinate.x + 1,
              latestCoordinate.y
          );
        case directions.DOWN:
          return new Coordinate(
              latestCoordinate.x,
              latestCoordinate.y + 1
          );
        case directions.LEFT:
          return new Coordinate(
              latestCoordinate.x - 1,
              latestCoordinate.y
          );
      }
    },
    coordinateIsOnGrid(coordinate) {
      return coordinate.x >= 0
          && coordinate.y >= 0
          && coordinate.x < this.boardWidth
          && coordinate.y < this.boardHeight;
    },
    handleKeyPress(key) {
      const direction = this.getKeyDirection(key);

      if (direction === null) {
        return;
      }

      if (!this.isValidDirection(direction)) {
        return;
      }

      this.direction = direction;
    },
    getKeyDirection(key) {
      switch(key) {
        case 'ArrowUp':
          return directions.UP;
        case 'ArrowRight':
          return directions.RIGHT;
        case 'ArrowDown':
          return directions.DOWN;
        case 'ArrowLeft':
          return directions.LEFT;
        default:
          return null;
      }
    },
    isValidDirection(direction) {
      if (direction === this.direction) {
        return false;
      }

      switch(direction) {
        case directions.UP:
          return this.direction !== directions.DOWN;
        case directions.RIGHT:
          return this.direction !== directions.LEFT;
        case directions.DOWN:
          return this.direction !== directions.UP;
        case directions.LEFT:
          return this.direction !== directions.RIGHT;
      }

      return true;
    },
    startGame() {
      this.initSnake();
      this.placeApple();
      this.direction = directions.RIGHT;
      this.status = gameStatus.PLAYING;

      this.startMoving();
    },
    initSnake() {
      this.snake = [];

      arrayOfLength(this.snakeLength).forEach((index) => {
        this.snake.push(
            new Coordinate(index, 0)
        );
      });
    },
    startMoving() {
      this.moveIntervalId = setInterval(this.move, this.speed);
    },
    endGame() {
      this.status = gameStatus.GAME_OVER;

      clearInterval(this.moveIntervalId);
    },
    placeApple() {
      this.apple = randomArrayElement(this.emptyCoordinates);
    },
  },
};
</script>
