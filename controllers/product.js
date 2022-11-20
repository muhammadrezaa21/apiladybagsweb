const Product = require("../models/Product");
const { verifyToken } = require("./verifyToken");
const fs = require("fs");
const path = require("path");

exports.createNewProduct = (req, res) => {
  // verifyToken(req, res, () => {
  if (req.files.length < 1) {
    res
      .status(500)
      .json({ message: "Tidak ada file gambar yang dikirimkan", data: null });
  } else {
    const colorsArray = JSON.parse(req.body.colors);
    const colors = colorsArray.map((item, index) => {
      return { id: item.id, color: item.color, image: req.files[index].path };
    });
    const data = {
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      promoPrice: req.body.promoPrice ? req.body.promoPrice : 0,
      colors: colors,
      category: req.body.category,
      type: req.body.type,
    };
    const newProduct = new Product(data);
    newProduct
      .save()
      .then((response) => {
        res.status(201).json({
          message: "Produk baru berhasil ditambahkan",
          data: response,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Produk gagal ditambahkan",
          data: null,
          error: error,
        });
      });
  }
  // });
};

exports.updateProduct = (req, res) => {
  // verifyToken(req, res, () => {
  const name = req.body.name;
  const desc = req.body.desc;
  const price = req.body.price;
  const promoPrice = req.body.promoPrice ? req.body.promoPrice : 0;
  const category = req.body.category;
  const type = req.body.type;
  const colorsFromFrontEnd = JSON.parse(req.body.colors);

  Product.findById(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).json({
          message: "Data produk tidak ditemukan",
          data: null,
        });
      } else {
        if (req.files.length < 1) {
          if (response.colors.length === colorsFromFrontEnd.length) {
            response.name = name;
            response.desc = desc;
            response.price = price;
            response.promoPrice = promoPrice;
            response.colors = colorsFromFrontEnd;
            response.category = category;
            response.type = type;
            response
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "Data produk berhasil diubah",
                  data: result,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Data produk gagal diubah",
                  data: null,
                  error: error,
                });
              });
          } else {
            colorsFromFrontEnd.map((item, index) => {
              response.colors.map((color) => {
                if (item.image === color.image) {
                  color.isTrue = true;
                  item.id = index + 1;
                }
              });
            });
            response.colors.map((item) => {
              if (!("isTrue" in item)) {
                const filePath = path.join(__dirname, "../", item.image);
                fs.unlinkSync(filePath);
              }
            });
            response.name = name;
            response.desc = desc;
            response.price = price;
            response.promoPrice = promoPrice;
            response.colors = colorsFromFrontEnd;
            response.category = category;
            response.type = type;
            response
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "Data produk berhasil diubah",
                  data: result,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Data produk gagal diubah",
                  data: null,
                  error: error,
                });
              });
          }
        } else {
          let index = 0;
          colorsFromFrontEnd.map((item) => {
            if ("imagePreview" in item) {
              item.image = req.files[index].path;
              delete item["imagePreview"];
              index += 1;
            }
          });
          colorsFromFrontEnd.map((item, index) => {
            response.colors.map((color) => {
              if (item.image === color.image) {
                color.isTrue = true;
                item.id = index + 1;
              }
            });
          });
          response.colors.map((item) => {
            if (!("isTrue" in item)) {
              const filePath = path.join(__dirname, "../", item.image);
              fs.unlinkSync(filePath);
            }
          });
          response.name = name;
          response.desc = desc;
          response.price = price;
          response.promoPrice = promoPrice;
          response.colors = colorsFromFrontEnd;
          response.category = category;
          response.type = type;
          response
            .save()
            .then((result) => {
              res.status(201).json({
                message: "Data produk berhasil diubah",
                data: result,
              });
            })
            .catch((error) => {
              res.status(500).json({
                message: "Data produk gagal diubah",
                data: null,
                error: error,
              });
            });
        }
      }
    })
    .catch((error) =>
      res.status(500).json({
        message: "Data produk tidak ditemukan",
        data: null,
        error: error,
      })
    );
  // });
};
exports.getAllProduct = (req, res) => {
  if (req.query.category) {
    Product.find({ category: { $in: [req.query.category] } })
      .sort({ updatedAt: -1 })
      .then((response) => {
        res
          .status(200)
          .json({ message: "Data produk berhasil ditemukan", data: response });
      })
      .catch((error) =>
        res.status(500).json({
          message: "Data produk tidak ditemukan",
          data: null,
          error: error,
        })
      );
  } else if (req.query.type1 && req.query.type2) {
    Product.find({ type: { $in: [req.query.type1, req.query.type2] } })
      .sort({ updatedAt: -1 })
      .limit(10)
      .then((response) => {
        res
          .status(200)
          .json({ message: "Data produk berhasil ditemukan", data: response });
      })
      .catch((error) =>
        res.status(500).json({
          message: "Data produk tidak ditemukan",
          data: null,
          error: error,
        })
      );
  } else if (req.query.query === "all_product") {
    Product.find()
      .sort({ updatedAt: -1 })
      .then((response) => {
        res.status(200).json({
          message: "Data produk berhasil ditemukan",
          data: response,
        });
      })
      .catch((error) =>
        res.status(500).json({
          message: "Data produk tidak ditemukan",
          data: null,
          error: error,
        })
      );
  } else {
    Product.find({ $text: { $search: req.query.query } })
      .sort({ updatedAt: -1 })
      .then((response) => {
        res
          .status(200)
          .json({ message: "Data produk berhasil ditemukan", data: response });
      })
      .catch((error) =>
        res.status(500).json({
          message: "Data produk tidak ditemukan",
          data: null,
          error: error,
        })
      );
  }
};

exports.getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).json({
          message: "Data produk tidak ditemukan",
          data: null,
        });
      } else {
        res.status(200).json({
          message: "Data produk berhasil ditemukan",
          data: response,
        });
      }
    })
    .catch((error) =>
      res.status(500).json({
        message: "Data produk tidak ditemukan",
        data: null,
        error: error,
      })
    );
};

exports.deleteProduct = (req, res) => {
  // verifyToken(req, res, () => {
  Product.findById(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).json({
          message: "Data produk tidak ditemukan",
          data: null,
        });
      } else {
        response.colors.map((item) => {
          const filePath = path.join(__dirname, "..", item.image);
          fs.unlinkSync(filePath);
        });
        Product.findByIdAndDelete(response._id)
          .then((result) => {
            res.status(200).json({
              message: "Data produk berhasil dihapus",
              data: result,
            });
          })
          .catch((error) =>
            res.status(500).json({
              message: "Produk gagal dihapus",
              data: null,
              error: error,
            })
          );
      }
    })
    .catch((error) =>
      res.status(500).json({
        message: "Produk gagal dihapus",
        data: null,
        error: error,
      })
    );
  // });
};
