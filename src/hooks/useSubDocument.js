import { useEffect, useState } from "react";

import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export const useSubDocument = (collectionName, docId, subCollectionName, subDocId) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    //realtime data for document
    useEffect(() => {
        const ref = doc(db, `${collectionName}/${docId}/${subCollectionName}/${subDocId}`);

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            if(snapshot.data()){
                setDocument({...snapshot.data(), id: snapshot.id});
                setError(null);
            }else {
                setError('Det finnes ingen slike dokumenter');
            }
        }, (err) => {
            console.log(err.message);
            setError('Fikk ikke tak i dokumentet');
        })

        return () => unsubscribe();

    }, [collectionName, docId, subCollectionName, subDocId])

    return { document, error }
}
