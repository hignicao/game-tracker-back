import gameService from "./game-service";

async function updateGameCollection(gameId: number, statusId: number, userId: number) {
  const game = await gameService.getGameById(gameId);
  if (!game) {
  }


}