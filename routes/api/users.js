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
const Request = require("../../models/Request");

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
        height: req.body.height,
        weight: req.body.weight,
        birth: req.body.birth,
        gender: req.body.gender,
        address: req.body.address,
        org: req.body.org,
        workId: req.body.workId,
        identityCardNo: req.body.identityCardNo,
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
  // Find user by email
  User.findOne({ email: req.body.email }).then((user) => {
    // Check if user exists
    if (!user) {
      res.send("Email not found");
    }

    // Check if user is a patient
    if (user.role == "staff") {
      res.send("The user is not a patient");
    }

    // send request to patient
    const newRequest = new Request({
      from: req.body.doctorName,
      reason: "wants to add you as patient",
      comments: req.body.comments,
      userId: req.body.id,
    });

    user.messages.push(newRequest);
    user.save();
    res.send("The request has sent to the patient");
  });

  // User.findOne({ _id: req.body.id }, function (err, foundUser) {
  //   if (foundUser) {
  //     // foundUser.patients.push(userAdd);
  //     // res.send("Success!");
  //     // foundUser.save();
  //   } else {
  //     res.send("No User was found.");
  //   }
  // });
});

// ignore msg from staff
router.delete("/messages/:userAndIndex", (req, res) => {
  var user = req.params.userAndIndex.split("*")[0];
  var index = req.params.userAndIndex.split("*")[1];
  User.findOne({ _id: user }, function (err, foundUser) {
    if (foundUser) {
      foundUser.messages.splice(index, 1);
      foundUser.save();
      res.send("Success!");
    } else {
      res.send("No User was found.");
    }
  });
});

// agree msg from staff
router.put("/messages/:patientStaffIndex", (req, res) => {
  var patientId = req.params.patientStaffIndex.split("*")[0];
  var index = req.params.patientStaffIndex.split("*")[2];
  var staffId = req.params.patientStaffIndex.split("*")[1];
  var staffName = req.params.patientStaffIndex.split("*")[4];
  var patientName = req.params.patientStaffIndex.split("*")[3];
  var patientEmail = req.params.patientStaffIndex.split("*")[5];
  User.findOne({ _id: patientId }, function (err, foundUser) {
    foundUser.messages.splice(index, 1);
    foundUser.staff.push({ name: staffName, id: staffId });
    foundUser.save();
    // res.send("" + foundUser.staff.length);
  });
  User.findOne({ _id: staffId }, function (err, foundUser) {
    if (foundUser) {
      const newRequest = new Request({
        from: patientName,
        reason: "approves your add request",
        comments: "",
        userId: patientId,
      });
      foundUser.messages.push(newRequest);
      foundUser.patients.push({ name: patientName, email: patientEmail });
      foundUser.save();
      res.send("" + foundUser.patients);
    }
    // foundUser.patient.push({ name: staffName, id: staffId });
    // // foundUsers[1].staff.push(foundUsers[0]);
    // // send request to patient

    // user.messages.push(newRequest);
    // user.save();
    // res.send("Success");
  });
});

// update user info
router.post("/updateBasics", (req, res) => {
  if (
    req.body.item.toLowerCase() !== "birthday" &&
    req.body.item.toLowerCase() !== "weight" &&
    req.body.item.toLowerCase() !== "height" &&
    req.body.item.toLowerCase() !== "gender"
  ) {
    res.send("Invalid Changes");
  }
  var update = req.body.item.toLowerCase();
  if (req.body.item.toLowerCase() === "birthday") {
    update = "birth";
  }

  User.updateOne({ _id: req.body.id }, { $set: { height: 162 } });
  //   if (user) {
  //     if (update === "birth") {
  //       user.birth = req.body.changes;
  //       user.save();
  //     } else if (update === "height") {
  //       user.height = req.body.changes;
  //     } else if (update === "weight") {
  //       user.weight = req.body.changes;
  //     } else {
  //       user.gender = req.body.changes;
  //     }
  //     user.save();
  //     res.send("" + user.height);
  //   }
  // });
});

module.exports = router;
