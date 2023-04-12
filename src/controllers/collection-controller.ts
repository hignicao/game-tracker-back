import { AuthenticatedRequest } from "@/middlewares/auth-middleware";
import gameService from "@/services/game-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function updateGameCollection(req: AuthenticatedRequest, res: Response) {
	const { gameId, statusId } = req.body;
	const userId = req.userId;

  try {
    
  } catch (error) {

  }


}

export async function deleteGameFromCollection(req: AuthenticatedRequest, res: Response) {}
