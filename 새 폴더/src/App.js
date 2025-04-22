import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import rootRouter from "./router/root"; // 라우터 설정
import { Provider } from "react-redux";
import store from "./store"; // Redux store 추가

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={rootRouter} />
    </Provider>
  );
};

export default App;
