import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;
const Login = lazy(() => import("../pages/member/LoginPage"));
const Signup = lazy(() => import("../pages/member/SignupForm"));
const Facilities = lazy(() => import("../pages/member/Facilities"));
const Reservationread = lazy(() => import("../pages/reservation/ReservationReadPage"));
const Reservationmanage = lazy(() => import("../pages/reservation/ReservationManagementPage"));


const memberRouter = () => {
  return [
    {
      path: "login",
      element: <Suspense fallback={Loading}><Login /></Suspense>,
    },
    {
      path: "signup",
      element: <Suspense fallback={Loading}><Signup /></Suspense>,
    },
    {
      path: "facilities",
      element: <Suspense fallback={Loading}><Facilities /></Suspense>,
    },
    {
      path: "reservation",
      element: <Suspense fallback={Loading}><Reservationread /></Suspense>,
    },
    // {
    //   path: "reservation",
    //   element: <Suspense fallback={Loading}><Reservationmanage /></Suspense>,
    // },
  ];
};

export default memberRouter;
