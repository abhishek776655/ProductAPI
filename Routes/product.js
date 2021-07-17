const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const Category = require("../models/category");

// create product route
router.post("/create", async (req, res) => {
  Category.findOne({ categoryName: req.body.categoryName }) //check for any existing category by categoryName
    .then(async (category) => {
      let newCat;
      if (category) {
        // Category Exist in database
        newCat = category;
      } else {
        // Category does not exist
        const newCategory = new Category({
          //create a new Category object
          categoryName: req.body.categoryName,
        });
        newCat = await newCategory.save(); //saving category object on database
      }
      const product = new Product({
        // create a new product object
        productName: req.body.productName,
        unitPrice: req.body.unitPrice,
        qtyPerUnit: req.body.qtyPerUnit,
        unitInStock: req.body.unitInStock,
        disContinued: req.body.disContinued,
        category: newCat.id,
      });
      try {
        const resultProduct = await product.save(); //saving the product object on database
        const result = {
          ...resultProduct._doc,
          categoryName: newCat.categoryName,
        };
        res.json(result); // sending document response of both category and result
      } catch (e) {
        res.status(500).json(e);
      }
    });
});

router.get("/read", async (req, res) => {
  Product.findById(req.body.productId)
    .populate({
      path: "category",
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: "category" },
    })
    .then((product) => {
      console.log(product);

      res.json(product);
    })
    .catch((e) => {
      res.json(e);
    });
});

router.get("/readAll", async (req, res) => {
  Product.find({})
    .populate({
      path: "category",
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: "category" },
    })
    .then((product) => {
      console.log(product);

      res.json(product);
    })
    .catch((e) => {
      res.json(e);
    });
});

router.patch("/update", async (req, res) => {
  if (!req.body.updateObject.categoryName) {
    Product.findByIdAndUpdate(req.body.productId, req.body.updateObject)
      .then((product) => {
        console.log(product);
        if (!product) {
          res.status(404);
        }
        res.json(product);
      })
      .catch((e) => {
        res.status(404).json(e);
      });
  } else {
    Category.findOne({ categoryName: req.body.updateObject.categoryName })
      .then(async (category) => {
        let newCat;
        if (category) {
          // Category Exist in database

          newCat = category;
        } else {
          // Category does not exist
          console.log(newCat);
          const newCategory = new Category({
            // create a new Category object
            categoryName: req.body.updateObject.categoryName,
          });
          newCat = await newCategory.save(); // saving category object on database
        }

        Product.findByIdAndUpdate(req.body.productId, {
          ...req.body.updateObject,
          category: newCat.id,
        })
          .then((product) => {
            console.log(product);

            res.json(product);
          })
          .catch((e) => {
            res.json(e);
          });
      })
      .catch((e) => res.json(e));
  }
});

router.delete("/delete", async (req, res) => {
  Product.findByIdAndDelete(req.body.productId)
    .then((product) => {
      console.log(product);
      if (!product) {
        res.status(404);
      }
      res.json(product);
    })
    .catch((e) => {
      res.json(e);
    });
});

module.exports = router;
