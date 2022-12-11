const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const bannerRoutes = require("./routes/banner");
const catalogRoutes = require("./routes/catalog");

const app = express();

app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/banner", bannerRoutes);
app.use("/api/v1/catalog", catalogRoutes);
app.use("/coba", (req, res) => res.send("Berhasil"));

// app.use((req, res) => {
//   res.send("404 PAGE NOT FOUND");
// });

mongoose
  .connect(
    "mongodb://muhammadreza21:2ioJZlU4I05kJpc2@ac-qyjww7t-shard-00-00.pkgfoik.mongodb.net:27017,ac-qyjww7t-shard-00-01.pkgfoik.mongodb.net:27017,ac-qyjww7t-shard-00-02.pkgfoik.mongodb.net:27017/apiladybagsweb?ssl=true&replicaSet=atlas-6b9rs7-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("Server and Database is running!");
    });
  })
  .catch((err) => console.log("error : ", err));

// mongodb://muhammadreza21:2ioJZlU4I05kJpc2@ac-qyjww7t-shard-00-00.pkgfoik.mongodb.net:27017,ac-qyjww7t-shard-00-01.pkgfoik.mongodb.net:27017,ac-qyjww7t-shard-00-02.pkgfoik.mongodb.net:27017/apiladybagsweb?ssl=true&replicaSet=atlas-6b9rs7-shard-0&authSource=admin&retryWrites=true&w=majority

// mongodb+srv://muhammadreza21:2ioJZlU4I05kJpc2@cluster0.pkgfoik.mongodb.net/apiladybagsweb?retryWrites=true&w=majority
