import { Router } from "express";
import {
  login,
  register,
  registrarTutor,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/registrarTutor", registrarTutor);

export default router;
