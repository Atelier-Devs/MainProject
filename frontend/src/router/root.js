import { lazy, Suspense } from "react";
import Dashboard from "../pages/Dashboard";
import memberRouter from "./memberRouter";
import residenceRouter from "./residenceRouter";
import restaurantRouter from "./restaurantRouter";
import bakeryRouter from "./bakeryRouter";
import roomserviceRouter from "./roomserviceRouter";
import reviewRouter from "./reviewRouter";
import reservationRouter from "./reservationRouter";
import mypageRouter from "./mypageRouter";
import kakaomapRouter from "./kakaomapRouter";
import paymentRouter from "./paymentRouter";
import membershipRouter from "./membershipRouter";
import refundRouter from "./refundRouter";

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
  {
    path: "residence",
    children: residenceRouter(),
  },
  {
    path: "restaurant",
    children: restaurantRouter(),
  },
  {
    path: "bakery",
    children: bakeryRouter(),
  },
  {
    path: "roomservice",
    children: roomserviceRouter(),
  },
  {
    path: "review",
    children: reviewRouter(),
  },
  {
    path: "reservation",
    children: reservationRouter(),
  },
  {
    path: "mypage",
    children: mypageRouter(),
  },
  {
    path: "payment",
    children: paymentRouter(),
  },
  {
    path: "map",
    children: kakaomapRouter(),
  },
  {
    path: "membership",
    children: membershipRouter(),
  },
  {
    path: "refund",
    children: refundRouter(),
  },
]);

export default root;
