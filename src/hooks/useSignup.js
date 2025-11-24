import { useState, useEffect } from 'react';

import { auth, db, timestamp } from "../firebase/config";
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from 'firebase/auth';

import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    
    const signup = async (email, password, displayName, tos) => {
        setError(null);
        setIsPending(true);
        await createUserWithEmailAndPassword(auth, email, password).then(async(res) => {
            await updateProfile(res.user, {displayName});
            const uid = res.user.uid;

            const docRef = doc(db, 'brukere', uid);

            await setDoc(docRef, {
                uid,
                displayName,
                email,
                acceptedTos: tos,
                createdAt: timestamp.fromDate(new Date()),
            });

            //dispatch login action
            dispatch({type: 'LOGIN', payload: res.user});

            if(!isCancelled){
                setIsPending(false);
                setError(null);
            }
        }).catch(err => {
            if(!isCancelled){
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        });
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return { error, isPending, signup}
}
