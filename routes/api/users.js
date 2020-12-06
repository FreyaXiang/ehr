const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateAddPatientInput = require("../../validation/addPatient");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// get user info by _id
router.get("/dashboard/:userId", (req, res) => {
  User.findOne({ _id: req.params.userId }, function (err, foundUser) {
    if (foundUser) {
      res.send(foundUser);
    } else {
      res.send("No User was found.");
    }
  });
});

// add patient
router.post("/patient", (req, res) => {
  // Form validation

  const { errors, isValid } = validateAddPatientInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // const email = req.body.email;
  var userAdd;
  // Find user by email
  User.findOne({ email: req.body.email }).then((user) => {
    userAdd = user;
    // Check if user exists
    if (!user) {
      res.send("Email not found");
    }

    // Check if user is a patient
    if (user.role == "staff") {
      res.send("The user is not a patient");
    }
  });

  User.findOne({ _id: req.body.id }, function (err, foundUser) {
    if (foundUser) {
      foundUser.patients.push(userAdd);
      res.send("Success!");
      foundUser.save();
    } else {
      res.send("No User was found.");
    }
  });
});

module.exports = router;
