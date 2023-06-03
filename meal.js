const loadMeals=(searchText)=>{
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res =>res.json())
    .then(data =>displayMeals(data.meals))
}   

const displayMeals = meals => {
    // console.log(meals);

    // container element
    const mealsContainer = document.getElementById('meals-container');

    // the next line will remove the previous items after every search
    mealsContainer.innerHTML="";

    meals.forEach(meal=>{
        console.log(meal)

        // create child for each element
        const mealDiv=document.createElement('div');
        mealDiv.classList.add('col');

        //set content of the child
        mealDiv.innerHTML = `
        <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    
                    <p class="card-text">${meal.strCategory}</p>
                    <p class="card-text">${meal.strArea}</p>
                    
                    <button onclick="loadMealDetails(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
                    Details
                    </button>
                    
                </div>
        </div>
        `

        // Append child
        mealsContainer.appendChild(mealDiv);
    })
}


const searchMeals=()=>{
    const searchText = document.getElementById('search-field').value;

    // search meals
    console.log(searchText);
    loadMeals(searchText)


}

const loadMealDetails=idMeal=>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayMealDetails(data.meals[0]));
}

const displayMealDetails=meal=>{
    document.getElementById('mealDetailsLabel').innerText=meal.strMeal;
    const mealDetails= document.getElementById('meal-body');
    mealDetails.innerHTML=`
        <img class="img-fluid" src="${meal.strMealThumb}">
        <p class="p-4">${meal.strInstructions}</p>
    `
}
loadMeals('rice');