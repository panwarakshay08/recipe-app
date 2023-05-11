import React, { useState, useEffect } from 'react';
import '../App.css';
// import hamburger from './hamburger.svg';


<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-Tf3RBGI3MdXkMx+ADnrmfV7j3br/2QV7zN+6oEJNzYKjU4P6vhOtPu6akQjKUarEJEdzS6TTw1wTjTLYJmG6Xg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>


const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipeList, updateRecipeList] = useState([]);
    const [showIngredientsDialog, setShowIngredientsDialog] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState({});

    const APPLICATION_ID = '2ac556fe';
    const APPLICATION_KEYS = '861811cdd7b8169d69e8e3681603f949';

    useEffect(() => {
        if (searchTerm) {
            const fetchRecipe = async () => {
                try {
                    const response = await fetch(
                        `https://api.edamam.com/search?q=${searchTerm}&app_id=${APPLICATION_ID}&app_key=${APPLICATION_KEYS}`
                    );
                    const data = await response.json();
                    updateRecipeList(data.hits);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchRecipe();
        } else {
            updateRecipeList([]);
        }
    }, [searchTerm]);

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSeeMoreClick = (recipe) => {
        setSelectedRecipe(recipe);
        setShowIngredientsDialog(true);
    };

    const handleDialogClose = () => {
        setShowIngredientsDialog(false);
        setSelectedRecipe({});
    };

    return (
        <div className="App">
            <header>
                <h1>
                    Recipe Finder
                </h1>
                <div>
                    <input type="text" placeholder="Search Recipe" value={searchTerm} onChange={handleSearchInputChange} />
                    <button> Search </button>
                </div>
            </header>
            <main>
                {recipeList.map((recipe) => (
                    <div key={recipe.recipe.uri}>
                        <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                        <h2>{recipe.recipe.label}</h2>
                        <button onClick={() => handleSeeMoreClick(recipe.recipe)}>See More</button>
                    </div>
                ))}
                {recipeList.length === 0 && <p>No recipes found.</p>}
            </main>
            {showIngredientsDialog && (
                <div className="dialog">
                    <div className="dialog-content">
                        <h2>{selectedRecipe.label} Ingredients</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ingredient</th>
                                    <th>Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedRecipe.ingredients.map((ingredient) => (
                                    <tr key={ingredient.foodId}>
                                        <td>{ingredient.text}</td>
                                        <td>{ingredient.weight.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="dialog-actions">
                            <button onClick={handleDialogClose}>Close</button>
                            <a href={selectedRecipe.url} target="_blank" rel="noopener noreferrer">
                                See Complete Recipe
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
