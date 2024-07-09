import { auth } from "@/firebase/firebase";
import React, { useContext, useState } from "react";
    


import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}
export function AuthProvider({ children }) {
const [currentUser, setCurrentUser] = useState(null);
const [userLoggedIn , setUserLogged] = useState(false);
const [loading, setLoading] = useState(true);

useEffect(() => {

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user);
            setUserLogged(true);
            setLoading(false);
        } else {
            setCurrentUser(null);
            setUserLogged(false);
            setLoading(false);
        }
    });
}, []);

const value = {
    currentUser,
    userLoggedIn,
    loading 
}
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;


}
