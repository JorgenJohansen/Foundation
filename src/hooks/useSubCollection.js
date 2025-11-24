import { useEffect, useRef, useState } from "react";

import { db } from "../firebase/config";
import { collection, limitToLast, onSnapshot, orderBy, query, where } from "firebase/firestore";

export const useSubCollection = (collectionName, docId, subCollectionName, _orderBy, _query, _limit) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    
    const q = useRef(_query).current;
    const o = useRef(_orderBy).current;
    const limit = useRef(_limit).current;
    
    useEffect(() => {
        let ref = collection(db, `${collectionName}/${docId}/${subCollectionName}`)

        if(q){
            ref = query(ref, where(...q));
        }

        if(o){
            ref = query(ref, orderBy(...o));
        }

        if(limit){
            ref = query(ref, limitToLast(limit));
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
            setError('Kunne ikke hente undersamlingen');
        })

        return () => unsubscribe();
    }, [collectionName, subCollectionName, docId, q, o, limit])

    return { documents, error}
}
