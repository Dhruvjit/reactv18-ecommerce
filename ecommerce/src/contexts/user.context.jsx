import {createContext, useState, useEffect} from 'react';
import { onAuthStateChangedListener } from '../utils/firebase.utils';
import { createUserDocumentFromAuth } from "../utils/firebase.utils";

/* as the actual value you want to access */
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const UserProvider = ({children}) => {
    
    /* this provider enables any component to access the value inside useState */
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    /* listener that gets invoked on component mount & keeps track of the auth status e.g. 
        was user signed in before, signed out and so on 
    */
    /* we will use this listener to centralize all auth based changes from firebase into 
        one listener 
    */
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, [])

    /* we should be able to call setter/get methods mention above and it should be provided to any component that is nested inside provider value */
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>

}