const Category = require("../models/Category");
const { verifyToken } = require("./verifyToken");
const fs = require("fs");
const path = require("path");

exports.getAllCategory = (req, res) => {
  Category.find()
    .sort({ updatedAt: -1 })
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
  // verifyToken(req, res, () => {
  if (!req.file) {
    res.status(500).json({
      message: "Tidak ada file gambar yang dikirimkan",
      data: null,
    });
  }
  const data = {
    name: req.body.name,
    image: req.file.path,
  };
  const newCategory = new Category(data);
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
  // });
};

exports.getCategoryById = (req, res) => {
  // verifyToken(req, res, () => {
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
  // });
};

exports.updateCategory = (req, res) => {
  // verifyToken(req, res, () => {
  Category.findById(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).json({
          message: "Data kategori tidak ditemukan",
          data: null,
        });
      } else {
        if (!req.file) {
          response.name = req.body.name;
          response.image = req.body.image;
        } else {
          const filePath = path.join(__dirname, "../", response.image);
          fs.unlinkSync(filePath);
          response.name = req.body.name;
          response.image = req.file.path;
        }
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
  // });
};

exports.deleteCategory = (req, res) => {
  // verifyToken(req, res, () => {
  Category.findById(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).json({
          message: "Data kategori tidak ditemukan",
          data: null,
        });
      } else {
        const filePath = path.join(__dirname, "../", response.image);
        fs.unlinkSync(filePath);
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
  // });
};
