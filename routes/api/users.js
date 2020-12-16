const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateAddPatientInput = require("../../validation/addPatient");

// Load models
const User = require("../../models/User");
const Request = require("../../models/Request");
const Appointment = require("../../models/Appointment");
const HealthRecord = require("../../models/HealthRecord");
const Prescription = require("../../models/Prescription");
const Drug = require("../../models/Drug");

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

// @route GET api/users/dashboard/:userId
// @get user info by _id
// @access Public
router.get("/dashboard/:userId", (req, res) => {
  User.findOne({ _id: req.params.userId }, function (err, foundUser) {
    if (foundUser) {
      res.send(foundUser);
    } else {
      res.send("No User was found.");
    }
  });
});

// @route GET api/users/dashboard/findPatientEmail/:email
// @get user info by email
// @access Public
router.get("/dashboard/findPatientEmail/:email", (req, res) => {
  User.findOne({ email: req.params.email }, function (err, foundUser) {
    if (foundUser) {
      res.send(foundUser);
    } else {
      res.send("" + req.params.email);
    }
  });
});

// @route POST api/users/patient
// @add patient by doctor
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
    if (user.role === "staff" || user.role === "staff_low") {
      res.send("The user is not a patient");
    }

    // send request to patient
    const newRequest = new Request({
      from: req.body.doctorName,
      reason: "wants to add you as patient",
      comments: req.body.comments,
      userId: req.body.id,
      userEmail: req.body.doctorEmail,
    });

    user.messages.push(newRequest);
    user.save();
    res.send("The request has sent to the patient");
  });
});

// @route DELETE api/users/messages/:userAndIndex
// @patients ignore msg from staff
router.delete("/messages/:userAndIndex", (req, res) => {
  var user = req.params.userAndIndex.split("*")[0];
  var index = req.params.userAndIndex.split("*")[1];
  User.findOne({ _id: user }, function (err, foundUser) {
    if (foundUser) {
      foundUser.messages.splice(index, 1);
      foundUser.save();
    } else {
      res.send("No User was found.");
    }
  });
});

// @route PUT api/users/messages/:patientStaffIndex
// @patients agree msg from staff
router.put("/messages/:patientStaffIndex", (req, res) => {
  var patientId = req.params.patientStaffIndex.split("*")[0];
  var index = req.params.patientStaffIndex.split("*")[2];
  var staffId = req.params.patientStaffIndex.split("*")[1];
  var staffName = req.params.patientStaffIndex.split("*")[4];
  var patientName = req.params.patientStaffIndex.split("*")[3];
  var patientEmail = req.params.patientStaffIndex.split("*")[5];
  var staffEmail = req.params.patientStaffIndex.split("*")[6];
  User.findOne({ _id: patientId }, function (err, foundUser) {
    foundUser.messages.splice(index, 1);
    foundUser.staff.push({ name: staffName, email: staffEmail });
    foundUser.save();
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
      foundUser.patients.push({
        name: patientName,
        email: patientEmail,
      });
      foundUser.save();
    }
  });
});

// @route POST api/users/updateBasics
// @patients update their health basics
router.post("/updateBasics", (req, res) => {
  if (
    req.body.item.toLowerCase() !== "birthday" &&
    req.body.item.toLowerCase() !== "weight" &&
    req.body.item.toLowerCase() !== "height" &&
    req.body.item.toLowerCase() !== "gender"
  ) {
    res.send("Invalid Changes");
  }
  User.findOne({ _id: req.body.id }, function (err, foundUser) {
    if (req.body.item === "birthday") {
      foundUser.birth = req.body.changes;
    } else if (req.body.item === "weight") {
      foundUser.weight = req.body.changes;
    } else if (req.body.item === "height") {
      foundUser.height = req.body.changes;
    } else if (req.body.item === "gender") {
      foundUser.gender = req.body.changes;
    }
    foundUser.save();
    res.send("Success!");
  });
});

// @route POST api/users/addHealthInfo
// @update patient allergy and disability info
router.post("/addHealthInfo", (req, res) => {
  if (
    req.body.item.toLowerCase() !== "allergy" &&
    req.body.item.toLowerCase() !== "disability"
  ) {
    res.send("Invalid Add");
  }
  User.findOne({ _id: req.body.id }, function (err, foundUser) {
    if (req.body.item === "allergy") {
      foundUser.allergies.push(req.body.changes);
    } else if (req.body.item === "disability") {
      foundUser.disabilities.push(req.body.changes);
    }
    foundUser.save();
    res.send("" + foundUser.allergies);
  });
});

// @route POST api/users/addHealthRecords
// @add patient health records
router.post("/addHealthRecords", (req, res) => {
  // validate user input
  User.findOne({ _id: req.body.id }, function (err, foundUser) {
    const newRecords = new HealthRecord({
      patientID: req.body.id,
      date: req.body.item,
      description: req.body.changes,
    });
    foundUser.health_records.push(newRecords);
    foundUser.save();
    res.send("Success!");
  });
});

// @route POST api/users/updateHealthRecords
// @update patient health records
router.post("/updateHealthRecords", (req, res) => {
  // validate input
  User.findOne({ _id: req.body.id }, function (err, foundUser) {
    var index = req.body.recordNumber - 1;
    if (req.body.item === "date") {
      foundUser.health_records[index].date = req.body.changes;
    } else if (req.body.item === "description") {
      foundUser.health_records[index].description = req.body.changes;
    }

    foundUser.save();
    res.send(
      "" + foundUser.health_records[req.body.recordNumber - 1].description
    );
  });
});

// @route POST api/users/sendAppointRequest
// @patients send appointment request to doctor
router.post("/sendAppointRequest", (req, res) => {
  User.findOne({ email: req.body.doctorEmail }, function (err, user) {
    if (user) {
      if (user.role === "patient") {
        res.send("This is not a staff!");
      }
      // send request to patient
      const newRequest = new Request({
        from: req.body.patientName,
        reason: "wants to schedule an appointment with you.",
        comments: req.body.idealTime + "\nMy Email is " + req.body.patientEmail,
        userId: req.body.id,
      });

      user.messages.push(newRequest);
      user.save();
      res.send("The request has sent to the doctor");
    } else {
      res.send("Staff not found.");
    }
  });
});

// @route POST api/users/validateAppoint
// @doctor validates the appointment
router.post("/validateAppoint", (req, res) => {
  User.findOne({ email: req.body.staffEmail }, function (err, user) {
    // send request to patient
    const newAppoint = new Appointment({
      patientEmail: req.body.patientEmail,
      doctorId: req.body.staffID,
      patientName: req.body.patientName,
      doctorName: req.body.staffName,
      date: req.body.date,
    });

    user.appointments.push(newAppoint);
    user.save();
  });

  User.findOne({ email: req.body.patientEmail }, function (err, user) {
    if (user) {
      if (!user.role === "patient") {
        res.send("Invalid patient email!");
      }
      const newAppoint = new Appointment({
        patientEmail: req.body.patientEmail,
        doctorId: req.body.staffID,
        patientName: req.body.patientName,
        doctorName: req.body.staffName,
        date: req.body.date,
      });

      user.appointments.push(newAppoint);
      user.save();
      res.send("Successfully scheduled!");
    } else {
      res.send("Patient not found.");
    }
  });
});

// @route POST api/users/prescription
// @create prescription by doctor
router.post("/prescription", (req, res) => {
  User.findOne({ email: req.body.patientEmail }, function (err, user) {
    // send request to patient
    const newPrescription = new Prescription({
      patientEmail: req.body.patientEmail,
      doctorEmail: req.body.doctorEmail,
      doctorName: req.body.doctorName,
      drugs: req.body.drugs,
      description: req.body.descriptions,
    });

    user.prescriptions.push(newPrescription);
    user.save();
    res.send("The prescription has been sent to the patient");
    // res.send("" + req.body.patientEmail);
  });
});

// @route POST api/users/endAppointment
// @end appointment by doctor
router.post("/endAppointment", (req, res) => {
  User.findOne({ email: req.body.doctorEmail }, function (err, user) {
    var itemToPop;
    user.appointments.forEach((item) => {
      if (item.patientEmail === req.body.patientEmail) {
        itemToPop = item;
      }
    });
    user.appointments.pop(itemToPop);
    user.save();
  });
  User.findOne({ email: req.body.patientEmail }, function (err, user) {
    var itemToPop;
    user.appointments.forEach((item) => {
      if (item.doctorEmail === req.body.doctorEmail) {
        itemToPop = item;
      }
    });
    user.appointments.pop(itemToPop);
    user.save();
    // res.send("The prescription has been sent to the patient");
    res.send("" + user.appointments);
  });
});

// @route GET api/users/findDrugs/:drugName
// @find drugs by drug name
router.get("/findDrugs/:drugName", (req, res) => {
  Drug.find({ name: req.params.drugName }, function (err, drugs) {
    if (drugs) {
      res.send(drugs);
    } else {
      res.send("No drugs are found");
    }
  });
});

// @route POST api/users/addDrugs
// @add drugs
router.post("/addDrugs", (req, res) => {
  const newDrug = new Drug({
    name: req.body.name,
    description: req.body.description,
    dosage: req.body.dosage,
    side_effects: req.body.sideEffects,
    price: req.body.price,
  });

  newDrug.save();
  res.send("Success");
});

module.exports = router;
