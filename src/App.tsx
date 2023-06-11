import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import MainPage from "./pages/MainPage";
import css from './App.module.css'
import LoginPage from "./pages/LoginPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";

const App:FC = () => {
  return (
    <div className={css.Father}>
      <Routes>

          <Route path={'/login'} element={<LoginPage/>}/>

        <Route path={'/'} element={<MainLayout/>}>
            <Route path={'/orders'} element={<MainPage/>}/>
            <Route path={'/orders/:orderId'} element={<OrderDetailsPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export {App}
