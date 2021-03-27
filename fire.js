import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAPBZQCVexA2wIbSmAe3oz3gi3ofAUE3rc",
  authDomain: "brothersconstructiontsa.firebaseapp.com",
  databaseURL: "https://brothersconstructiontsa-default-rtdb.firebaseio.com",
  projectId: "brothersconstructiontsa",
  storageBucket: "brothersconstructiontsa.appspot.com",
  messagingSenderId: "1079256194689",
  appId: "1:1079256194689:web:a439d855a27d8def503780",
  measurementId: "G-BW3LX05CT4"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;