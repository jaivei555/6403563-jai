import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB4PGqU0ZeoIsqE_37je5O98mfLCPBpiDo",
    authDomain: "numhom-react.firebaseapp.com",
    projectId: "numhom-react",
    storageBucket: "numhom-react.firebasestorage.app",
    messagingSenderId: "245098132074",
    appId: "1:245098132074:web:59bbc8fff8163435455013"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);