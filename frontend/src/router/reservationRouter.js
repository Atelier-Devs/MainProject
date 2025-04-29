import { lazy, Suspense } from "react";
const Loading = <div>Loading...</div>;
const ReservationRead = lazy(() => import("../pages/reservation/ReservationReadPage"));
const ReservationList = lazy(() => import("../pages/reservation/ReservationListPage"));

const reservationRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ReservationList />
        </Suspense>
      ),
    },
    {
      path: "read/:userId",
      element: (
        <Suspense fallback={Loading}>
          <ReservationRead />
        </Suspense>
      ),
    },
  ];
};

export default reservationRouter;
