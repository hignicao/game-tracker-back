import { Router } from "express";
import { validateBody } from "@/middlewares/validation-middleware";
import { updateGameCollectionSchema } from "@/schemas/collection-schema";
import { autheticateToken } from "@/middlewares/auth-middleware";
import { deleteGameFromCollection, updateGameCollection } from "@/controllers";

const collectionRouter = Router();

collectionRouter.put("/", validateBody(updateGameCollectionSchema), autheticateToken, updateGameCollection);
collectionRouter.delete("/:gameId", autheticateToken, deleteGameFromCollection);

export { collectionRouter };
