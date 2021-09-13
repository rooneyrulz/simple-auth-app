const { Router } = require("express");

const isAuth = require("../middleware/is-auth");
const profileController = require("../controllers/profile");

const router = Router({ strict: true });

// GET ALL PROFILES
router.get("/", isAuth, profileController.getProfiles);

// CREATE PROFILE
router.post("/create", isAuth, profileController.createProfile);

// GET USER PROFILE
router.get("/user/profile", isAuth, profileController.getUserProfile);

// UPDATE EXISTING PROFILE
router.patch("/update/:profile_id", isAuth, profileController.updateProfile);

module.exports = router;
