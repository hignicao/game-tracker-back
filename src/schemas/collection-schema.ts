import Joi from "joi";

export const updateGameCollectionSchema = Joi.object({
  gameId: Joi.number().required(),
  statusId: Joi.number().required().min(1).max(4),
});
