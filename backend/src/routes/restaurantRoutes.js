import express from "express";
import {
  registerRestaurant,
  loginRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.post("/register", registerRestaurant);
router.post("/login", loginRestaurant);

export default router;
