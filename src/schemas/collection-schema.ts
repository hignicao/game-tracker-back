import Joi from "joi";

export const updateGameCollectionSchema = Joi.object({
  gameId: Joi.number().required(),
  statusId: Joi.number().required(),
});
