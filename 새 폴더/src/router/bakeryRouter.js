import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;

const Bakery = lazy(() => import("../pages/bakery/Bakery"));
const BakeryRead = lazy(() => import("../pages/bakery/BakeryRead"));

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
    {
      path: ":bakeryId",  
      element: (
        <Suspense fallback={Loading}>
          <BakeryRead />
        </Suspense>
      ),
    },
  ];
};

export default bakeryRouter;
