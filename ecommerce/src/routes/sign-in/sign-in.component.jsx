import {
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect, 
    createUserDocumentFromAuth
 } from "../../utils/firebase.utils";

import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

    /*  run this effect when signIn component mounts for the first time 
        empty array means => run this callback function once
    */
    useEffect(() => async() => {
        /* function to call when the code returns back to our app from redirect */
        /* auth here is the only way that keep tracks of the user when we return from redirect, as it holds all the information
           for the previous sessions 
        */
        const response = await getRedirectResult(auth);
        console.log(response);
        if(response){
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }, []);

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        /* 
            response here returns a long userCredentails 
            related object that also contains access token 
        */
        console.log(response);
        const userDocRef = createUserDocumentFromAuth(response.user);
    }

    const logGoogleRedirectUser = async () => {
        const response = await signInWithGoogleRedirect();
        /* 
            response here returns a long userCredentails 
            related object that also contains access token 
        */
        console.log(response);
        const userDocRef = createUserDocumentFromAuth(response.user);
    }

    return (
        <div>
            <h1> Sign in Page </h1>
            {/*  */}
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SignUpForm />
            {/* <button onClick={logGoogleRedirectUser}>
                Sign in with Google Redirect
            </button> */}
        </div>
    )
}

export default SignIn;