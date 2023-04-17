import { Router } from "express";
import { validateBody } from "../middlewares/validation-middleware";
import { updateGameCollectionSchema } from "../schemas/collection-schema";
import { autheticateToken } from "../middlewares/auth-middleware";
import { deleteGameFromCollection, getSimplifiedCollection, updateGameCollection } from "../controllers";

const collectionRouter = Router();

collectionRouter.get("/", autheticateToken, getSimplifiedCollection);
collectionRouter.put("/update-collection", validateBody(updateGameCollectionSchema), autheticateToken, updateGameCollection);
collectionRouter.delete("/:gameId", autheticateToken, deleteGameFromCollection);

export { collectionRouter };
