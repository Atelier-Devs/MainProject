import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;

const Bakery = lazy(() => import("../pages/bakery/Bakery"));

const bakeryRouter = () => {
  return [

    {
      path: "",
      element: (
        <Suspense fallback={Loading}>
          <Bakery />
        </Suspense>
      ),
    },
  ];
};

export default bakeryRouter;
