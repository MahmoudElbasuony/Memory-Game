<template>
  <div class="card" @click="selectCard">
    <div class="flip-card-inner" v-bind:class="cardClasses">
      <div class="flip-card-front">
        {{ cardNumber }}
      </div>
      <div class="flip-card-back">
        ?
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isSelected: false,
      isValidChice: undefined
    };
  },
  name: "game-card",
  components: {},
  methods: {
    selectCard() {
      // if card was fliped and clicked then it must check the validaty
      if (this.isFlipedOnFront) {
        this.$emit(
          "checkValidity",
          this.cardNumber,
          () => {  this.isValidChice = true; },
          () => { this.isValidChice = false; }
        );
        return;
      }
      this.isSelected = !this.isSelected;
      this.$emit("cardSelectionChange", this.isSelected, this.cardNumber);
    }
  },
  computed: {
    cardClasses() {
      return {
        selectedCard: this.isSelected && !this.flip,
        flip: this.isFlipedOnFront,
        successSelection: this.isValidChice
      };
    },
    isFlipedOnFront() {
      return !!this.flip && this.isValidChice == undefined;
    }
  },
  props: ["cardNumber", "flip", "onSelected"]
};
</script>

<style scoped>
.selectedCard {
  box-shadow: 2px 1px 9px 3px #2d2c2c;
  z-index: 1;
  background: antiquewhite !important;
  border-radius: 8px;
}
.flip {
  transform: rotateY(180deg);
}

/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.card {
  color: black;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin: 5px;
  height: 2em;
  border: none;
  text-align: center;
  background: transparent;
  font-size: 3vw;
  text-shadow: 0px 1px 4px #666262;
  cursor: pointer;
  flex: 1 1 20%;
  transition: all 0.5s;
  transform-style: preserve-3d;
  perspective: 1000;
  perspective-origin: 50%;
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: all 0.5s;
  transform-style: preserve-3d;
  background: #c1f8e6;
  border-radius: 8px;
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  color: #393737;
  background: #c1f8e6;
  border-radius: inherit;
}

.flip {
  transform: rotateY(180deg);
}

/* Style the back side */
.flip-card-back {
  background-color: #a1c3e3;
  color: white;
  transform: rotateY(180deg);
}
.flip-card-front {
  background-color: inherit;
}

.successSelection {
  background-color: #a3e3a1;
  transform: rotateY(0deg);
}
</style>
