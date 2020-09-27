import serviceAccount from './resourcemanagement-a660d-firebase-adminsdk-3gjes-154fb5ea88.json';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';

export const FIREBASE_FUNCTIONS = require('firebase-functions').region(
  'asia-east2',
);

const app = firebase.initializeApp({
  ...serviceAccount,
  databaseURL: 'https://resourcemanagement-a660d.firebaseio.com',
});

const FIREBASE_STORAGE_DB = firebase.firestore(app);

export default FIREBASE_STORAGE_DB;
