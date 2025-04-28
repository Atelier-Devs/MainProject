import { lazy } from "react";

const PaymentPage = lazy(() => import("../pages/payment/PaymentPage"));
const RefundPage = lazy(() => import("../pages/refund/RefundPage"));

const paymentRouter = () => {
  return [
    {
      path: "/payment",
      element: <PaymentPage />,
    },
    {
      path: "/payment/refund",
      element: <RefundPage />,
    },
  ];
};

export default paymentRouter;
