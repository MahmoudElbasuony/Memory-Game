const superset = require("supertest");
const app = require("../../dist/app");

describe("Game board endpoints", () => {

  const baseControllerPath = `/api/v1/gameboard`;
  it(`should return (3) random numbers when requesting path /getCardsRandomNumbers?cardsNumber=3 `, async () => {
    // Arrange
    const numberOfRandomNumbers = 3;
    const getRandomNumbersEndpointPath = `${baseControllerPath}/getCardsRandomNumbers?cardsNumber=${numberOfRandomNumbers}`;

    // Act
    const res = await superset(app).get(getRandomNumbersEndpointPath).send();

    // Asset
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(3);
  });

  it(`should create turn after win when requesting path /createGameTurnResult`, async () => {
    // Arrange
    const createTurnDto = {
      cardsCount: 5,
      numbersOnCards: [10, 50, 20, 30, 9],
      clicksOrder: [50, 10, 30, 9, 20],
      status: 1,
    };
    const createGameTurnResultEndpointPath = `${baseControllerPath}/createGameTurnResult`;

    // Act
    const res = await superset(app)
      .post(createGameTurnResultEndpointPath)
      .send(createTurnDto);

    // Asset
    expect(res.status).toEqual(201);
    expect(res.body.id).not.toBe(0);
  });

  it(`should prevent turn to be created when cardsCount less than 3 when requesting path /createGameTurnResult`, async () => {
    // Arrange
    const createTurnDto = {
      cardsCount: 1,
      numbersOnCards: [10, 50, 20, 30, 9],
      clicksOrder: [50, 10, 30, 9, 20],
      status: 1,
    };
    const createGameTurnResultEndpointPath = `${baseControllerPath}/createGameTurnResult`;

    // Act
    const res = await superset(app)
      .post(createGameTurnResultEndpointPath)
      .send(createTurnDto);

    // Asset
    expect(res.status).toEqual(400);
    expect(res.body.error).not.toBeNull();
  });
});
