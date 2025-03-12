import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;

const Login = lazy(() => import("../pages/member/LoginPage"));
const Signup = lazy(() => import("../pages/member/SignupForm"));
const Reservation = lazy(() => import("../pages/reservation/ReservationReadPage"));
const Facilities = lazy(() => import("../pages/member/Facilities"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const LoginCompleteFacilities = lazy(() => import("../pages/member/LoginCompleteFacilities"));

const memberRouter = () => {
  return [
    {
      path: "login",
      element: (
        <Suspense fallback={Loading}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "signup",
      element: (
        <Suspense fallback={Loading}>
          <Signup />
        </Suspense>
      ),
    },
    {
      path: "reservation",
      element: (
        <Suspense fallback={Loading}>
          <Reservation />
        </Suspense>
      ),
    },
    {
      path: "facilities",
      element: (
        <Suspense fallback={Loading}>
          <Facilities />
        </Suspense>
      ),
    },
    
    {
      path: "completeFacilitiesLogin",
      element: (
        <Suspense fallback={Loading}>
          <LoginCompleteFacilities />
        </Suspense>
      ),
    },

  ];
};

export default memberRouter;
