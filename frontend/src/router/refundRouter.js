import React from "react";
import { Route } from "react-router-dom";
import RefundPage from "../pages/refund/RefundPage";

const refundRouter = () => [
  {
    path: "",
    element: <RefundPage />,
  },
];

export default refundRouter;
