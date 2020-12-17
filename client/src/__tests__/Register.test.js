const express = require('express');
const serverRoutes = require('../../../routes/api/users.js');
const request = require('supertest');
const testsTitle = 'Register';
const app = express();
app.use('/', serverRoutes);

const userData = new User({
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

//Test that registration sends just once
test(`${testsTitle} Methods: Sends Once`, async () => {
  mockFunc = jest.fn((response) => {
    request(app).post('/register').send(userData);
  });
  await mockFunc();
  expect(mockFunc.mock.calls.length).toBe(1);
});

//Test that registration works given all correct parameters
test(`${testsTitle} Methods: Register correctly`, async () => {
  const { body } = await request(app).post('/register').send(userData);
  expect(body).not.toBe(400);
});

//Test that a user registration doesn't overwrite existing user
test(`${testsTitle} Methods: Check overwrite`, async () => {
  const { status }  = await request(app).post('/register').send(userData);
  expect(status).toBe(400);
});

//Test the existence of a user
test(`${testsTitle} Methods: Check if user exists`, async () => {
  const { body } = await request(app).get(`/dashboard/findPatientEmail/${userData.email}`);
  expect(body).toBe(userData);
});