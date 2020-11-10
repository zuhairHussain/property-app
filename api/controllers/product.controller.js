const Product = require("../models/product.model");

exports.product_create = function (req, res, next) {
  if (req.body.name && req.body.price && req.userId) {
    let product = new Product({
      name: req.body.name,
      price: req.body.price,
      user: req.userId
    });
    product.save(function (err, product) {
      if (err) {
        return next(err);
      } else {
        res.status(200).send({ product: product });
      }
    });
  } else {
    res.status(500).send("Invalid Information");
  }
};

exports.product_update = function (req, res, next) {
  if (req.body.id && req.userId) {
    var query = {}
    const { name, price } = req.body;
    if (name) {
      query["name"] = name;
    }
    if (price) {
      query["price"] = price;
    }
    Product.update(
      { _id: req.body.id, user: req.userId },
      { $set: query },
      { multi: true, new: true },
      function (err, product) {
        if (err) {
          res.status(500).send("Invalid Information");
        } else {
          if (product && product.n === 1) {
            res.send("Product Updated");
          } else {
            res.send("Product not found!");
          }
        }
      }
    );
  } else {
    res.status(500).send("Invalid Information");
  }
};

exports.all_my_products = function (req, res, next) {
  if (req.userId) {
    Product.find({ user: req.userId }, function (err, product) {
      if (err) {
        return next(err);
      } else {
        res.status(200).send({ product: product });
      }
    });
  } else {
    res.status(500).send("Invalid Information");
  }
};



exports.product_details = function (req, res, next) {
  if (req.params.id) {
    Product.findById(req.params.id, function (err, product) {
      if (err) {
        return next(err);
      } else {
        res.status(200).send({ product: product });
      }
    });
  } else {
    res.status(500).send("Invalid Information");
  }
};

exports.all_products = function (req, res, next) {
  Product.find({}, function (err, product) {
    if (err) {
      return next(err);
    } else {
      res.status(200).send({ product: product });
    }
  });
};