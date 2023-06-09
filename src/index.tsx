import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from "./App";
import {NextUIProvider} from "@nextui-org/react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {setupStore} from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = setupStore();

root.render(
    <Provider store={store}>
        <NextUIProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </NextUIProvider>
    </Provider>
);
