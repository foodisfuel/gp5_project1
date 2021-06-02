// LEGEND
// ONE *: SOLVED WITHIN GROUP
// TWO **: ASKBCS - SLACK
// THREE ***: OUTSOURCE

// VARIABLES:
// ENTIRE FORM SECTION *
var userFormEl = document.querySelector('');

// FORM INPUTS *
// SEARCH INPUT FROM FORM *
var searchInputEl = document.querySelector(''); 
// MEAL-TYPE INPUT FROM FORM *
var mealInputEl = document.querySelector('');
// HEALTH-TYPE INPUT FROM FORM *
var healthInputEl = document.querySelector('');
// CALORIE AMOUNT FROM FORM *
var calInputEl = document.querySelector('');

// VARIABLES FOR SHOWCASE/RECIPE SECTION *
var recipeContainerEl = document.querySelector('');

// function to get user input from form, or assist them complete it
var formSubmitHandler = function(event) {
    // prevent page from reloading when submit button is clicked
    event.preventDefault();

    // GET THE USER'S SEARCH INPUT, IS TRIM NEEDED HERE? ***
    var searchTerm = searchInputEl.value.trim();
    // if user submitted a searchTerm, pass it as an argument to getRecipes 
    if (searchTerm) {
        getRecipes(searchTerm);
        // reset input field to blank after submit
        searchInputEl.value = '';
    } else {
        // if user did not fill out anything, prompt them to do so
        alert('Please enter a food you would like to include in your recipe!');
    }

    // GET THE USER'S MEAL INPUT
    var mealLabel = mealInputEl.value();
    // SEND TO getRecipes FUNCTION
    getRecipes(mealLabel);

    // GET THE USER'S HEALTH INPUT
    var healthLabel = healthInputEl.value();
    // SEND TO getRecipes FUNCTION
    getRecipes(healthLabel);

    // GET THE USER'S CALORIE INPUT
    var calLabel = calInputEl.value();
    // SEND TO getRecipes FUNCTION
    getRecipes(calLabel);
};

// function to request data from the api
var getRecipes = function(food, meal, health, calories) {
    var getRecipe = 'https://api.edamam.com/search?q=' + searchTerm + '&app_key=$d57f32b0&mealType=' + mealLabel + '$health=' + healthLabel + '&calories=' + calLabel + '';
    // make request to the url
    fetch(getRecipe).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                displayRecipes(data);
            });            
        } else {
            // request was unsuccessful 
            alert('Error: No Recipes Found');
        }
    })
    // if '.then' method fails, fetch() will use the '.catch' method below
    .catch(function(error) {
        alert('Unable to connect to Edamam Recipe API');
    });
};

// function to display/manipulate dom 
var displayRecipes = function(recipes) {
    // check if api returned any recipes
    if (recipes.length === 0) {
        recipeContainerEl.textContent = 'Sorry, no recipes were found. Please try again!';
        return;
    }
    // clear old data. DOES THIS ALSO CLEAR EXISTING DATA?
    recipeContainerEl.textContent = '';
    // CLEAR ENTIRE SHOWCASE SECTION BELOW HERO/FORM ***
    recipeContainerEl
    // NEED SOLUTION ***

    // loop over recipes
    for (var i = 0; i < recipes.length; i++) {
        // format recipe name
        // MUST FIND CORRECT VALUE FROM FETCHED DATA *
        var recipeName = recipes[i].owner.login + '/' + recipes[i].name; 

        // create a list item container for each recipe
        var recipeEl = document.createElement('li');
        // CONSULT SCOTT FOR THE CORRECT FOUNDATION CLASSES AND LAYOUT OF ELEMENTS WITHIN *
        recipeEl.classList = '';

        // CREATE 'AN' ELEMENT TO HOLD RECIPE TITLE. NOT SURE IF H2 IS THE SUITABLE TAG FOR FOUNDATION, ASK SCOTT *
        var titleEl = document.createElement('h2');
        // THE TITLE WITH MATCH THE FETCHED DATA'S
        titleEl.textContent = recipeName;

        // CREATE UL TO HOLD THE INGREDIENTS FOR THE RECIPE
        var ingredientsEl = document.createElement('ul');

        // CREATE LIs TO DISPLAY RECIPE'S INGREDIENTS.  OR APPEND TO UL ABOVE? ***

        var itemsEl = document.createElement('li');
        // AGAIN, CONSULT SCOTT FOR ASSIGNING CLASSES *
        itemsEl. classList = '';

        // LOOP FOR INGREDIENT ITEMS. WHILE LOOPING INGREDIENTS, THEN LOOP ITEMS POSSIBLE? ***
        for (var i = 0; ingerdientItemsFromFetchedApi.length; i++) {
            // NEED SOLUTION ***
        };
        

        // append title to container
        recipeEl.appendChild(titleEl);

        // APPEND ITEMS TO INGREDIENT UL CONTAINER? ***
        ingredientEl.appendChild(itemsEl);
        // append ingredient to container
        recipeEl.appendChild(ingredientEl);

        // append recipe container to the dom
        recipeContainerEl.appendChild(recipeEl);
    }
};

// event listener for form submission
userFormEl.addEventListener('submit', formSubmitHandler);