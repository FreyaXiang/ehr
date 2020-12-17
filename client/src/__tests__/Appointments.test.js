const express = require('express');
const serverRoutes = require('../../../routes/api/users.js');
const request = require('supertest');
const testsTitle = 'User';
const app = express();
app.use('/', serverRoutes);

const patientData = new User({
  name: 'test',
  email: 'test@test.com',
  password: '123456',
  role: 'patient',
  height: '123',
  weight: '64',
  birth: '09251998',
  gender: 'M',
  address: '1555 Century Ave',
  org: 'None',
  identityCardNo: '12345'
});

const staffData = new User({
  name: 'testDoc',
  email: 'test@testDoc.com',
  password: '123456',
  role: 'staff',
  height: '123',
  weight: '64',
  birth: '09251998',
  gender: 'M',
  address: '1555 Century Ave',
  org: 'None',
  identityCardNo: '12345'
});

//Test that an appointment request was successfully sent

//Test that an appointment was successfully received

//Delete message