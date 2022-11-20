const Catalog = require("../models/Catalog");
const { verifyToken } = require("./verifyToken");

exports.getAllCatalog = (req, res) => {
  Catalog.find()
    .sort({ updatedAt: -1 })
    .then((response) => {
      res
        .status(200)
        .json({ message: "Data katalog berhasil ditemukan", data: response });
    })
    .catch((error) =>
      res.status(500).json({
        message: "Data katalog tidak ditemukan",
        data: null,
        error: error,
      })
    );
};

exports.createNewCatalog = (req, res) => {
  // verifyToken(req, res, () => {
  const data = {
    name: req.body.name,
    link: req.body.link,
  };
  const newCatalog = new Catalog(data);
  newCatalog
    .save()
    .then((response) => {
      res.status(201).json({
        message: "Katalog baru berhasil ditambahkan",
        data: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Katalog baru gagal ditambahkan",
        data: null,
        error: error,
      });
    });
  // });
};

exports.getCatalogById = (req, res) => {
  // verifyToken(req, res, () => {
  Catalog.findById(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).json({
          message: "Data katalog tidak ditemukan",
          data: null,
        });
      } else {
        res.status(200).json({
          message: "Data katalog berhasil ditemukan",
          data: response,
        });
      }
    })
    .catch((error) =>
      res.status(500).json({
        message: "Data katalog gagal diubah",
        data: null,
        error: error,
      })
    );
  // });
};

exports.updateCatalog = (req, res) => {
  // verifyToken(req, res, () => {
  Catalog.findById(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).json({
          message: "Data katalog tidak ditemukan",
          data: null,
        });
      } else {
        response.name = req.body.name;
        response.link = req.body.link;
        response
          .save()
          .then((result) => {
            res.status(201).json({
              message: "Data katalog berhasil diubah",
              data: result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Data katalog gagal diubah",
              data: null,
              error: error,
            });
          });
      }
    })
    .catch((error) =>
      res.status(500).json({
        message: "Data katalog gagal diubah",
        data: null,
        error: error,
      })
    );
  // });
};

exports.deleteCatalog = (req, res) => {
  // verifyToken(req, res, () => {
  Catalog.findById(req.params.id)
    .then((response) => {
      if (!response) {
        res.status(404).json({
          message: "Data katalog tidak ditemukan",
          data: null,
        });
      } else {
        Catalog.findByIdAndDelete(response._id)
          .then((result) => {
            res.status(200).json({
              message: "Data katalog berhasil dihapus",
              data: result,
            });
          })
          .catch((error) =>
            res.status(500).json({
              message: "Data katalog gagal dihapus",
              data: null,
              error: error,
            })
          );
      }
    })
    .catch((error) =>
      res.status(500).json({
        message: "Data katalog gagal dihapus",
        data: null,
        error: error,
      })
    );
  // });
};
