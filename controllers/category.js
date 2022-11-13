const Category = require("../models/Category");
const { verifyToken } = require("./verifyToken");

exports.getAllCategory = (req, res) => {
  Category.find()
    .then((response) => {
      res
        .status(200)
        .json({ message: "Data kategori berhasil ditemukan", data: response });
    })
    .catch((error) =>
      res.status(500).json({
        message: "Data kategori tidak ditemukan",
        data: null,
        error: error,
      })
    );
};

exports.createNewCategory = (req, res) => {
  verifyToken(req, res, () => {
    const newCategory = new Category(req.body);
    newCategory
      .save()
      .then((response) => {
        res.status(201).json({
          message: "Kategori baru berhasil ditambahkan",
          data: response,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Kategori baru gagal ditambahkan",
          data: null,
          error: error,
        });
      });
  });
};

exports.getCategoryById = (req, res) => {
  verifyToken(req, res, () => {
    Category.findById(req.params.id)
      .then((response) => {
        if (!response) {
          res.status(404).json({
            message: "Data kategori tidak ditemukan",
            data: null,
          });
        } else {
          res.status(200).json({
            message: "Data kategori berhasil ditemukan",
            data: response,
          });
        }
      })
      .catch((error) =>
        res.status(500).json({
          message: "Data kategori gagal diubah",
          data: null,
          error: error,
        })
      );
  });
};

exports.updateCategory = (req, res) => {
  verifyToken(req, res, () => {
    Category.findById(req.params.id)
      .then((response) => {
        if (!response) {
          res.status(404).json({
            message: "Data kategori tidak ditemukan",
            data: null,
          });
        } else {
          response.name = req.body.name;
          response.image = req.body.image;
          response
            .save()
            .then((result) => {
              res.status(201).json({
                message: "Data kategori berhasil diubah",
                data: result,
              });
            })
            .catch((error) => {
              res.status(500).json({
                message: "Data kategori gagal diubah",
                data: null,
                error: error,
              });
            });
        }
      })
      .catch((error) =>
        res.status(500).json({
          message: "Data kategori gagal diubah",
          data: null,
          error: error,
        })
      );
  });
};

exports.deleteCategory = (req, res) => {
  verifyToken(req, res, () => {
    Category.findById(req.params.id)
      .then((response) => {
        if (!response) {
          res.status(404).json({
            message: "Data kategori tidak ditemukan",
            data: null,
          });
        } else {
          Category.findByIdAndDelete(response._id)
            .then((result) => {
              res.status(200).json({
                message: "Data kategori berhasil dihapus",
                data: result,
              });
            })
            .catch((error) =>
              res.status(500).json({
                message: "Data kategori gagal dihapus",
                data: null,
                error: error,
              })
            );
        }
      })
      .catch((error) =>
        res.status(500).json({
          message: "Data kategori gagal dihapus",
          data: null,
          error: error,
        })
      );
  });
};
