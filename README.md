# Re-medi

An Electronic Health Record System Project for CSCI-SHU 410 Software Engineering\
By Andrew Lee, Andrew Liu, Xin Xiang, Zane Fadul

## Before running our app

Make sure to add your own `MONGOURI` from your mongodb database in `config/keys.js`.

```javascript
module.exports = {
  mongoURI: "YOUR_MONGO_URI_HERE",
  secretOrKey: "secret",
};
```

## How to run our app

```javascript
// Install dependencies for server & client
npm install && npm run client-install

// Run client & server with concurrently
npm run dev

// Server runs on http://localhost:5000 and client on http://localhost:3000
```

## Directory guide

We are following the MVC project architecture.\
M: model folder\
 The model folder contains all the mongodb database schema.\
V: client folder\
 The client folder contains all the front end rendering files, including Redux files, React components, etc.\
C: routes/api folder\
 This folder contains users.js, which is the API file of our project.

Other folders:\
validation folder: contains all the files validating user input\
config folder: contains configuration files like database keys

## Detailed documentation

Link here:
https://docs.google.com/document/d/12W-CvE5EfX01-1NETqMfSdJqNhf0vWcoSIt3ZMso_gM
