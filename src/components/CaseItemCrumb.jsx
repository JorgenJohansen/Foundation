/* eslint-disable react/prop-types */

import { ChevronLeft } from "@material-ui/icons";

import { Link } from "react-router-dom";

import { useSubDocument } from "../hooks/useSubDocument";

const categoryMap = new Map([
    ['saker', 'Sak:'],
    ['todos', 'Todo:'],
    ['prosjekter', 'Prosjekt:'],
]);

export default function CaseItemCrumb({groupUrl, groupId, caseUrl, caseId}) {
    const { document: caseItem } = useSubDocument(groupUrl, groupId, caseUrl, caseId);
    return (
        <>
            <ChevronLeft />
            <Link className="link" to={`/${groupUrl}/${groupId}/${caseUrl}/${caseId}`}>{categoryMap.get(caseUrl)} {caseItem?.name}</Link>
        </>
    )
}
