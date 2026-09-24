import { useCollection } from "../../../hooks/useCollection";
import { lazy } from "react";

const IssueList = lazy(() => import('./IssueList'));

export default function Issue() {

  const { documents: issues } = useCollection('issue', ['isResolved', '==', false], ['createdAt', 'desc']);


  return (
    <>
    {issues && <IssueList issues={issues} />}
    </>
  )
}