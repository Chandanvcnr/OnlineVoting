import firebase from "firebase";  
  
var firebaseConfig = {
    apiKey: "AIzaSyCIVnNKy89-QOvKaWDePwc9Dzw9tTBzk4Q",
    authDomain: "onlinevotingtest.firebaseapp.com",
    projectId: "onlinevotingtest",
    storageBucket: "onlinevotingtest.appspot.com",
    messagingSenderId: "791735927549",
    appId: "1:791735927549:web:c2269e7e7a506f0ac13494",
    measurementId: "G-ND4H5N61HK"
  };
  
// Initialize Firebase  
var fireDb = firebase.initializeApp(firebaseConfig);  
  
export default fireDb.database().ref();  