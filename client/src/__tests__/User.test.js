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

mockFunc = jest.fn(() => {
  return request(app).post('/login').send({email: staffData.email, password: staffData.password});
});

//Test that login sends just once
test(`${testsTitle} Methods: Sends Once`, async () => {
  await mockFunc();
  expect(mockFunc.mock.calls.length).toBe(1);
});

//Test that login works given all correct parameters
test(`${testsTitle} Methods: Login correctly`, async () => {
  const { body } = await mockFunc();
  expect(body).not.toBe(400);
});

//Test the deletion of a user
test(`${testsTitle} Methods: Delete user`, async () => {
  
})