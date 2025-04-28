import { lazy } from "react";

const Review = lazy(() => import("../pages/review/Review"));
const ReviewWrite = lazy(() => import("../pages/review/ReviewWrite"));
const ReviewRead = lazy(() => import("../pages/review/ReviewRead"));

const reviewRouter = () => {
    return [
        { path: "/review", element: <Review /> },
        { path: "/review/write", element: <ReviewWrite /> },
        { path: "/review/:reviewId", element: <ReviewRead /> },
    ];
};

export default reviewRouter;
