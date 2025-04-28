// src/router/restaurantRouter.js
import { lazy } from "react";

const Restaurant = lazy(() => import("../pages/restaurant/Restaurant"));
const RestaurantRead = lazy(() => import("../pages/restaurant/RestaurantRead"));

const restaurantRouter = () => {
    return [
        {
            path: "/restaurant",
            element: <Restaurant />,
        },
        {
            path: "/restaurant/:id",
            element: <RestaurantRead />,
        },
    ];
};

export default restaurantRouter;
