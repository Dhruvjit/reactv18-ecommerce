import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            alert("passwords donot match...");
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            /* user may/may not return displayName value fo us, 
               hence we send it separately to create document method just in case we dont have it.
               this will prevent it from creating document with null value
            */
            if(user){
                await createUserDocumentFromAuth(user, {displayName});
                resetFormFields();
            }else{
                alert('Problems creating user - createAuthUserWithEmailAndPassword ...');
            }
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use.');
            }else{
                console.log('error creating the user ', error.message);
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
        <div className="sign-up-container">
            <h2> Don't have an account? </h2>
            <h1> Sign up with your email and password </h1>
            <form onSubmit={handleSubmit}>
                
                {/*  */}
                <FormInput label="Display Name" 
                    inputOptions = {{
                        type:'text',
                        required: true,
                        onChange:handleChange, 
                        name:'displayName',
                        value:displayName
                    }}
                />
                
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
                <FormInput label="Confirm Password" 
                    inputOptions = {{
                        type:'password',
                        required: true,
                        onChange:handleChange, 
                        name:'confirmPassword',
                        value:confirmPassword
                    }}
                />
            
                <Button type="submit">
                    Sign Up
                </Button>
            
            </form>
        </div>
    )
}

export default SignUpForm;