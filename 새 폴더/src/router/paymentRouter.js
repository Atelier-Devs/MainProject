// src/routers/paymentRouter.js

import { lazy } from "react";

const PaymentPage = lazy(() => import("../pages/payment/PaymentPage"));

const paymentRouter = () => [
  {
    path: ":id",
    element: <PaymentPage />,
  },
];

export default paymentRouter;
