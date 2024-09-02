const { initializeApp } = require('firebase/app');
const config = require('./config/config.js');
const { getFirestore } = require('firebase/firestore');

const firebase = initializeApp(config.firebaseConfig);
const db = getFirestore(firebase, config.firebaseConfig.databaseId);

module.exports = db;