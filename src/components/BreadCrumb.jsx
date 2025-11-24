import { Box } from "@mui/material";

import { Link, useLocation } from 'react-router-dom'

import CaseItemCrumb from "./CaseItemCrumb";
import GroupCrumb from "./GroupCrumb";


import './BreadCrumb.css'


export default function BreadCrumb() {
    const location = useLocation();
    const locationSplit = location.pathname.split("/");
    const groupUrl = locationSplit[1];
    const groupId = locationSplit[2];
    const caseUrl = locationSplit[3];
    const caseId = locationSplit[4];

    let document = <Link className="link" variant="contained" to="/">Hjem</Link>;
    if(groupUrl && groupId){
        document = 
        <>
            <Link className="link" variant="contained" to="/">Hjem</Link>
            <GroupCrumb 
                groupUrl={groupUrl} 
                groupId={groupId} 
            />
        </>

        
    }
    if(groupUrl && groupId && caseUrl && caseId){
        document = 
        <>
            <Link className="link" variant="contained" to="/">Hjem</Link>
            <GroupCrumb 
                groupUrl={groupUrl} 
                groupId={groupId} 
            />
            <CaseItemCrumb  
                groupUrl={groupUrl} 
                groupId={groupId}  
                caseUrl={caseUrl}
                caseId={caseId}
            />
        </>
    }
    // if(groupUrl && groupId && caseUrl && caseId && commentUrl && commentId){
    //     document = 
    //     <>
    //         <Link href="/">Hjem</Link>
    //         <GroupCrumb 
    //             groupUrl={groupUrl} 
    //             groupId={groupId} 
    //         />
    //         <CaseItemCrumb  
    //             groupUrl={groupUrl} 
    //             groupId={groupId}  
    //             caseUrl={caseUrl}
    //             caseId={caseId}
    //         />
    //         <CommentCrumb
    //             groupUrl={groupUrl} 
    //             groupId={groupId}  
    //             caseUrl={caseUrl}
    //             caseId={caseId}
    //             commentUrl={commentUrl}
    //             commentId={commentId}
    //         />
    //     </>
        
    // }


  return (
    <Box marginTop={12} marginLeft={5} display="flex" alignItems="center">
        {document}
    </Box>
  )
}