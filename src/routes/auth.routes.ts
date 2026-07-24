import { Router } from "express";
import { signup, login } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authenticate, (req: any, res) => {
  res.json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user,
  });
});
export default router;