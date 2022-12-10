import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import "./authentication.styles.scss";

const SignIn = () => {
    return (
        <div className="authentication-container">
            {/* <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button> */}
            <SignInForm />
            <SignUpForm />
            {/* <button onClick={logGoogleRedirectUser}>
                Sign in with Google Redirect
            </button> */}
        </div>
    )
}

export default SignIn;