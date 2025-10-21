import express from "express";
import {
  registerRestaurant,
  loginRestaurant,
} from "../controllers/restaurantController.js";

//Interação com o servidor Express
const router = express.Router();

//Rotas para regristro, login e atualização do restaurante
router.post("/register", registerRestaurant);
router.post("/login", loginRestaurant);

export default router;
