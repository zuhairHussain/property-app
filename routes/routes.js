const express = require("express");
const router = express.Router();
var VerifyToken = require("../lib/VerifyToken");
var authorize = require("../lib/authorize");
var Role = require("../lib/role");

const product_controller = require("../api/controllers/product.controller");
const auth_controller = require("../api/controllers/auth.controller");

router.post("/product/create", [VerifyToken, authorize(Role.Admin)], product_controller.product_create);
router.post("/product/update", VerifyToken, product_controller.product_update);
router.get("/products", VerifyToken, product_controller.all_my_products);
router.get("/product/:id", product_controller.product_details);

router.post("/register", auth_controller.user_create);
router.get("/verify-email", auth_controller.verify_email);
router.post("/login", auth_controller.user_login);
router.post("/reset-password-request", auth_controller.reset_password_request);
router.post("/reset-password", auth_controller.reset_password);

module.exports = router;
