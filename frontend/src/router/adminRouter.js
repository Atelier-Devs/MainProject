// src/router/adminRouter.js
import { lazy, Suspense } from "react";
import AdminComponent from "../components/admin/AdminComponent";

// lazy import
const AdminStatsPage = lazy(() => import("../pages/admin/AdminStatsPage"));

const PaymentListAdminPage = lazy(() =>
  import("../components/admin/PaymentListAdminPage")
);
const RefundApprovalPage = lazy(() =>
  import("../components/admin/RefundApprovalPage")
);
const ReservationListPageAdmin = lazy(() =>
  import("../components/admin/ReservationListPageAdmin")
);

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
        index: true,
        element: (
          <Suspense fallback={Loading}>
            <AdminStatsPage />
          </Suspense>
        ),
      },
      {
        path: "payments",
        element: (
          <Suspense fallback={Loading}>
            <PaymentListAdminPage />
          </Suspense>
        ),
      },
      {
        path: "refunds",
        element: (
          <Suspense fallback={Loading}>
            <RefundApprovalPage />
          </Suspense>
        ),
      },
      {
        path: "reservations",
        element: (
          <Suspense fallback={Loading}>
            <ReservationListPageAdmin />
          </Suspense>
        ),
      },
      {
        path: "stats",
        element: (
          <Suspense fallback={Loading}>
            <AdminStatsPage />
          </Suspense>
        ),
      },
      // {
      //   path: "admin",
      //   children: adminRouter(),
      // },
    ],
  },
];

export default adminRouter;
