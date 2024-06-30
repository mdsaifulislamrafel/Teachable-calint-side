/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, updateProfile, GithubAuthProvider } from "firebase/auth";
import auth from "../Firebase/firebase.congig";
import useAxiosPublic from "../hookes/useAxiosPublic";


export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const axiosPublic = useAxiosPublic();

    const updateprofile = async (name, photo) => {
        try {
            setLoading(true);
            await updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
            setReload(false);
            setLoading(false);
            return;

        } catch (error) {
            setLoading(false);
            return;

        }
    };
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }




    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const provider = new GoogleAuthProvider();

    const signGoogle = () => {

        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    const gitProvider = new GithubAuthProvider()

    const signGithub = () => {
        setLoading(true)
        return signInWithPopup(auth, gitProvider);
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                // get token and store client side for local storage
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('token', res.data.token);
                            setLoading(false);
                        }
                    })

            } else {
                // TODO: remove the token client side for local storage
                localStorage.removeItem('token');
                setLoading(false);
            }

        })
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        reload,
        logOut,
        signIn,
        signGoogle,
        updateprofile,
        signGithub

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;