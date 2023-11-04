
const Listing = require("../Models/listing");
const Review = require("../Models/reviews");

module.exports.reviewPost = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = res.locals.currUser._id;
  listing.reviews.push(newReview);
  console.log(newReview);

  await newReview.save();
  await listing.save();
  console.log("New Review Saved");
  req.flash("success", "new review added");
  res.redirect(`/listing/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "review got deleted");
  res.redirect(`/listing/${id}`);
};
