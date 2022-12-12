import { useState, useContext } from "react";
// import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import {
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
 } from "../../utils/firebase.utils";
import { UserContext } from "../../contexts/user.context";

import { useEffect } from "react";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    /*  run this effect when signIn component mounts for the first time 
        empty array means => run this callback function once
    */
    // useEffect(() => async() => {
    //     /* function to call when the code returns back to our app from redirect */
    //     /* auth here is the only way that keep tracks of the user when we return from redirect, as it holds all the information
    //        for the previous sessions 
    //     */
    //     const response = await getRedirectResult(auth);
    //     console.log(response);
    //     if(response){
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }
    // }, []);

    // const logGoogleRedirectUser = async () => {
    //     const response = await signInWithGoogleRedirect();
    //     /* 
    //         response here returns a long userCredentails 
    //         related object that also contains access token 
    //     */
    //     console.log(response);
    //     const userDocRef = createUserDocumentFromAuth(response.user);
    // }

    const signInWithGoogle = async () => {
        const response = await signInWithGooglePopup();
        /* 
            response here returns a long userCredentails 
            related object that also contains access token 
        */
        console.log(response);
        createUserDocumentFromAuth(response.user);
    }
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            debugger
            setCurrentUser(user);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email.');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with email')
                    break;
                default:
                    console.error('unknown sign in error');
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        /* take item inside object and assign it to relevant 
            corresponding value:

            var myObject = {};
            myObject[key] = "value";

            so in our case, displayName: dhruvjit, email: dhr@yopmail.com and etc.
        */
        setFormFields({
            ...formFields, [name]:value
        });
    }

    return (
        <div className="sign-in-container">
            <h2> Already have an account? </h2>
            <h1> Sign In with your email and password </h1>
            <form onSubmit={handleSubmit}>
                
                {/*  */}
                <FormInput label="Email" 
                    inputOptions = {{
                        type:'email',
                        required: true,
                        onChange:handleChange, 
                        name:'email',
                        value:email
                    }}
                />
                
                {/*  */}
                <FormInput label="Password" 
                    inputOptions = {{
                        type:'password',
                        required: true,
                        onChange:handleChange, 
                        name:'password',
                        value:password
                    }}
                />
            
                {/*  */}
                <div className="buttons-container">
                    <Button type="submit">
                        Sign In
                    </Button>                
                    
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>
                        Google Sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;