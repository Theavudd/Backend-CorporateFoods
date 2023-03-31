// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBEOXJw2e5NMHMwxh1Fz2JrWoIYK8djt7U',
  authDomain: 'corporatefood-9bd59.firebaseapp.com',
  projectId: 'corporatefood-9bd59',
  storageBucket: 'corporatefood-9bd59.appspot.com',
  messagingSenderId: '664626427524',
  appId: '1:664626427524:web:0ea69d1193a8a1b815f4d1',
  measurementId: 'G-16J37FZN34',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
