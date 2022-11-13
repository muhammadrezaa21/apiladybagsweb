const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.registerUser = (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(req.body.password, "ladybagsweb").toString(),
  });

  newUser
    .save()
    .then((response) => {
      res.status(201).json({
        message: "Data user berhasil dibuat",
        data: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Data user gagal dibuat",
        data: null,
        error: error,
      });
    });
};

exports.loginUser = (req, res) => {
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;

  User.findOne({ email: inputEmail })
    .then((response) => {
      if (!response) {
        res.status(404).json({
          message: "Data user tidak ditemukan",
          data: null,
        });
      } else {
        const hashedPassword = CryptoJs.AES.decrypt(
          response.password,
          "ladybagsweb"
        );
        const resultPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
        if (resultPassword !== inputPassword) {
          res.status(401).json({
            message: "Password yang anda masukan salah",
            data: null,
          });
        } else {
          const { password, ...data } = response._doc;
          const accesToken = jwt.sign(
            {
              id: data._id,
              isAdmin: data.isAdmin,
            },
            "ladybagswebtoken",
            { expiresIn: "10h" }
          );
          res.status(200).json({
            message: "Proses login berhasil",
            data: { ...data, accesToken },
          });
        }
      }
    })
    .catch((error) =>
      res.status(500).json({
        message: "Data user tidak ditemukan",
        data: null,
        error: error,
      })
    );
};
