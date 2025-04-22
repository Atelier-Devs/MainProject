import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;

const FindIdByName = lazy(() => import("../pages/auth/FindIdByNamePage"));
const FindPwByEmail = lazy(() => import("../pages/auth/FindPwByEmailPage"));
const ChangePW = lazy(()=> import("../pages/auth/ChangePWPage"));

const authRouter = () => {
  return [
    {
      path: "id",
      element: (
        <Suspense fallback={Loading}>
          <FindIdByName />
        </Suspense>
      ),
    },
    {
      path: "pw",
      element: (
        <Suspense fallback={Loading}>
          <FindPwByEmail />
        </Suspense>
      ),
    },
    {
      path: "changepw",
      element: (
        <Suspense fallback={Loading}>
          <ChangePW />
        </Suspense>
      ),
    },
  ];
};

export default authRouter;
