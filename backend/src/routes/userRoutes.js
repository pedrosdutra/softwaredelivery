import express from "express";
import { registerUser, loginUser, updateUser } from "../controllers/userController.js";

//Interação com o servidor Express
const router = express.Router();

//Rotas para regristro, login e atualização de usuário
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);

export default router;
