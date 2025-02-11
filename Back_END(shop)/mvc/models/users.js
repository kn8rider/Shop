const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");





const cartProductList = new mongoose.Schema(
{
  product_id:{
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  short_desc: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },

  });

const userSchema = new mongoose.Schema(
  {
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  salt: String,
  cart:{
  cartlist: [cartProductList],
  total_product: {
    type: Number,
    default: 0,
  },
  total_price: {
    type: Number,
    default: 0,
  },
  },
  });





userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(64).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === this.password;
};

userSchema.methods.getJwt = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_TOKEN,
    { expiresIn: '2h' },
  );
};






mongoose.model("User", userSchema);
mongoose.model("cartProduct", cartProductList);


