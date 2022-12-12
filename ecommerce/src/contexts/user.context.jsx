import { useState } from 'react';
import {createContext} from 'react';

/* as the actual value you want to access */
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const UserProvider = ({children}) => {
    
    /* this provider enables any component to access the value inside useState */
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    /* we should be able to call setter/get methods mention above and it should be provided to any component that is nested inside provider value */
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>

}