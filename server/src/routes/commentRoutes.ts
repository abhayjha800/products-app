import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as commentController from "../controllers/commentController";

const router = Router();

//Post /api/comments/:prductId - Create a new comment for a product
router.post("/:productId", requireAuth(), commentController.createComment);

//delete /api/comments/:commentId - Delete a comment by its ID
router.delete("/:commentId", requireAuth(), commentController.deleteComment);

export default router;