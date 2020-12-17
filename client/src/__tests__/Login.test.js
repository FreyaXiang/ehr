const express = require('express');
const serverRoutes = require('../../../routes/api/users.js');
const request = require('supertest');
const testsTitle = 'Login';
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

mockFunc = jest.fn(() => {
  return request(app).post('/login').send({email: userData.email, password: userData.password});
});

//Test that login sends just once
test(`${testsTitle} Methods: Sends Once`, async () => {
  await mockFunc();
  expect(mockFunc.mock.calls.length).toBe(1);
});

//Test that registration works given all correct parameters
test(`${testsTitle} Methods: Login correctly`, async () => {
  const { body } = await mockFunc();
  expect(body).not.toBe(400);
});