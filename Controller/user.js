
const User  = require("../Models/user");

module.exports.renderSignupForm =  (req, res) => {
    res.render("user/signup.ejs");
  }


  module.exports.postSignup =async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({
        username,
        email,
      });

      let registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        } else {
          req.flash("success", "Welcome to WanderLust!!");
          return res.redirect("/listing");
        }
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }


  module.exports.renderLoginForm = (req, res) => {
    res.render("user/login.ejs");
  }

  module.exports.postLogin = async (req, res) => {
    req.flash("success", "Welcome Back to Wanderlust!!");
    let myUrl = res.locals.redirectUrl || "/listing";
    res.redirect(myUrl);
  }


  module.exports.logout = (req, res, next) => {
    //req.logout is a method of passport which uses the methods of serialze and deserialize and make the user logged out inside session info of user
    req.logout((err) => {
      if (err) {
        return next(err);
      } else {
        req.flash("success", "You are Successfully Logged Out!");
        return res.redirect("/listing");
      }
    });
  }