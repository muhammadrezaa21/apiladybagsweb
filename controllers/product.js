const Product = require("../models/Product");
const path = require("path");
const { verifyToken } = require("./verifyToken");

exports.createNewProduct = (req, res) => {
  verifyToken(req, res, () => {
    if (!req.files) {
      return res
        .status(400)
        .json({ message: "Tidak ada file yang diupload", data: null });
    }
    const file = req.files.file;
    const fileSize = file.data.length;
    const extension = path.extname(file.name);
    const fileName = file.md5 + extension;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowType = [".png", ".jpg", ".jpeg"];

    if (!allowType.includes(extension.toLowerCase())) {
      return res.status(422).json({ message: "Image tidak valid", data: null });
    }
    if (fileSize > 3000000) {
      return res
        .status(422)
        .json({ message: "File image tidak boleh lebih dari 3Mb" });
    }

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) {
        return res.status(500).json({ message: err.message, data: null });
      }
      console.log("Semuanya sukses");
    });

    // const newProduct = new Product(req.body);
    // newProduct
    //   .save()
    //   .then((response) => {
    //     res.status(201).json({
    //       message: "Produk baru berhasil ditambahkan",
    //       data: response,
    //     });
    //   })
    //   .catch((error) => {
    //     res.status(500).json({
    //       message: "Produk gagal ditambahkan",
    //       data: null,
    //       error: error,
    //     });
    //   });
  });
};

exports.getAllProduct = (req, res) => {
  if (req.query.category) {
    Product.find({ category: { $in: [req.query.category] } })
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
  } else {
    Product.find()
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
        message: "Data produk gagal diubah",
        data: null,
        error: error,
      })
    );
};

exports.updateProduct = (req, res) => {
  verifyToken(req, res, () => {
    Product.findById(req.params.id)
      .then((response) => {
        if (!response) {
          res.status(404).json({
            message: "Data produk tidak ditemukan",
            data: null,
          });
        } else {
          response.name = req.body.name;
          response.desc = req.body.desc;
          response.price = req.body.price;
          response.color = req.body.color;
          response.category = req.body.category;
          response.image = req.body.image;
          response
            .save()
            .then((result) => {
              console.log("result : ", result);
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
      })
      .catch((error) =>
        res.status(500).json({
          message: "Data produk gagal diubah",
          data: null,
          error: error,
        })
      );
  });
};

exports.deleteProduct = (req, res) => {
  verifyToken(req, res, () => {
    Product.findById(req.params.id)
      .then((response) => {
        if (!response) {
          res.status(404).json({
            message: "Data produk tidak ditemukan",
            data: null,
          });
        } else {
          console.log("response :", response);
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
  });
};
