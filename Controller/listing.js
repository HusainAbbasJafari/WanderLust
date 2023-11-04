const Listing = require("../Models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res, next) => {
  const alllistings = await Listing.find();
  res.render("listings/index.ejs", { alllistings });
};

module.exports.renderForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.postListing = async (req, res, next) => {

 let response =  await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
    .send();
    
   

   
    

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id; ///we have user prop binside req because of passport
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "new listing created");
  res.redirect("/listing");
};

module.exports.showPost = async (req, res) => {
  let { id } = req.params;
  let single = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!single) {
    req.flash("error", "listing you searched for does not exist");
    return res.redirect("/listing");
  }
  res.render("listings/show.ejs", { single });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let single = await Listing.findById(id);

  if (!single) {
    req.flash("error", "listing you searched for does not exist");
    return res.redirect("/listing");
  }
  let originalImageUrl = single.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_300,h_200");
  res.render("listings/edit.ejs", { single, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing got updated");
  res.redirect(`/listing/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing got deleted");
  res.redirect("/listing");
};
