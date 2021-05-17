// const searchBtn = document.getElementById('search-btn'); //need to change this to make it work
// const mealList = document.getElementById('meal'); //change
// const mealDetailsContent = document.querySelector('.meal-details-content'); // change
// const recipeCloseBtn = document.getElementById('recipe-close-btn');  //change

// // event listeners
// searchBtn.addEventListener('click', getMealList);  //change
// mealList.addEventListener('click', getMealRecipe); //change
// recipeCloseBtn.addEventListener('click', () => {
//     mealDetailsContent.parentElement.classList.remove('showRecipe');
// });


// // get meal list that matches with the ingredients
// function getMealList(){
//     let searchInputTxt = document.getElementById('search-input').value.trim();
//     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
//     .then(response => response.json())
//     .then(data => {
//         let html = "";
//         if(data.meals){
//             data.meals.forEach(meal => {
//                 html += `
//                     <div class = "meal-item" data-id = "${meal.idMeal}">
//                         <div class = "meal-img">
//                             <img src = "${meal.strMealThumb}" alt = "food">
//                         </div>
//                         <div class = "meal-name">
//                             <h3>${meal.strMeal}</h3>
//                             <a href = "#" class = "recipe-btn">Get Recipe</a>
//                         </div>
//                     </div>
//                 `;
//             });
//             mealList.classList.remove('notFound');
//         } else{
//             html = "Sorry, we didn't find any meal!";
//             mealList.classList.add('notFound');
//         }

//         mealList.innerHTML = html;
//     });
// }


// // get recipe of the meal
// function getMealRecipe(e){
//     e.preventDefault();
//     if(e.target.classList.contains('recipe-btn')){
//         let mealItem = e.target.parentElement.parentElement;
//         fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
//         .then(response => response.json())
//         .then(data => mealRecipeModal(data.meals));
//     }
// }

// // create a modal
// function mealRecipeModal(meal){
//     console.log(meal);
//     meal = meal[0];
//     let html = `
//         <h2 class = "recipe-title">${meal.strMeal}</h2>
//         <p class = "recipe-category">${meal.strCategory}</p>
//         <div>
//             <p class = "recipe-category">${meal.strArea}</p>
//         </div>
//         <div class = "recipe-instruct">
//             <h4>Ingredients:</h4>
//             <p>${meal.strMeasure1} ${meal.strIngredient1}</p>
//             <p>${meal.strMeasure2} ${meal.strIngredient2}</p>
//             <p>${meal.strMeasure3} ${meal.strIngredient3}</p>
//             <p>${meal.strMeasure4} ${meal.strIngredient4}</p>
//             <p>${meal.strMeasure5} ${meal.strIngredient5}</p>
//             <p>${meal.strMeasure6} ${meal.strIngredient6}</p>
//             <p>${meal.strMeasure7} ${meal.strIngredient7}</p>
//             <p>${meal.strMeasure8} ${meal.strIngredient8}</p>
//             <p>${meal.strMeasure9} ${meal.strIngredient9}</p>
//             <p>${meal.strMeasure10} ${meal.strIngredient10}</p>
//             <p>${meal.strMeasure11} ${meal.strIngredient11}</p>
//             <p>${meal.strMeasure12} ${meal.strIngredient12}</p>
//             <p>${meal.strMeasure13} ${meal.strIngredient13}</p>
//             <p>${meal.strMeasure14} ${meal.strIngredient14}</p>
//             <p>${meal.strMeasure15} ${meal.strIngredient15}</p>
//             <p>${meal.strMeasure16} ${meal.strIngredient16}</p>
//             <p>${meal.strMeasure17} ${meal.strIngredient17}</p>
//             <p>${meal.strMeasure18} ${meal.strIngredient18}</p>
//             <p>${meal.strMeasure19} ${meal.strIngredient19}</p>
//             <p>${meal.strMeasur20} ${meal.strIngredient20}</p>       
//         </div>
//         <div class = "recipe-instruct">
//             <h3>Instructions:</h3>
//             <p>${meal.strInstructions}</p>
//         </div>
//         <div class = "recipe-meal-img">
//             <img src = "${meal.strMealThumb}" alt = "">
//         </div>
//         <div class = "recipe-link">
//             <a href = "${meal.strSource}" target = "_blank">Get Recipe Link</a>
//         </div>
//         <div class = "recipe-link">
//             <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
//         </div>
//     `;
//     mealDetailsContent.innerHTML = html;
//     mealDetailsContent.parentElement.classList.add('showRecipe');
// }