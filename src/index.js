import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import './sass/main.scss'
// import './assets/main.css';
import "./index.css";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter basename='www.mgm.social/fincaFrontEnd/build/'>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
);
