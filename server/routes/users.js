const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser").json();
const passport = require("passport");
const User = require("../models/user");
require("../config/passport");

router.route("/register").get(async (request, response) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      return response.status(400).send("Admin user already exists!");
    }
    const user = new User();
    user.email = process.env.DANIK_USERNAME;
    user.setPassword(process.env.DANIK_PASSWORD);
    await user.save();
    return response.status(200).json("Admin user generated!");
  } catch (error) {
    return response.status(400).send(error);
  }
});

router.route("/login").post(bodyParser, (request, response) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return response.status(400).send(error);
    }
    if (!user) {
      return response.status(401).json(info);
    }
    const tokenSignature = user.generateJwt();
    return response.status(200).json(tokenSignature);
  })(request, response);
});

module.exports = router;
