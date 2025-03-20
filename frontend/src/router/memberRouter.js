import { lazy, Suspense } from "react";
import ReservationReadComponent from "../components/reservation/ReservationReadComponent";

const Loading = <div>Loading...</div>;
const Login = lazy(() => import("../pages/member/LoginPage"));
const Signup = lazy(() => import("../pages/member/SignupForm"));
const Facilities = lazy(() => import("../pages/member/Facilities"));

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
      path: "facilities",
      element: (
        <Suspense fallback={Loading}>
          <Facilities />
        </Suspense>
      ),
    },
    {
      path: "reservation/manage",
      element: (
        <Suspense fallback={Loading}>
          <ReservationReadComponent />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
