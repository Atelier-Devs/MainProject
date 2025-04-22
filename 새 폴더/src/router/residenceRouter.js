import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;

const Residence = lazy(() => import("../pages/residence/Residence"));
const ResidenceRead = lazy(() => import("../pages/residence/ResidenceRead"));

const residenceRouter = () => {
  return [
    {
      path: "",
      element: (
        <Suspense fallback={Loading}>
          <Residence />
        </Suspense>
      ),
    },
    {
      path: ":id",
      element: (
        <Suspense fallback={Loading}>
          <ResidenceRead />
        </Suspense>
      ),
    },
  ];
};

export default residenceRouter;
