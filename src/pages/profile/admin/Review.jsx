import { useCollection } from "../../../hooks/useCollection";
import { lazy } from "react";

const ReviewList = lazy(() => import('./ReviewList'));

export default function Review() {

  const { documents: reviews } = useCollection('review', null, ['createdAt', 'desc']);

  return (
    <>
    {reviews && <ReviewList reviews={reviews} />}
    </>
  )
}