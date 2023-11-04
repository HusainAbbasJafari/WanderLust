const express = require("express");
const router = express.Router({ mergeParams: true });

const Listing = require("../Models/listing");
const ExpressError = require("../utils/customError");

const asyncWrap = require("../utils/wrapAsync");
const {
  isLoggedIn,
  isOwner,
  validateListings,
} = require("../Middleware/isLoggedIn");
const {
  index,
  renderForm,
  postListing,
  showPost,
  editListing,
  updateListing,
  deleteListing,
} = require("../Controller/listing");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });
//now multer will upload files on our cloudinary storage instead of static folder uploads
// const upload = multer({ dest: "uploads/" });
//Index Route
//Add route - post
router.route("/").get(asyncWrap(index)).post(
  isLoggedIn,

  upload.single("listing[image]"),
  validateListings,
  asyncWrap(postListing)
);

//Add Route - form
router.get("/new", isLoggedIn, renderForm);

//Show route
// Update Route
//Delete Route
router
  .route("/:id")
  .get(asyncWrap(showPost))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListings,
    asyncWrap(updateListing)
  )
  .delete(isLoggedIn, isOwner, asyncWrap(deleteListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, asyncWrap(editListing));

module.exports = router;
