const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const asyncWrap = require("../utils/wrapAsync");
const ExpressError = require("../utils/customError");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { redirectUrl } = require("../Middleware/isLoggedIn");
const {
  renderSignupForm,
  postSignup,
  renderLoginForm,
  postLogin,
  logout,
} = require("../Controller/user");

//signup

router.route("/signup").get(renderSignupForm).post(asyncWrap(postSignup));

//login

router
  .route("/login")
  .get(renderLoginForm)
  .post(
    redirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(postLogin)
  );

//logout route

router.get("/logout", logout);

module.exports = router;
