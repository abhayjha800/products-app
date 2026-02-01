import type { Request, Response } from "express";
import * as queries from "../db/queries";

import { getAuth } from "@clerk/express";

//create a new comment for a product (protected)
export async function createComment(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { productId } = req.params;
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        const product = await queries.getProductById(productId as string);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const comment = await queries.createComment({
            productId: productId as string,
            userId,
            content,
        });
        return res.status(201).json(comment);
    } catch (error) {
        console.error("Error creating comment:", error);
        return res.status(500).json({ message: "failed to create comment" });
    }   
};

//delete a comment by its ID (protected)
export async function deleteComment(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { commentId } = req.params;

        const existingComment = await queries.getCommentById(commentId as string);  
        if (!existingComment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        if (existingComment.userId !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await queries.deleteComment(commentId as string);
        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ message: "failed to delete comment" });
    }
};