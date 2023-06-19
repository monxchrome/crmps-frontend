import React, {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import MainPage from "./pages/MainPage";
import css from './App.module.css'
import LoginPage from "./pages/LoginPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import {RequiredAuth} from "./hoc/RequiredAuth";

const App:FC = () => {
  return (
    <div className={css.Father}>
      <Routes>

          <Route path={'/login'} element={<LoginPage/>}/>

        <Route path={'/'} element={<MainLayout/>}>
            <Route index element={<Navigate to={'login'}/>}/>
            <Route path={'orders'} element={
                <RequiredAuth>
                    <MainPage/>
                </RequiredAuth>
            }/>
            <Route path={'orders/:orderId'} element={
                <RequiredAuth>
                    <OrderDetailsPage/>
                </RequiredAuth>
            }/>
        </Route>
      </Routes>
    </div>
  );
}

export {App}
