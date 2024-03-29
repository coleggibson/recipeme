import '../styles/Results.css'


const Results = ({recipes, shownRecipes, setShownRecipes}) => {
    
    return (
        <div id='results-container'>
                <div id='recipe-results'>
                        {shownRecipes.map((recipe) => {
                            return (<div key={recipe.id} 
                                    className='recipe-container'>
                                    <img className='recipe-image' src={recipe.image}></img>
                                    <div className='recipe-content-container'>
                                        <div className='recipe-name'>{recipe.title}</div>
                                        <a className ='recipe-url' href={recipe.link}>Click here for recipe</a>
                                        <div className ='recipe-missed-ingredients'>Missing ingredients: {recipe.missedIngredientsObject}</div>
                                    </div>
                            </div>
                            )
                        })}
            </div>
        </div>
    )
}

export default Results