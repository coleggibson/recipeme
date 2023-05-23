import React from "react";
import './styles/App.css';
import Header from "./components/Header";
import Content from "./components/Content";
import Results from "./components/Results";
// import Login from "./components/Login"
import './index.css'
import { useEffect, useState } from "react"
import { foodBackground } from "./images";

function App() {

  const [ingredients, setIngredients] = useState ([]);

  const [recipes, setRecipes] = useState([]);
  
    const [shownRecipes, setShownRecipes] = useState([]);

  return (
    <div className="App" style={{ backgroundImage:`url(${foodBackground})`, backgroundSize:'repeat-y', height:'100%'}}>
      <div id='top-content'>
        <Header/>
        {/* <Login/> */}
        <Content recipes={recipes} ingredients={ingredients} shownRecipes={shownRecipes}
        setIngredients={setIngredients} setRecipes={setRecipes} setShownRecipes={setShownRecipes}/>
      </div>
      <div id='bottom-content'>
        <Results recipes={recipes} ingredients={ingredients} shownRecipes={shownRecipes}
        setIngredients={setIngredients} setRecipes={setRecipes} setShownRecipes={setShownRecipes}/>
      </div>
    </div>
  );
}

export default App;
