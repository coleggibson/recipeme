import { foodBackground } from "../images";
import { useEffect, useState } from "react"
import uniqid from "uniqid";
import '../index.css'
import '../styles/Content.css'

//add count to ingredients
//add random recipe
const Content = ({recipes, ingredients, ShownRecipes, setIngredients, setRecipes, setShownRecipes}) => {
    
    const capitalize = (string) => {
        let lowercaseResult = string.toLowerCase();
        let capitalizedResult = lowercaseResult.charAt(0).toUpperCase() + lowercaseResult.slice(1);
        return capitalizedResult
    }

    const addIngredient = (ingredient) => {
        let value = document.getElementById('name').value
        let ingredientObject = {}
        ingredientObject.name = capitalize(ingredient)
        
        if ( value.trim() !== ''){
        ingredientObject.id = uniqid()
        ingredients.push(ingredientObject)
        setIngredients([...ingredients])
        combineIngredients(ingredients)
        document.getElementById('name').value = ''
        
        }
         
        console.log(ingredients)
    }

    const combineIngredients = (ingredients) => {
        let urlIngredientArray = '';
        for (let i =0; i < ingredients.length; i++) {
            urlIngredientArray += ingredients[i].name + ',+'
        }

        let newUrl = 'https:api.spoonacular.com/recipes/findByIngredients?apiKey=5a9eaad9b6f54ec5adca1041255d83f2&ingredients=' + urlIngredientArray.toLowerCase() + '&number=3' ; 
        
        fetch(newUrl) 
    
        .then(function(result) {
            return result.json();
        })
        

        .then(function(result) {
            getRecipeUrl(result)
            pullMissingIngredients(result)
            setRecipes([...result])
            
            console.log(result)
        });
        
    }

    
    const getRecipeUrl = (array) => {
        for (let i = 0; i < array.length; i++){
        
        let recipeId = array[i].id
        let recipeUrl = 'https:api.spoonacular.com/recipes/' + recipeId + '/information?apiKey=5a9eaad9b6f54ec5adca1041255d83f2'; 
        
        fetch(recipeUrl) 
    
        .then(function(response) {
            return response.json();
        })
        
        .then(function(response) {
            array[i].link = response.sourceUrl
            // setRecipes({...response})
        });
        
    }
    }

    const deleteIngredient = (ingredient) => {
        let divId = document.getElementById(ingredient.id).id

        let indexOfIngredient = ingredients.findIndex(ingredient => {
            return ingredient.id === divId
        })

        ingredients.splice(indexOfIngredient, 1)
        
        setIngredients([...ingredients])
        setShownRecipes([...recipes])
    }

    const deleteAllIngredients = (ingredients) => {
        setIngredients([])
        setRecipes([])
        setShownRecipes([])
    }

    const searchRecipes = (recipes) => {
        setShownRecipes([...recipes])
        console.log(recipes)
    }

    const pullMissingIngredients = (array) => {
        
    }

    return (
        <div id="content-container">
            <div id='search-content'>
                <div id='search-items'>
                    <input id='name' type='text' defaultValue='' placeholder='Enter ingredient'/>
                    <div id='button-container'>
                        <input id='ingredient-button' type='button' value='Add' onClick={() => addIngredient(document.getElementById('name').value)}/>
                        <input id='ingredient-button' type='button' value='Delete All' onClick={() => deleteAllIngredients(ingredients)}/>
                    </div>
                </div>
                
                <div id='ingredient-section-container'>
                    <div id='ingredient-title'>Ingredients</div>
                    <div id='ingredient-list'>
                        {ingredients.map((ingredient) => {
                            return (<div key={ingredient.id} 
                                    id={ingredient.id}
                                    className='ingredient-container'
                                    onClick={() => deleteIngredient(ingredient)}>
                                    <div className='ingredient-name'>{ingredient.name}</div>
                            </div>
                            )
                        })}
                    </div>
                </div>
                <input id='submit-button' type='button' value='Search Recipes' onClick={() => searchRecipes(recipes)}/>
            </div>
            
        </div>
    )
}

export default Content
