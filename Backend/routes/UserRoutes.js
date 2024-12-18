import express from "express";
import { registerUser, loginUser, getUserId, updateUser, deleateUser, logoutUser } from "../controllers/userController.js"

const router = express.Router();



router.route("/").post(registerUser);

router.route("/login").post(loginUser);
router.route("/get/:id").get(getUserId);
router.route("/update/:id").put(updateUser);
router.route("/deleate/:id").delete(deleateUser);
router.route("/logout").delete(logoutUser);


export default router;