import React, {useState} from 'react';
import data from './utils/data';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import Modal from "./components/modal/modal";
import ModalOverlay from "./components/modal/modal-overlay/modal-overlay";
import OrderDetails from "./components/modal/order-details/order-details";
import IngredientDetails from "./components/modal/ingredient-details/ingredient-details";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <BurgerIngredients data={data} />
        <div style={{display: 'flex', paddingTop: '100px', paddingLeft: '40px'}} >
        <BurgerConstructor data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
