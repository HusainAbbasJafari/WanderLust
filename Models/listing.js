const mongoose = require("mongoose");
const link =
  "https://media.istockphoto.com/id/1194408359/photo/india-flag-flying-high-blue-sky-tricolour-flag.jpg?s=612x612&w=0&k=20&c=rXKTUJ0yNr_LCBsJ83CiJamMuF1LAgFO87ShkP1E-bA=";
const Review = require("./reviews");
const User = require("./user")

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url:String,
    filename:String,
    // type: String,
    // default: link,

    // set: (v) => (v === "" ? link : v),
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  owner:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

//Mongoose MiddleWre for deletion of lising completely

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
