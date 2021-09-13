const User = require("../models/User");

exports.getUserById = (id) => {
  return User.findById(id)
    .then((user) => user)
    .catch((err) => new Error("Can't find the user..!"));
};
