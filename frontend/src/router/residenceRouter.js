// src/router/residenceRouter.js
import { lazy } from "react";

const Residence = lazy(() => import("../pages/residence/Residence"));
const ResidenceRead = lazy(() => import("../pages/residence/ResidenceRead"));

const residenceRouter = () => {
  return [
    {
      path: "/residence",
      element: <Residence />,
    },
    {
      path: "/residence/:id",
      element: <ResidenceRead />,
    },
  ];
};

export default residenceRouter;
