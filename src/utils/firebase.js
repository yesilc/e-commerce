//import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCseHCKygAckp9Ab5NlNvdCmmWFdrrFQJE",
    authDomain: "clone-2d089.firebaseapp.com",
    projectId: "clone-2d089",
    storageBucket: "clone-2d089.appspot.com",
    messagingSenderId: "127109682237",
    appId: "1:127109682237:web:31482d52836c0f4ada8654"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db,auth};