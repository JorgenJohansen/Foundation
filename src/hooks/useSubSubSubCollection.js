import { useEffect, useState } from "react";

import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useSubSubSubCollection = (collectionName, docId, subCollectionName, subDocId, subSubCollectionName, subSubDocId, subSubSubCollectionName) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const ref = collection(db, `${collectionName}/${docId}/${subCollectionName}/${subDocId}/${subSubCollectionName}/${subSubDocId}/${subSubSubCollectionName}`);
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })

            //update state
            setDocuments(results);
            setError(null)
        }, (error) => {
            console.log(error);
            setError('kunne ikke hente undersamlingen');
        })

        return () => unsubscribe();
    }, [collectionName, subCollectionName, subSubCollectionName, subSubSubCollectionName, docId, subDocId, subSubDocId])

    return { documents, error}
}
