const Banner = require("../models/Banner");
const { verifyToken } = require("./verifyToken");

exports.getAllBanner = (req, res) => {
  Banner.find()
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
  verifyToken(req, res, () => {
    const newBanner = new Banner(req.body);
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
  });
};

exports.getBannerById = (req, res) => {
  verifyToken(req, res, () => {
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
  });
};

exports.updateBanner = (req, res) => {
  verifyToken(req, res, () => {
    Banner.findById(req.params.id)
      .then((response) => {
        if (!response) {
          res.status(404).json({
            message: "Data banner tidak ditemukan",
            data: null,
          });
        } else {
          response.title = req.body.title;
          response.desc = req.body.desc;
          response.image = req.body.image;
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
  });
};

exports.deleteBanner = (req, res) => {
  verifyToken(req, res, () => {
    Banner.findById(req.params.id)
      .then((response) => {
        if (!response) {
          res.status(404).json({
            message: "Data banner tidak ditemukan",
            data: null,
          });
        } else {
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
  });
};
