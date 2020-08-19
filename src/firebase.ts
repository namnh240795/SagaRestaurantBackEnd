const admin = require('firebase-admin');

const serviceAccount = require('../credentials/resourcemanagement-a660d-firebase-adminsdk-3gjes-154fb5ea88.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://resourcemanagement-a660d.firebaseio.com',
});

const FIREBASE_STORAGE_DB = admin.firestore();

export default FIREBASE_STORAGE_DB;
