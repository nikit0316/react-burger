import React, {useEffect, useState} from 'react';
import AppHeader from './components/app-header/app-header';
import {Provider} from "react-redux";
import store from "./services/reducers/store";
import {ProvideAuth} from "./utils/auth";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/homepage/homepage";
import Login from "./components/login/login";


function App() {
  return (
      <ProvideAuth>
        <BrowserRouter>
      <Provider store={store}>
    <div>
        <AppHeader />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
            </Routes>
    </div>
      </Provider>
        </BrowserRouter>
      </ProvideAuth>
  );
}

export default App;
