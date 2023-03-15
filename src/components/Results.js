import '../styles/Content.css'


const Results = ({recipes, shownRecipes, setShownRecipes}) => {

    return (
        <div id='results-container'>
            <div id='results-title'>Top 10 Results</div>
                <div id='recipe-results'>
                        {shownRecipes.map((recipe) => {
                            return (<div key={recipe.id} 
                                    className='recipe-container'>
                                    <img className='recipe-image' src={recipe.image}></img>
                                    <div className='recipe-content-container'>
                                        <div className='recipe-name'>{recipe.title}</div>
                                        <div className ='recipe-url'>Link to recipe: {recipe.link}</div>
                                    </div>
                            </div>
                            )
                        })}
            </div>
        </div>
    )
}

export default Results