import React, {useEffect, useState} from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import {BurgerContext} from "./services/burger-context";
function App() {
    const [data, setData] = useState();
    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            // get the data from the api
            const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
            // convert the data to json
            const json = await response.json();

            // set state with the result
            setData(json.data);
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);;
    }, [])
  return (
    <div className="App">
      <AppHeader />
        {data &&
            <BurgerContext.Provider value={{data, setData}}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <BurgerIngredients data={data} />
        <div style={{display: 'flex', paddingTop: '100px', paddingLeft: '40px'}} >
        <BurgerConstructor data={data} />
        </div>
      </div>
            </BurgerContext.Provider>
        }
    </div>
  );
}

export default App;
