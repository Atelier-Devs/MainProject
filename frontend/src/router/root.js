import { lazy, Suspense } from "react";
import memberRouter from "./memberRouter";
import Dashboard from "../pages/Dashboard";
const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading...</div>;

const Main = lazy(() => import("../pages/MainPage"));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "dashboard",
    element: (
      <Suspense fallback={Loading}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: "member",
    children: memberRouter(),
  },
]);

export default root;
