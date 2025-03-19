import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;

const ReviewPage = lazy(() => import("../pages/ReviewPage"));
const ReviewReadComponent = lazy(() => import("../components/review/ReviewReadComponent"));
const ReviewWriteComponent = lazy(() => import("../components/review/ReviewWriteComponent"));

const reviewRouter = () => {
    return [
        {
            path: "",
            element: (
                <Suspense fallback={Loading}>
                    <ReviewPage />
                </Suspense>
            ),
        },
        {
            path: "write",
            element: (
                <Suspense fallback={Loading}>
                    <ReviewWriteComponent />
                </Suspense>
            ),
        },
        {
            path: ":reviewId",
            element: (
                <Suspense fallback={Loading}>
                    <ReviewReadComponent />
                </Suspense>
            ),
        },
    ];
};

export default reviewRouter;
