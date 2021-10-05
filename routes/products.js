const express = require("express");
const router = express.Router();
const { Product, validate } = require("../models/product");
const multer = require("multer");
const fs = require("fs");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "client/public/uploads/products");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const product = await Product.find({});
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/add", upload.single("image"), auth, admin, async (req, res) => {
  // checks for validation errs with joi
  const { err } = validate(req.body);
  if (err) return res.status(400).json(err);

  const file = req.file;
  try {
    // creates the new product
    if (!file) {
      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      });

      await product
        .save()
        .catch((err) =>
          res.status(400).json({ error: "The product could not be saved" })
        );
    } else {
      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename,
        description: req.body.description,
      });

      await product
        .save()
        .catch((err) =>
          res.status(400).json({ error: "The product could not be saved" })
        );
    }
  } catch (err) {
    console.log(err);
  }
});

router.put(
  "/edit/:id",
  upload.single("image"),
  auth,
  admin,
  async (req, res) => {
    // checks for validation errors with joi
    const { err } = validate(req.body);
    if (err) return res.status(400).json(err.details[0].message);

    const file = req.file;
    try {
      if (!file) {
        // if a file is not uploaded, it only updates all except the image
        const product = await Product.findByIdAndUpdate(req.params.id, {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
        });

        if (!product)
          return res.status(404).json({ error: "Product not found" });
      } else {
        // deletes the image from the public folder if it was changed but if the image was the default, it will do nothing
        const image = await Product.findById(req.params.id);
        if (image.image !== "default.jpg") {
          const path = `client/public/uploads/products/${image.image}`;
          fs.unlink(path, (err) => {
            if (err) {
              return res.status(400).json({ error: "Image not found" });
            }
          });
        }

        const product = await Product.findByIdAndUpdate(req.params.id, {
          name: req.body.name,
          price: req.body.price,
          image: req.file.filename,
          description: req.body.description,
        });
        if (!product)
          return res.status(404).json({ error: "Product not found" });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.delete("/delete/:id", auth, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found." });

    // deletes the image from the public folder but if the image was the default, it will do nothing
    if (product.image !== "default.jpg") {
      const path = `client/public/uploads/products/${product.image}`;
      fs.unlink(path, (err) => {
        if (err) {
          return res.status(400).json({ error: "Image not found" });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
