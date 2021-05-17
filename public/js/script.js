// opens login page
const login = document.getElementById('login')

if (login) {
    login.addEventListener('click', function () {
        document.location.replace('/login');
    });
};

document.getElementById('chat').addEventListener('click', function () {
    document.location.replace('/community');
});

document.getElementById('home').addEventListener('click', function () {
    document.location.replace('/');
});

document.getElementById('profile').addEventListener('click', function () {
    document.location.replace('/profile');
});

const newFormHandler = async () => {

    const state_name = document.querySelector('#select_state').value;
    const start_month = document.querySelector('#select_mon').value;
    const h4 = document.querySelector('#result');
    h4.innerHTML = '';

    await fetch(`/api/products`).then(function (response) {
        return response.json();
    }).then(function (data) {
        for (let i = 0; i < data.length; i++) {
            if ((data[i].state == state_name && data[i].start_season == start_month) || (data[i].state == state_name && data[i].start_season < start_month && data[i].end_season >= start_month) || (data[i].state == state_name && data[i].start_season < start_month && data[i].end_season < data[i].start_season) || (data[i].state == state_name && data[i].start_season > data[i].end_season && data[i].end_season >= start_month)) {
                var foodBtn = document.createElement('button');
                foodBtn.setAttribute("value", data[i].name);
                foodBtn.setAttribute("class", "buttonClass");
                foodBtn.innerHTML = data[i].name
                h4.appendChild(foodBtn);
            }
        }
    })
};

// const searchBtn = document.getElementById('search');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// get meal list that matches with the ingredients
function getMealList(input) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                      <div class = "meal-item" data-id = "${meal.idMeal}">
                          <div class = "meal-img">
                              <img src = "${meal.strMealThumb}" alt = "food">
                          </div>
                          <div class = "meal-name">
                              <h3>${meal.strMeal}</h3>
                              <a href = "#" class = "recipe-btn">Get Recipe</a>
                          </div>
                            <button class = "save_user" value = "${meal.strMeal}">Save</button>
                      </div>
                  `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}


// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal) {
    meal = meal[0];
    let html = `
          <h2 class = "recipe-title">${meal.strMeal}</h2>
          <p class = "recipe-category">${meal.strCategory}</p>
          <div>
              <p class = "recipe-category">${meal.strArea}</p>
          </div>
          <div class = "recipe-instruct">
              <h4>Ingredients:</h4>
              <p>${meal.strMeasure1} ${meal.strIngredient1}</p>
              <p>${meal.strMeasure2} ${meal.strIngredient2}</p>
              <p>${meal.strMeasure3} ${meal.strIngredient3}</p>
              <p>${meal.strMeasure4} ${meal.strIngredient4}</p>
              <p>${meal.strMeasure5} ${meal.strIngredient5}</p>
              <p>${meal.strMeasure6} ${meal.strIngredient6}</p>
              <p>${meal.strMeasure7} ${meal.strIngredient7}</p>
              <p>${meal.strMeasure8} ${meal.strIngredient8}</p>
              <p>${meal.strMeasure9} ${meal.strIngredient9}</p>
              <p>${meal.strMeasure10} ${meal.strIngredient10}</p>
              <p>${meal.strMeasure11} ${meal.strIngredient11}</p>
              <p>${meal.strMeasure12} ${meal.strIngredient12}</p>
              <p>${meal.strMeasure13} ${meal.strIngredient13}</p>
              <p>${meal.strMeasure14} ${meal.strIngredient14}</p>
              <p>${meal.strMeasure15} ${meal.strIngredient15}</p>
              <p>${meal.strMeasure16} ${meal.strIngredient16}</p>
              <p>${meal.strMeasure17} ${meal.strIngredient17}</p>
              <p>${meal.strMeasure18} ${meal.strIngredient18}</p>
              <p>${meal.strMeasure19} ${meal.strIngredient19}</p>
              <p>${meal.strMeasur20} ${meal.strIngredient20}</p>       
          </div>
          <div class = "recipe-instruct">
              <h3>Instructions:</h3>
              <p>${meal.strInstructions}</p>
          </div>
          <div class = "recipe-meal-img">
              <img src = "${meal.strMealThumb}" alt = "">
          </div>
          <div class = "recipe-link">
              <a href = "${meal.strSource}" target = "_blank">Get Recipe Link</a>
          </div>
          <div class = "recipe-link">
              <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
          </div>
      `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

document.getElementById('search').addEventListener('click', function () {
    document.querySelector(".meal-wrapper").style.display = "block";
    newFormHandler();
});

document.getElementById('result').addEventListener('click', event => {
    if (event.target.className === 'buttonClass') {
        const food = event.target.value
        getMealList(food)
    }
});

mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

var ingredientlist = [];
var obj = {};
for (let i = 0; i < 20; i++) {
    ingredientlist[i] = "strIngredient"+(i+1);
    obj[i] = ingredientlist[i]
}

var measurelist = [];
var obj_measure ={};
for (let i = 0; i < 15; i++) {
    measurelist[i] = "strMeasure"+(i+1);
    obj_measure[i] = measurelist[i]
}

async function getfood(pairedFood) {
    var ing = "";
    var dis = "";
    var url = "";
    var api_name = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + pairedFood;
    await fetch(api_name).then(function (response) {
        return response.json();
    }).then(function (data) {
        dis = dis + data.meals[0].idMeal
        url = url + data.meals[0].strMealThumb
            for (let i = 0; i < 20; i++) {
                if (data.meals[0][obj[i]] !== null){
                    ing = ing + data.meals[0][obj_measure[i]] +' ' + data.meals[0][obj[i]] + ' '
                }
            }
        console.log(dis)
        console.log(url)
        recipeSave(pairedFood,ing,dis,url)
    });
};

async function recipeSave(name_,ing_,dis_,url_) {
    const name = name_.trim()
    const ingredients = dis_.trim()
    const description = dis_.trim()
    const pictureurl = url_.trim()

    if (name && ingredients && description && pictureurl) {
      const response =  await fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({ name, ingredients, description,pictureurl}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // document.location.replace('/profile');
      } else {
        alert('Failed to save recipe');
      }
    }
}

document.getElementById('meal').addEventListener('click', event => {
    if (event.target.className === 'save_user') {
        console.log(event.target.value)
        const dishname = event.target.value.trim()
        getfood(dishname)
        // recipeSave(dishname)
    }
});

// searchBtn.addEventListener('click', function() {
//     document.querySelector(".meal-wrapper").style.display = "block";
// });