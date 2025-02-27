import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/users.controller.js";
import { authMiddleware, healthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Route GET pour récupérer tous les utilisateurs
router.get("/", getUsers);
// Route POST pour créer un utilisateur
router.post("/", createUser);

// Route PUT pour modifier un utilisateur
router.put("/:id", updateUser);


// Route PUT pour modifier un utilisateur
router.delete("/:id", deleteUser);

export default router;