import { Link } from "@mui/material";
import { ChevronLeft } from "@material-ui/icons";

import { useSubSubDocument } from "../hooks/useSubSubDocument";

export default function CommentCrumb({groupUrl, groupId, caseUrl, caseId, commentUrl, commentId}) {
    const { document: comment } = useSubSubDocument(groupUrl, groupId, caseUrl, caseId, commentUrl, commentId);
    let document = <></>;
    if(comment){
        document = <>
            <ChevronLeft />
            <Link href={`/${groupUrl}/${groupId}/${caseUrl}/${caseId}/${commentUrl}/${commentId}`}>Kommentar:{comment?.name}</Link>
        </>
    }
    return (
        {document}
    )
}
