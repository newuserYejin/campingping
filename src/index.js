import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import ScrollRestoration from "./components/ScrollRestoration/ScrollRestoration";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollRestoration />
        <CssBaseline />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
