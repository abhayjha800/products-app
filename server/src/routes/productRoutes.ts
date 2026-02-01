import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as productController from "../controllers/productController";

const router = Router();

//GET /api/products/ route to get all products (public)
router.get("/", productController.getAllProducts);

//GET /api/products/user route to get products by current user (protected)
router.get("/user", requireAuth(), productController.getProductsByUser);

//GET /api/products/:id route to get a product by id (public)
router.get("/:id", productController.getProductById);

//POST /api/products/ route to create a new product (protected)
router.post("/", requireAuth(), productController.createProduct);

//PUT /api/products/:id route to update a product by id (protected)
router.put("/:id", requireAuth(), productController.updateProduct);

//DELETE /api/products/:id route to delete a product by id (protected)
router.delete("/:id", requireAuth(), productController.deleteProduct);

export default router;