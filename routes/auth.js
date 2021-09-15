const { Router } = require("express");

const isAuth = require("../middleware/is-auth");
const authController = require("../controllers/auth");

const router = Router({ strict: true });

router.post("/register", authController.register);

router.post("/login", authController.login);
router.post("/admin", authController.loginAsAdmin);

router.patch("/update/:id", isAuth, authController.updateUser);

router.get("/user", isAuth, authController.authUser);

module.exports = router;
