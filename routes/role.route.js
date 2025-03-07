import express from "express";
import { getUsers, createUser } from "../controllers/users.controller.js";
import { authMiddleware, healthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Route GET pour récupérer tous les utilisateurs
router.get("/get-role", authMiddleware, healthMiddleware, getUsers);

// Route POST pour créer un utilisateur
router.post("/create-role", createUser);

export default router;