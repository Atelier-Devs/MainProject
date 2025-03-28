import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;

const Kakaomap = lazy(() => import("../pages/kakaomap/Kakaomappage"));

const kakaomapRouter = () => {
  return [
    {
      path: "",
      element: (
        <Suspense fallback={Loading}>
          <Kakaomap />
        </Suspense>
      ),
    },
  ];
};

export default kakaomapRouter;
