import React, {useEffect, useState} from 'react';
import AppHeader from './components/app-header/app-header';
import {Provider} from "react-redux";
import store from "./services/reducers/store";
import {ProvideAuth} from "./utils/auth";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Registration from "./components/registration/registration";
import ForgotPassword from "./components/forgot-password/forgot-password";
import ResetPassword from "./components/reset-password/reset-passwrod";
import Profile from "./components/profile/profile";
import {ProtectedRouteElement} from "./components/ProtectedRouteElement";
import IngredientCard, {IngredientModal} from "./components/burger-ingredients/ingredient-card/ingredient-card";


function App() {
    const location = useLocation()
    const [previousLocation, setPreviousLocation] = useState(location)

    useEffect(() => {
        if (!(location.state && location.state.modal)) {
            setPreviousLocation(location);
        }
    },[location])

    const isModal = (
        location.state &&
        location.state.modal &&
        previousLocation !== location
    );

    return (
      <Provider store={store}>
          <ProvideAuth>
          <div>
        <AppHeader />
            <Routes location={isModal ? previousLocation : location}>
                <Route path="/" element={<ProtectedRouteElement element={<HomePage />} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<ProtectedRouteElement element={<Profile />} />} />
                <Route path="/ingredients/:id" element={<IngredientModal />} />
            </Routes>
        {isModal ? (
            <Routes>
                <Route path="/ingredients/:id" element={<ProtectedRouteElement element={<IngredientModal />} /> } />
            </Routes>
        ) : null}
    </div>
              </ProvideAuth>
      </Provider>
  );
}

export default App;
