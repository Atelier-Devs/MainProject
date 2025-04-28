// src/router/adminRouter.js

import { Navigate } from "react-router-dom";
import AdminComponent from "../components/admin/AdminComponent";
import AdminStatsPage from "../pages/admin/AdminStatsPage";
import PaymentListAdminPage from "../components/admin/PaymentListAdminPage";
import RefundApprovalPage from "../components/admin/RefundApprovalPage";
import ReservationListPageAdmin from "../components/admin/ReservationListPageAdmin";

const adminRouter = () => [
  {
    path: "",
    element: <AdminComponent />,
    children: [
      {
        index: true,
        element: <Navigate to="stats" />, 
      },
      {
        path: "stats",
        element: <AdminStatsPage />,
      },
      {
        path: "payments",
        element: <PaymentListAdminPage />,
      },
      {
        path: "refunds",
        element: <RefundApprovalPage />,
      },
      {
        path: "reservations",
        element: <ReservationListPageAdmin />,
      },
    ],
  },
];

export default adminRouter;
