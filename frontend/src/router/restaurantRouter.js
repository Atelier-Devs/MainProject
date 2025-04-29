import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;

const Restaurant = lazy(() => import("../pages/restaurant/Restaurant"));
const RestaurantRead = lazy(() => import("../pages/restaurant/RestaurantRead"));


const RestaurantRouter = () => {
    return [

        {
            path: "",
            element: (
                <Suspense fallback={Loading}>
                    <Restaurant />
                </Suspense>
            ),
        },
        {
            path: ":restaurantId",
            element: (
                <Suspense fallback={Loading}>
                    <RestaurantRead />
                </Suspense>
            ),
        },
    ];
};

export default RestaurantRouter;
