import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import TodayPage from './pages/today/TodayPage';
import TommorowPage from './pages/tommorow/TommorowPage';
import DaysPage from './pages/five-days/DaysPage';
import { Provider } from 'react-redux';
import { store } from './utils/redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<TodayPage />}></Route>
          <Route path='tommorow' element={<TommorowPage />}></Route>
          <Route path='days' element={<DaysPage />}></Route>
          <Route path="*" element={<TodayPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>

);
