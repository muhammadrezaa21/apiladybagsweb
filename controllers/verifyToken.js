const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.token;
  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    jwt.verify(token, "ladybagswebtoken", (error, user) => {
      if (error)
        res.status(403).json({ message: "Token tidak valid", data: null });
      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "Akun anda tidak ter-authentifikasi", data: null });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id && req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Maaf, anda tidak diizinkan", data: null });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorization };
