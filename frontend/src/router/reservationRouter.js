import { lazy } from "react";

const ReservationListPage = lazy(() => import("../pages/reservation/ReservationListPage"));
const ReservationReadPage = lazy(() => import("../pages/reservation/ReservationReadPage"));

const reservationRouter = () => {
  return [
    {
      path: "/reservation/manage",
      element: <ReservationListPage />,
    },
    {
      path: "/reservation/:id",
      element: <ReservationReadPage />,
    },
  ];
};

export default reservationRouter;
