/* eslint-disable react/prop-types */
import { ChevronLeft } from "@material-ui/icons";

import { Link } from "react-router-dom";

import { useDocument } from "../hooks/useDocument";


export default function GroupCrumb({groupUrl, groupId}) {
    const { document: group } = useDocument(groupUrl, groupId);
    return (
        <>
            <ChevronLeft />
            <Link className="link" to={`/${groupUrl}/${groupId}`}>Gruppe: {group?.name}</Link>
        </>
    )
}
