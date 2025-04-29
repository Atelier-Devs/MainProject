import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;

const Roomservice = lazy(() => import("../pages/roomservice/Roomservice"));
const RoomserviceRead = lazy(() => import("../pages/roomservice/RoomserviceRead"));

const roomserviceRouter = () => {
    return [
        {
            path: "",
            element: (
                <Suspense fallback={Loading}>
                    <Roomservice />
                </Suspense>
            ),
        },
        {
            path: ":roomserviceId",
            element: (
                <Suspense fallback={Loading}>
                    <RoomserviceRead />
                </Suspense>
            ),
        },
    ];
};

export default roomserviceRouter;
