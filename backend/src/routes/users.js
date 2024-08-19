import { Router } from "express";
import { addToHistory, getUserHistory, login, signup, test } from "../controlers/user_controler.js";

const router = Router();

router.route("/test").post(test);

router.route("/login").post(login);

router.route("/signup").post(signup);

router.route("/add_to_activity").post(addToHistory);

router.route("/get_all_activity").get(getUserHistory);

export default router;