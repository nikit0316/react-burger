import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import {BurgerContext} from "./services/burger-context";
import {BURGER_API_URL} from "./utils/data";
function App() {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${BURGER_API_URL}/ingredients`);
            if (!response.ok) {
                await Promise.reject(response)
                throw new Error('Ответ сети был не ok.');
            } else {
                const json = await response.json();

                setData(json.data);
            }
        }

        fetchData()
            .catch(console.error);;
    }, [])
  return (
    <div className="App">
      <AppHeader />
        {data &&
            <BurgerContext.Provider value={{data, setData}}>
      <div className={styles.menuContainer}>
        <BurgerIngredients data={data} />
        <div className={styles.burgerConstructorContainer} >
        <BurgerConstructor data={data} />
        </div>
      </div>
            </BurgerContext.Provider>
        }
    </div>
  );
}

export default App;
