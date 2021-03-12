<template>
  <div class="row">
    <div class="col">
      <h1>Welcome to Memory Game</h1>
      <p class="text-light">
        just remember the cards numbers and their places as you will need to
        click on them in ascending order to win :)
      </p>
      <div>
        <div class="form-group m-2">
          <input id="cardsNumberInput"
            type="number"
            v-model="cardsNumber"
            @keypress="onChangeCardNumber"
            class="form-control form-control-lg text-center"
            v-bind:class="cardsNumberClasses"/>
          <span class="cardsNumberErrorMsg mb-2" v-if="hasCardsNumberError">Cards number should be between 3-20 card</span>
        </div>
        <div>
          <button
            class="btn btn-lg btn-light col "
            @click="handle()"
            :disabled="hasCardsNumberError"> Start Playing
          </button>
        </div>
      </div>
    </div>
    <loader v-if="isLoaderVisible"></loader>
    <div v-if="!isLoaderVisible && turnHistory.length">
      <ul class="list-group  mt-4">
        <li
          v-for="turn in turnHistory"
          v-bind:key="turn.id"
          v-bind:class="turn.status == 1 ? 'list-group-item-success' : 'list-group-item-danger'"
          class="list-group-item"
        >
          <div v-if="turn.cardscount">
            <b> Cards Count : </b> {{ turn.cardscount }} <br />
          </div>
          <div v-if="turn.displayedcardsnumbers">
            <b> Rnadom diaplyed cards : </b>
            {{ turn.displayedcardsnumbers }} <br />
          </div>
          <div v-if="turn.cardstobetested">
            <b> Cards choosed to play with : </b>
            {{ turn.cardstobetested }} <br />
          </div>
          <div v-if="turn.finalclickedcards">
            <b> Final choosed cards : </b>
            {{ turn.finalclickedcards }} <br />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "../../utils/axios";
export default {
  components: {},
  data() {
    return {
      cardsNumber: 3,
      isDataLoaded: false,
      isDataLoadFailed: false,
      turnHistory: []
    };
  },
  methods: {
    handle() {
      this.$router.push({
        path: "gameBoard",
        query: { cardsNumber: this.cardsNumber }
      });
    },
    onChangeCardNumber(evt) {
      if (!/\d+/g.test(evt.key)) {
        evt.preventDefault();
      }
    },
    async loadTurnsHistory() {
      this.isDataLoaded = false;
      this.isDataLoadFailed = false;
      return (await axios.get(`gameboard/getAllGameTurnsHistory?pageIndex=0&pageSize=100`)).data;
    }
  },
  computed: {
    cardsNumberClasses: function() {
      const hasError = this.hasCardsNumberError;
      return {
        cardsNumberInputHasError: hasError
      };
    },
    hasCardsNumberError() {
      return !(this.cardsNumber >= 3 && this.cardsNumber <= 20);
    },
    isLoaderVisible() {
      return !this.isDataLoaded && !this.isDataLoadFailed;
    }
  },
  async created() {
    try {
      const { totalCount, turns } = await this.loadTurnsHistory();
      this.isDataLoadFailed = false;
      this.isDataLoaded = true;
      this.turnHistory = [...turns];
    } catch (e) {
      this.isDataLoadFailed = true;
      this.isDataLoaded = false;
    }
  }
};
</script>

<style scoped>
#cardsNumberInput {
  background: var(--background-color);
  color: var(--color);
  border: 1px solid #8b99a6;
}
.cardsNumberInputHasError {
  border: 1px solid #ffa2ab;
  box-shadow: 0 0 9px 2px #ff4646;
}
.cardsNumberErrorMsg {
  color: #ffa2ab;
}
</style>
