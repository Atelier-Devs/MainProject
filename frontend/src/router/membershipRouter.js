import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;

const Membership = lazy(() => import("../pages/membership/Membership"));

const membershipRouter = () => {
  return [
    {
      path: "",
      element: (
        <Suspense fallback={Loading}>
          <Membership />
        </Suspense>
      ),
    },
  ];
};

export default membershipRouter;
