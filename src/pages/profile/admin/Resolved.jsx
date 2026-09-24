import { useCollection } from "../../../hooks/useCollection";
import { lazy } from "react";

const ResolvedList = lazy(() => import('./ResolvedList'));

export default function Resolved() {

  const { documents: resolved } = useCollection('issue', ['isResolved', '==', true], ['createdAt', 'desc']);

  return (
    <>
    {resolved && <ResolvedList resolved={resolved} />}
    </>
  )
}