const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (username !== "admin")
      return res.status(404).send("Invalid credentials..");
    if (password !== "admin")
      return res.status(400).send("Invalid credentials..");
    const user = { _id: 1, username, password: null, role: "admin" };
    const token = sign({ user }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    return res.status(200).json(await User.find().lean());
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const user = await User.findById(id).lean();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!req.admin) return res.status(400).send("You dont have permission");
    const user = await User.findById(id).lean();
    if (!user) return res.status(400).send("User does not exist");
    const userObj = { ...req.body };
    if (req.body.password) {
      const hashedPWD = await hash(req.body.password, 12);
      userObj.password = hashedPWD;
    }
    const newUser = await User.findByIdAndUpdate(
      { _id: id },
      { ...userObj },
      { new: true }
    );
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};
