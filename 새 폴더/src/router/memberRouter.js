import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;
const Login = lazy(() => import("../pages/member/LoginPage"));
const Logout = lazy(() => import("../pages/member/LogoutPage"));
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
      path: "logout",
      element: (
        <Suspense fallback={Loading}>
          <Logout />
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
  ];
};

export default memberRouter;
