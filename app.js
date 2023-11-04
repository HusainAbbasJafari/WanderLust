if(process.env.NODE_ENV !="production"){
  require('dotenv').config();
};



const dburl = process.env.ATLASDB_URL;

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/user");


const store = MongoStore.create({
  mongoUrl:dburl,
  crypto:{
    secret: process.env.SECRET_CODE,
  },
  touchAfter:24*3600,
})

store.on("error",()=>{
  console.log("ERROR in MONGO SESSION STORE", err);
})

const sessionOptions = {
  store,
  secret:  process.env.SECRET_CODE,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");

const ExpressError = require("./utils/customError");
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");
const wrapAsync = require("./utils/wrapAsync");


main()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dburl);
}

//root
// app.get("/", (req, res) => {
//   res.send("Hi I am Root");
// });


//Session Config
app.use(session(sessionOptions));
//Flash config
app.use(flash());

//Note:all middlewares related to session comes after session middleware

///Passport Congiure
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; ///undefined === not logged In  and if a object returns then it means it is logged in now
  next();
});

//Listing all routes
app.use("/listing", listingRouter);

//Review Routes
app.use("/listing/:id/reviews", reviewRouter);

//auth routes
app.use("/", userRouter);

//demo user

app.get(
  "/registerUser",
  wrapAsync(async (req, res) => {
    let fakeUser = new User({
      email: "demo@gmail.com",
      username: "raju",
    });

    let registeredUser = await User.register(fakeUser, "mypassword");
    res.send(registeredUser);
  })
);

//error route
app.all("*", (req, res, next) => {
  // next(new ExpressError(404, "Page Not found"));
  throw new ExpressError(404, "Page Not found");
});

//Error Handling Middle WARE
app.use((err, req, res, next) => {
  let { statusCode = 505, message = "Something Went Wrong" } = err;
  res.status(statusCode).render("Error/error.ejs", { statusCode, message });
});

//Listening POrt
app.listen(8080, () => {
  console.log("app is listening");
});
