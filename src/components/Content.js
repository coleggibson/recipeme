import { foodBackground } from "../images";
import { useEffect, useState } from "react"
import uniqid from "uniqid";
import '../index.css'
import '../styles/Content.css'

//add count to ingredients
//add random recipe
const Content = ({recipes, ingredients, shownRecipes, setIngredients, setRecipes, setShownRecipes}) => {
    
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

        let newUrl = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=5a9eaad9b6f54ec5adca1041255d83f2&ingredients=' + urlIngredientArray.toLowerCase() + '&number=5' ; 
        
        fetch(newUrl) 
    
        .then(function(result) {
            return result.json();
        })
        

        .then( function(result) {
            const recipes = [...result];
            createRecipe(recipes)
            setRecipes([...recipes])
            console.log(recipes)
            
        });
        
    }

    const createRecipe = (recipes) => {
        recipes.forEach(async (recipe, index) => {
            recipes[index].link = await getRecipeUrl(recipe.id)
            recipes[index].missedIngredientsObject = await pullMissingIngredients(recipe.missedIngredients)
        })
        
    }

    const pullMissingIngredients = async (array) => {
        let missingIngredientObject = ''
        for (let i=0; i < array.length; i++){
            if (missingIngredientObject === '') {
                missingIngredientObject += array[i].name
                
            } else {
                missingIngredientObject += ', ' + array[i].name
            }
            
        }
       return await missingIngredientObject
    }


    const getRecipeUrl = async (recipeId) => {
        let recipeUrl = 'https://api.spoonacular.com/recipes/' + recipeId + '/information?apiKey=5a9eaad9b6f54ec5adca1041255d83f2'; 
        
        return await fetch(recipeUrl) 
    
        .then(function(response) {
            return response.json();
        })
        
        .then(function(response) {
            return response.sourceUrl
            
        });
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
