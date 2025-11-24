import { useEffect, useState } from "react";

import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export const useDocument = (collectionName, docId) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    //realtime data for document
    useEffect(() => {
        let docRef = doc(db, collectionName, docId);

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if(snapshot.data()){
                setDocument({...snapshot.data(), id: snapshot.id});
                setError(null);
            }else {
                setError('Det finnes ingen slike dokumenter');
            }
        }, (err) => {
            console.log("err.message: ", err.message);
            setError('Kunne ikke få tak i dokumentet');
        })

        return () => unsubscribe();

    }, [collectionName, docId])

    return { document, error }
}
