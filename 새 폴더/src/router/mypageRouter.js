import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;

const Mypage = lazy(() => import("../pages/mypage/MyPage"));

const mypageRouter = () => {
  return [
    {
      path: "",
      element: (
        <Suspense fallback={Loading}>
          <Mypage />
        </Suspense>
      ),
    },
  ];
};

export default mypageRouter;
