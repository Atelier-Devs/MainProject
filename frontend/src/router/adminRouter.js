// src/router/adminRouter.js
import { lazy, Suspense } from "react";
import AdminComponent from "../components/admin/AdminComponent"; // 이거 추가해야 함

const AdminStatsPage = lazy(() => import("../pages/admin/AdminStatsPage"));

const Loading = <div>Loading...</div>;

const adminRouter = () => [
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <AdminComponent />
      </Suspense>
    ),
    children: [
      {
        path: "stats",
        element: (
          <Suspense fallback={Loading}>
            <AdminStatsPage />
          </Suspense>
        ),
      },
    ],
  },
];

export default adminRouter;

