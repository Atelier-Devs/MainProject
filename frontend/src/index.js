import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// 🔹 Redux
import { Provider } from "react-redux";
import store from "./store"; // 너의 실제 store 경로 확인

// 🔹 React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);