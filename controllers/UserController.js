const User = require("../models/UserModel");
const AppError = require("../utils/AppError")
const Review = require("../models/ReviewModel");

exports.user_register_get = (req, res, next) => {
    res.render("users/register");
};

exports.user_register_post = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = await User.register(new User({ email, username }), password);

        req.login(user, err => {
            if(err) next(err);
            req.flash("success", "Welcome to MovieNight");
            res.redirect("/");
        })

    } catch (error) {
        req.flash("error", error.message);
        res.redirect("register");
    }
}

exports.user_login_get = (req, res, next) => {
    res.render("users/login");
}

exports.user_login_post = (req, res, next) => {
    req.flash("success", "Welcome back!");
    res.redirect(req.session.originalUrl || "/");
    delete req.session.originalUrl;
}

exports.user_logout = (req, res, next) => {
    req.logout();
    req.flash("success", "Session Closed");
    res.redirect("/");
}

exports.user_profile_get = (req, res, next) => {
    res.render("users/profile");
}

exports.user_profile_post = async (req, res, next) => {
    if(req.file)
    {
        let user = await User.findById(req.user._id);
        user.avatar = req.file.path;
        await user.save();
    }
    res.redirect("/profile");
}

exports.user_is_logged_in = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.originalUrl = req.originalUrl;
        req.flash("error", "You must be signed in first");
        return res.redirect("/login");
    } else
        next();
}

exports.user_is_author = async (req, res, next) => {
    const review = await Review.findById(req.params.reviewID);
    if(!review.author.equals(req.user._id)){
        req.flash("error", "You do not have permission to do that!");
        return res.redirect("/");
    }else
        next();
}