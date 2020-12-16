# Re-medi

An Electronic Health Record System Project for CSCI-SHU 410 Software Engineering\
By Andrew Lee, Andrew Liu, Xin Xiang, Zane Fadul\

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

## Detailed documentation for our project

Link here:
