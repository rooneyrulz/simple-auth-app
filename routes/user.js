const { Router } = require("express");

const isAuth = require("../middleware/is-auth");
const userController = require("../controllers/user");

const router = Router({ strict: true });

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/auth-user", isAuth, userController.getAuthUser);

module.exports = router;
