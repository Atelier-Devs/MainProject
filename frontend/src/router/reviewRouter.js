import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;

// 페이지 컴포넌트 동적 로드
const ReviewPage = lazy(() => import("../pages/review/Review"));
const ReviewWriteComponent = lazy(() => import("../components/review/ReviewWriteComponent"));
const ReviewReadComponent = lazy(() => import("../components/review/ReviewReadComponent"));

const reviewRouter = () => {
    return [
        {
            index: true,  // 기본 경로 /review 에서 ReviewPage 렌더링
            element: (
                <Suspense fallback={Loading}>
                    <ReviewPage />
                </Suspense>
            ),
        },
        {
            path: "write",  // /review/write - 리뷰 작성 페이지
            element: (
                <Suspense fallback={Loading}>
                    <ReviewWriteComponent />
                </Suspense>
            ),
        },
        {
            path: ":reviewId",  // /review/:reviewId - 특정 리뷰 상세보기 페이지
            element: (
                <Suspense fallback={Loading}>
                    <ReviewReadComponent />
                </Suspense>
            ),
        },
    ];
};

export default reviewRouter;
