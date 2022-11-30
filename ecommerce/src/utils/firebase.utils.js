/* firebase utils code that should be utilized from here e.g. firebase.json */

/* 
create app instance for us based on some initial config that allows us 
to connect firebase instance to the app instance that 
is hosted on firebase 
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1U8dLbIR2yfT5kj4hsgtb-e7ry3u7ajo",
  authDomain: "ecommerce-db-7f6b1.firebaseapp.com",
  databaseURL: "https://ecommerce-db-7f6b1.firebaseio.com",
  projectId: "ecommerce-db-7f6b1",
  storageBucket: "ecommerce-db-7f6b1.appspot.com",
  messagingSenderId: "198527188721",
  appId: "1:198527188721:web:393343a51ff4e1a3e7f350",
  measurementId: "G-DH1J6CNF0V"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

/* Start a sign in process for an unauthenticated user  */
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    /* creates a virtual path with 'users' as document name that 
        points to the unique id received from userAuth obj 
    */
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
}