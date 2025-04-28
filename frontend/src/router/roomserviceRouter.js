import { lazy } from "react";

const Roomservice = lazy(() => import("../pages/roomservice/Roomservice"));
const RoomserviceRead = lazy(() => import("../pages/roomservice/RoomserviceRead"));

const roomserviceRouter = () => {
    return [
        {
            path: "/roomservice",
            element: <Roomservice />,
        },
        {
            path: "/roomservice/:id",
            element: <RoomserviceRead />,
        },
    ];
};

export default roomserviceRouter;
