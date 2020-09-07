import serviceAccount from './resourcemanagement-a660d-firebase-adminsdk-3gjes-154fb5ea88.json';

const admin = require('firebase-admin');

export const FIREBASE_FUNCTIONS = require('firebase-functions').region(
  'asia-east2',
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://resourcemanagement-a660d.firebaseio.com',
});

const FIREBASE_STORAGE_DB = admin.firestore();

export default FIREBASE_STORAGE_DB;
