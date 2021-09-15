const { Router } = require("express");

const isAuth = require("../middleware/is-auth");
const adminController = require("../controllers/admin");

const router = Router({ strict: true });

router.post("/login", adminController.login);
router.get("/users", isAuth, adminController.getUsers);
router.get("/users/:id", isAuth, adminController.getUser);
router.patch("/users/:id", isAuth, adminController.updateUser);

module.exports = router;
