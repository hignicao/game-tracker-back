import { Router } from "express";
import { validateBody } from "../middlewares/validation-middleware";
import { autheticateToken } from "../middlewares/auth-middleware";
import { getGameInfo, getTrendingGames, searchGames } from "../controllers";

const gamesRouter = Router();

gamesRouter.get("/trending", getTrendingGames);
gamesRouter.get("/info/:id", getGameInfo);
gamesRouter.get("/search", searchGames);

export { gamesRouter };
