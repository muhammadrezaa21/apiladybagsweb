const User = require("../models/User");
const { verifyToken } = require("./verifyToken");
const CryptoJs = require("crypto-js");

exports.updateUser = (req, res, next) => {
  verifyToken(req, res, () => {
    User.findById(req.user.id)
      .then((response) => {
        if (!response) {
          res.status(404).json({
            message: "Data tidak ditemukan",
            data: null,
          });
        } else {
          const hashedPassword = CryptoJs.AES.decrypt(
            response.password,
            "ladybagsweb"
          );
          const resultPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
          if (resultPassword !== req.body.currentPassword) {
            res.status(401).json({
              message: "Password lama yang anda masukan salah",
              data: null,
            });
          } else {
            const newPasswordAfterEncrypt = CryptoJs.AES.encrypt(
              req.body.newPassword,
              "ladybagsweb"
            ).toString();
            response.password = newPasswordAfterEncrypt;
            response
              .save()
              .then((result) => {
                res.status(200).json({
                  message: "Password berhasil diubah",
                  data: result,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Password gagal diubah",
                  data: null,
                  error: error,
                });
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
  });
};
