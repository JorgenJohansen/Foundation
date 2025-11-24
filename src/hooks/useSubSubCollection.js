import { useEffect, useRef, useState } from "react";

import { db } from "../firebase/config";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

export const useSubSubCollection = (collectionName, docId, subCollectionName, subDocId, subSubCollectionName, _orderBy, _query) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    const o = useRef(_orderBy).current;
    const q = useRef(_query).current;
    
    useEffect(() => {
        let ref = collection(db, `${collectionName}/${docId}/${subCollectionName}/${subDocId}/${subSubCollectionName}`);

        if(q){
            ref = query(ref, where(...q));
        }
        if(o){
            ref = query(ref, orderBy(...o));
        }

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
    }, [collectionName, subCollectionName, subSubCollectionName, docId, subDocId, o, q])

    return { documents, error}
}
