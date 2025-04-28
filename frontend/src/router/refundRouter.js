import { lazy } from "react";
const RefundPage = lazy(() => import("../pages/refund/RefundPage"));

const refundRouter = () => {
  return [
    {
      path: "/refund/RefundPage",
      element: <RefundPage />,
    },
  ];
};

export default refundRouter;
