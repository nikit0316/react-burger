import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {Provider} from "react-redux";
import store from "./services/reducers/store";


function App() {
  return (
      <Provider store={store}>
    <div className="App">
        <DndProvider backend={HTML5Backend}>
        <AppHeader />
      <div className={styles.menuContainer}>
        <BurgerIngredients />
        <div className={styles.burgerConstructorContainer} >
        <BurgerConstructor />
        </div>
      </div>
        </DndProvider>
    </div>
      </Provider>
  );
}

export default App;
