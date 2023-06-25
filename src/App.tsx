import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import css from "./App.module.css";
import { RequiredAuth } from "./hoc";
import MainLayout from "./layouts/MainLayout/MainLayout";
import E404Page from "./pages/E404Page";
import E422Page from "./pages/E422Page";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";

const App: FC = () => {
  return (
    <div className={css.Father}>
      <Routes>
        <Route path={"/login"} element={<LoginPage />} />

        <Route path={"/"} element={<MainLayout />}>
          <Route index element={<Navigate to={"login"} />} />
          <Route
            path={"orders"}
            element={
              <RequiredAuth>
                <MainPage />
              </RequiredAuth>
            }
          />
          <Route
            path={"orders/:orderId"}
            element={
              <RequiredAuth>
                <OrderDetailsPage />
              </RequiredAuth>
            }
          />
        </Route>

        <Route path={"*"} element={<E404Page />} />
        <Route path={"/422"} element={<E422Page />} />
      </Routes>
    </div>
  );
};

export { App };
