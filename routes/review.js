const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../Models/reviews");
const Listing = require("../Models/listing");
const {
  validateReview,
  isLoggedIn,
  isAuthor,
} = require("../Middleware/isLoggedIn");
const asyncWrap = require("../utils/wrapAsync");
const { reviewPost, destroyReview } = require("../Controller/review");

// Add review route
router.post("/", isLoggedIn, validateReview, asyncWrap(reviewPost));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn , isAuthor, asyncWrap(destroyReview));

module.exports = router;
