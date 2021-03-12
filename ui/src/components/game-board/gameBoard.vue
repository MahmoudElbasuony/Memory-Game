<template>
  <div>
    <loader v-if="isLoaderVisible"></loader>
    <!-- Display an error message -->
    <div v-if="errors" class="alert alert-danger">
      <b>Error : </b> {{ errors }}
    </div>
    <div v-if="isWin != undefined">
      <div class="status" v-bind:class="statusClasses">
        You {{ isWin ? "succeeded" : "Failed" }}
      </div>
      <button type="button" @click="tryAgain" class="btn btn-lg btn-light">
        Try Again
      </button>
    </div>
    <div v-if="isWin === undefined" class="cardContainer">
      <game-card
        v-for="num in cardsNumbers"
        v-bind:cardNumber="num"
        v-bind:key="num"
        v-bind:flip="isFliped"
        v-on:cardSelectionChange="onCardSelection"
        v-on:checkValidity="checkChoiceValidity"></game-card>
    </div>
    <div>
      <button v-if="isDataLoaded && !isFliped"
        @click="startPlay"
        type="button"
        class="btn btn-lg btn-danger m-3 playBtn">
        Play
      </button>
    </div>
  </div>
</template>

<script>
import axios from "../../utils/axios";
import { delay } from "../../utils/async_utils";
export default {
  data() {
    return {
      isDataLoaded: false,
      isDataLoadFailed: false,
      isFliped: false,
      cardsNumbers: [],
      selectedCardNumbers: [],
      clickedOrder: [],
      nextCheckIndex: 0,
      isWin: undefined,
      errors: null
    };
  },
  computed: {
    isLoaderVisible() {
      return !this.isDataLoaded && !this.isDataLoadFailed;
    },
    statusClasses() {
      return {
        "success-status": this.isWin,
        "failure-status": this.isWin == false
      };
    },
    cardsNumber() {
      return this.$route.query["cardsNumber"];
    }
  },
  async created() {
    try {
      this.errors = null;
      const numbers = await this.loadRandomNumbers();
      this.isDataLoadFailed = false;
      this.isDataLoaded = true;
      this.cardsNumbers = [...numbers];
    } catch (e) {
      this.isDataLoadFailed = true;
      this.isDataLoaded = false;
      this.errors = e.message;
    }
  },
  methods: {
    startPlay() {
      if (this.selectedCardNumbers.length < this.cardsNumber) {
        this.errors = `Please select at least ${this.cardsNumber}`;
        return;
      }
      this.errors = null;
      this.isFliped = true;
    },
    onCardSelection(selected, cardNumber) {
      this.errors = null;
      if (selected) {
        this.selectedCardNumbers.push(cardNumber);
      } else {
        const cardNumberIndex = this.selectedCardNumbers.findIndex(
          cn => cn == cardNumber
        );
        if (cardNumberIndex >= 0)
          this.selectedCardNumbers.splice(cardNumberIndex, 1);
      }
    },
    async checkChoiceValidity(cardNumber, success, fail) {
      if (!cardNumber) return;
      this.clickedOrder.push(cardNumber);
      const nextCardNumber = this.selectedCardNumbers[this.nextCheckIndex];
      if (nextCardNumber == cardNumber) {
        success && success(nextCardNumber);
        if (this.nextCheckIndex == this.selectedCardNumbers.length - 1) {
          // success
          await delay(400);
          this.isWin = true;
          await this.createAsTurnHistory();
        } else {
          this.nextCheckIndex++;
        }
      } else {
        await delay(400);
        this.isWin = false;
        // failure
        fail && fail(nextCardNumber);
        await this.createAsTurnHistory();
      }
    },
    tryAgain() {
      this.$router.push("/");
      return;
    },
    async createAsTurnHistory() {
      this.isDataLoaded = false;
      this.isDataLoadFailed = false;
      const turnDto = {
        cardsCount: this.cardsNumber,
        displayedCardsNumbers: [...this.cardsNumbers],
        finalClickedCards: [...this.clickedOrder],
        cardsToBeTested: [...this.selectedCardNumbers],
        status: this.isWin ? 1 : 0
      };

      try {
        this.errors = null;
        await axios.post(`gameboard/createGameTurnResult`, turnDto);
        this.isDataLoadFailed = false;
        this.isDataLoaded = true;
      } catch (e) {
        this.isDataLoadFailed = true;
        this.isDataLoaded = false;
        this.errors = e.message;
      }
    },
    async loadRandomNumbers() {
      this.isDataLoaded = false;
      this.isDataLoadFailed = false;
      return (
        await axios.get(
          `gameboard/getCardsRandomNumbers?cardsNumber=${this.cardsNumber}`
        )
      ).data;
    }
  }
};
</script>

<style scoped>
.cardContainer {
  display: -webkit-flexbox;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-box;
  display: flex;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.playBtn {
  min-width: 10em;
}
.status {
  font-size: 2em;
  transition: all 0.5s;
}
.success-status {
  font-size: 4em;
  color: greenyellow;
}
.failure-status {
  font-size: 4em;
  color: red;
}
</style>
