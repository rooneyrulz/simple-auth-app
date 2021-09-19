const { Router } = require("express");

const isAuth = require("../middleware/is-auth");
const adminController = require("../controllers/admin");

const router = Router({ strict: true });

router.post("/login", adminController.login);
router.get("/users", isAuth, adminController.getUsers);
router.delete("/users/:id", isAuth, adminController.deleteUser);
router.patch("/users/:id", isAuth, adminController.updateUser);

module.exports = router;
