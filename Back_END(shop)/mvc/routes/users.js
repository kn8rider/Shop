const express = require('express');
const router = express.Router();
const middleware = require("./middleware/middleware");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const usersCtrl = require("../controllers/user");
const productsCtrl = require("../controllers/product");
const Product_data = require('../models/Product_data');



//////////////////////////////////////////////////////////////////////////
////////////////////////////////USER ROUTES//////////////////////////////
////////////////////////////////////////////////////////////////////////

router.post("/register",usersCtrl.registerUser);

router.post("/login",usersCtrl.loginUser);

router.get("/logout", middleware.authorize,usersCtrl.logoutUser);

////////////////////////////////////////////////////////////////////////
//////////////////////////////PRODUCTS ROUTES//////////////////////////
//////////////////////////////////////////////////////////////////////

router.get("/getSearchResults",middleware.authorize, productsCtrl.getSearchResults);

router.get("/reset/:pass", productsCtrl.reset);       //ONLY FOR DEVELOPMENT PURPOSE

router.post("/upload-products", productsCtrl.uploadProductsForm);

router.post("/upload-carousal", productsCtrl.uploadCarousalForm);

router.get("/home",middleware.authorize, productsCtrl.sendProductData);

router.get("/product/:id",middleware.authorize, productsCtrl.getProductByID);
            
router.get("/category/:category_name",middleware.authorize, productsCtrl.getProductByCategory);

router.get("/userDetails",middleware.authorize, productsCtrl.getUserByID);

//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////PROTECTED ROUTES/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

router.put("/add-to-cart/:prodId",passport.authenticate('jwt', { session: false }), productsCtrl.addToCart);       //id fetched from client cookie  

router.get("/view-Cart/",passport.authenticate('jwt', { session: false }), productsCtrl.viewCart);  //id fetched from client cookie  

router.put("/incProd/:prodId",passport.authenticate('jwt', { session: false }), productsCtrl.increaseQuantity);         //id fetched from client cookie  

router.put("/decProd/:prodId",passport.authenticate('jwt', { session: false }), productsCtrl.decreaseQuantity);          //id fetched from client cookie  

router.put("/removeProd/:prodId",passport.authenticate('jwt', { session: false }), productsCtrl.removeProduct);          //id fetched from client cookie  

router.post("/placeorder",passport.authenticate('jwt', { session: false }), productsCtrl.placeOrder);          //id fetched from client cookie  

router.post("/incByVal/:prodId/:value",passport.authenticate('jwt', { session: false }), productsCtrl.increaseQuantityByValue);          //id fetched from client cookie  

router.get("/prevOrder",passport.authenticate('jwt', { session: false }), productsCtrl.previousOrder);          //id fetched from client cookie  

module.exports = router;
