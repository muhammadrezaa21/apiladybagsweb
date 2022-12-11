const Banner = require("../models/Banner");
const { verifyToken } = require("./verifyToken");
const fs = require("fs");
const path = require("path");

exports.getAllBanner = (req, res) => {
  Banner.find()
    .sort({ updatedAt: -1 })
    .then((response) => {
      res
        .status(200)
        .json({ message: "Data banner berhasil ditemukan", data: response });
    })
    .catch((error) =>
      res.status(500).json({
        message: "Data banner tidak ditemukan",
        data: null,
        error: error,
      })
    );
};

exports.createNewBanner = (req, res) => {
  // verifyToken(req, res, () => {
  if (!req.file) {
    res.status(500).json({
      message: "Tidak ada file gambar yang dikirimkan",
      data: null,
    });
  }
  const data = {
    title: req.body.title,
    desc: req.body.desc,
    image: req.file.path,
  };
  const newBanner = new Banner(data);
  newBanner
    .save()
    .then((response) => {
      res.status(201).json({
        message: "Banner baru berhasil ditambahkan",
        data: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Banner baru gagal ditambahkan",
        data: null,
        error: error,
      });
    });
  // });
};

exports.getBannerById = (req, res) => {
  // verifyToken(req, res, () => {
  Banner.findById(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).json({
          message: "Data banner tidak ditemukan",
          data: null,
        });
      } else {
        res.status(200).json({
          message: "Data banner berhasil ditemukan",
          data: response,
        });
      }
    })
    .catch((error) =>
      res.status(500).json({
        message: "Data banner gagal diubah",
        data: null,
        error: error,
      })
    );
  // });
};

exports.updateBanner = (req, res) => {
  // verifyToken(req, res, () => {
  Banner.findById(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).json({
          message: "Data banner tidak ditemukan",
          data: null,
        });
      } else {
        if (!req.file) {
          console.log("tidak ada file yang masuk!");
          response.title = req.body.title;
          response.desc = req.body.desc;
          response.image = req.body.image;
        } else {
          console.log("ada file yang masuk!");
          console.log("FILE => ", req.file);
          const filePath = path.join(__dirname, "../", response.image);
          console.log(filePath);
          fs.unlinkSync(filePath);
          response.title = req.body.title;
          response.desc = req.body.desc;
          console.log(req.file);
          response.image = req.file.path;
        }
        response
          .save()
          .then((result) => {
            res.status(201).json({
              message: "Data banner berhasil diubah",
              data: result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Data banner gagal diubah",
              data: null,
              error: error,
            });
          });
      }
    })
    .catch((error) =>
      res.status(500).json({
        message: "Data banner gagal diubah",
        data: null,
        error: error,
      })
    );
  // });
};

exports.deleteBanner = (req, res) => {
  // verifyToken(req, res, () => {
  Banner.findById(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).json({
          message: "Data banner tidak ditemukan",
          data: null,
        });
      } else {
        const filePath = path.join(__dirname, "../", response.image);
        fs.unlinkSync(filePath);
        Banner.findByIdAndDelete(response._id)
          .then((result) => {
            res.status(200).json({
              message: "Data Banner berhasil dihapus",
              data: result,
            });
          })
          .catch((error) =>
            res.status(500).json({
              message: "Data banner gagal dihapus",
              data: null,
              error: error,
            })
          );
      }
    })
    .catch((error) =>
      res.status(500).json({
        message: "Data banner gagal dihapus",
        data: null,
        error: error,
      })
    );
  // });
};
