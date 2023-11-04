const Listing = require("../Models/listing");
const Review = require("../Models/reviews");
const ExpressError = require("../utils/customError");
const { schema, reviewSchema } = require("../utils/SchemaValidation.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; //exact path where user requested now saved inside our session in the form of cookie
    req.flash("error", "You must login first");
    return res.redirect("/login");
  }
  next();
};

/// as the isLoggedIn middleware called and it authenticates the user that user is logged in now it will delete th information or reset the extra session info like req.session.redirectUrl
// so we have to save this req.originalUrl inside our locals res.locals.redirectUrl

module.exports.redirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "you may not have access to this listing");
    return res.redirect(`/listing/${id}`);
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "you may not have access to this review");
    return res.redirect(`/listing/${id}`);
  }
  next();
};

//validationSchema By joy act as a middleware
module.exports.validateListings = async (req, res, next) => {
  let { error } = schema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//validationReviewSchema By joy act as a middleware
module.exports.validateReview = async (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
