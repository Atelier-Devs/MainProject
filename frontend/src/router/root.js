import { lazy, Suspense } from "react";

import memberRouter from "./memberRouter";
const { createBrowserRouter } = require("react-router-dom");
//서버에서 데이터를 가져오는 중이다
const Loading = <div>Loading</div>;
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
    path: "/api/atelier",
    children: memberRouter(),
  },
]);
export default root;
