import express from "express";
import { getUsers, createUser, updateUser, deleteUser, signIn } from "../controllers/users.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Route GET pour récupérer tous les utilisateurs
router.get("/", authMiddleware, getUsers);

// Route POST pour créer un utilisateur
router.post("/", createUser);


// Route PUT pour modifier un utilisateur
router.put("/:id", updateUser);

// Route PUT pour modifier un utilisateur
router.delete("/:id", deleteUser);


router.post("/login", signIn);

export default router;