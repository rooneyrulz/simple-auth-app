const { verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("x-user-auth-token");
  if (!token || token === "") {
    req.isAuth = false;
    return res.status(401).send("Authorization failed..");
  } else {
    let decoded;

    try {
      decoded = verify(token, process.env.JWT_SECRET);
    } catch (error) {
      req.isAuth = false;
      return res.status(401).send("Authorization failed..");
    }

    if (!decoded) {
      req.isAuth = false;
      return res.status(401).send("Authorization failed..");
    }

    if (decoded?.user?.role !== 'user') {
      req.isAuth = false;
      return res.status(401).send("Authorization failed..");
    }

    req.isAuth = true;
    req.user = decoded.user;
    req.userData = decoded;
    return next();
  }
};
