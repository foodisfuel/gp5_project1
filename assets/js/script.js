// VARIABLES:
// add event listener to form element
var userFormEl = document.querySelector('#input-form');

// form inputs
var searchInputEl = document.querySelector('#search-input');
var calInputEl = document.querySelector('#calorie-input');
var mealInputEl = document.querySelector('#meal-input').value;
var healthInputEl = document.querySelector('#health-input').value;



// main/recipe section
var recipeContainerEl = document.querySelector('#recipe-container');

// function to get user input from the form, or provide an alert to help with completion
var formSubmitHandler = function (event) {
    // prevent page from reloading when submit button is clicked
    event.preventDefault();

    var searchInputEl = document.querySelector('#search-input').value;
    var calInputEl = document.querySelector('#calorie-input').value;
    
   

    // if user submitted a searchInputEl, pass it as an argument to getRecipes 
    if (!searchInputEl) {
        // if user did not fill out anything, prompt them to do so
        //alert('Please enter a food you would like to include in your recipe!');
        $('#searchalert').foundation('toggle');

    } else {
        // reset input fields after submitting form
        searchInputEl.value = '';
        calInputEl.value = 0;
    }

    getRecipes();
    userFormEl.reset();
};

// function to request data from the api
var getRecipes = function () {
    // work-around for [object%20HTMLInputElement] problem 
    var food = searchInputEl.value;
    var calories = calInputEl.value;
    

    var apiUrl = 'https://api.edamam.com/search?app_id=d57f32b0&app_key=368e27d7e44f2844bc9bdbd02eb0eb32&q=' + food + '&mealType=' + mealInputEl + healthInputEl + '&calories=0-' + calories;
    
    
     

    // make request to the url
    fetch(apiUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                console.log(food);
                var recipes = data;
                document.querySelectorAll('.column').forEach(item => item.remove());
                for (i = 0; i < 9; i++) {

                    //create html elements
                    var recipeDiv = document.createElement('div');
                    recipeDiv.className = 'column';
                    var recipeCard = document.createElement('div');
                    recipeCard.className = 'card';
                    var recipePic = document.createElement('img');
                    recipePic.src = recipes.hits[i].recipe.image
                    recipePic.width = "300";
                    recipePic.height = "300";
                    recipePic.alt = recipes.hits[i].recipe.label;
                    var cardDivider = document.createElement('div');
                    cardDivider.className = 'card-divider';
                    var foodTitle = document.createElement('h4');
                    foodTitle.textContent = recipes.hits[i].recipe.label;
                    var cardDividerTwo = document.createElement('div');
                    cardDividerTwo.className = 'card-divider';
                    var ingredientTitle = document.createElement('h4');
                    ingredientTitle.textContent = 'Ingredients';
                    var linkText = document.createElement('p');
                    var instructionLink = document.createElement('a');
                    instructionLink.target = "_blank";
                    instructionLink.textContent = "Instructions";
                    instructionLink.href = recipes.hits[i].recipe.url;

                    // append html elements
                    recipeDiv.appendChild(recipeCard);
                    recipeCard.appendChild(recipePic);
                    recipeCard.appendChild(cardDivider);
                    cardDivider.appendChild(foodTitle);
                    recipeCard.appendChild(cardDividerTwo);
                    cardDividerTwo.appendChild(ingredientTitle);
                    linkText.appendChild(instructionLink);


                    for (j = 0; j < recipes.hits[i].recipe.ingredientLines.length; j++) {

                        // create and append ingredients
                        var ingredient = document.createElement('p');
                        ingredient.textContent = recipes.hits[i].recipe.ingredientLines[j];
                        cardDividerTwo.appendChild(ingredient);
                    }

                    // append link to instructions
                    cardDividerTwo.appendChild(linkText);
                    console.log()

                    // append divs to DOM
                    var resultsContainer = document.getElementById('results');
                    resultsContainer.appendChild(recipeDiv);
                }
            });
        } else {
            // request was unsuccessful 
            //alert('Error: No Recipes Found');
            $('#noresults').foundation('toggle');
        }
    })
        // if '.then' method fails, fetch() will use the '.catch' method below
        .catch(function (error) {
            //alert('Unable to connect to Edamam Recipe API');
            $('#connectionerror').foundation('toggle');
        });
};

// event listener for form submission
userFormEl.addEventListener('submit', formSubmitHandler);