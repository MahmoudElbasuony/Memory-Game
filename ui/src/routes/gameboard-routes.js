import GameBoard from "../components/game-board/gameBoard.vue";

export const gameboardRouts = [
  {
    path: "/gameboard",
    component: GameBoard,
    beforeEnter: (to, from, next) => {
      const cardsNumber = to.query["cardsNumber"];
      if (cardsNumber && cardsNumber) next();
      else next("/");
    }
  }
];
