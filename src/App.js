import React from "react";
import './styles/App.css';
import Header from "./components/Header";
import Content from "./components/Content";
import Results from "./components/Results";
import './index.css'
import { useEffect, useState } from "react"

function App() {

  const [ingredients, setIngredients] = useState ([]);

  const [recipes, setRecipes] = useState([
      {title: 'Cornmeal mix for a big family', link:'www.cornmeal.com', id:123},
      {title: 'Carrot soufle for the big fam on board',link:'www.carrot.com', id:125},
  ]);
  
    const [shownRecipes, setShownRecipes] = useState([]);

  return (
    <div className="App">
      <Header/>
      <Content recipes={recipes} ingredients={ingredients} shownRecipes={shownRecipes}
      setIngredients={setIngredients} setRecipes={setRecipes} setShownRecipes={setShownRecipes}/>
      <Results recipes={recipes} ingredients={ingredients} shownRecipes={shownRecipes}
      setIngredients={setIngredients} setRecipes={setRecipes} setShownRecipes={setShownRecipes}/>
    </div>
  );
}

export default App;
