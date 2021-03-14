const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
const ejsMate = require("ejs-mate");
const AppError = require("./utils/AppError");
const User = require("./models/UserModel");
const app = express();
const db = mongoose.connection;

require("dotenv").config();

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, "public")));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const MONGODB = process.env.MONGODB;
const PORT = process.env.PORT;

mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log(`Database connected on : ${MONGODB}`);
})

app.listen(PORT, () => {
    console.log(`Listening on Port : ${PORT}`);
})

app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.use("/", require("./routes/IndexRouter"));
app.use("/", require("./routes/UserRouter"));
app.use("/movies", require("./routes/MoviesRouter"));
app.use("/m", require("./routes/MovieRouter"));
app.use("/u", require("./routes/UtilsRouter"));
app.use("/s", require("./routes/SearchRouter"));

app.all("*", (req, res, next) => {
    next(new AppError("Page not found", 404));
})

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.render("error", { err });
})