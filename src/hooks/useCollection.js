import { useState, useEffect, useRef } from "react";

import { db } from "../firebase/config";

import { collection, onSnapshot, query, where, orderBy} from "firebase/firestore";
export const useCollection = (collectionName, _query, _orderBy, _query2) => {
    const [documents, setDocuments] = useState([]);

    const q = useRef(_query).current;
    const q2 = useRef( _query2).current;
    const o = useRef(_orderBy).current;
   

    useEffect(() => {
        let ref = collection(db, collectionName);

        if(q){
            ref = query(ref, where(...q));
        }
        if(q2){
            ref = query(ref, where(...q2));
        }

        if(o){
            ref = query(ref, orderBy(...o));
        }

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id});
            });
            setDocuments(results);
        });

        return () => unsubscribe();
    }, [collectionName , q, q2, o]);

    return { documents }
}
