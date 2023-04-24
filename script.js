// const appId = document.currentScript.dataset.appId;
// const appKey = document.currentScript.dataset.appKey;

// const foodSearchForm = document.getElementById('food-search-form');
// const foodSearchInput = document.getElementById('food-search');
// const foodResultsDiv = document.getElementById('food-results');

// foodSearchForm.addEventListener('submit', (event) => {
//    event.preventDefault();
//    const searchTerm = foodSearchInput.value;
//    fetch(`https://api.nutritionix.com/v1_1/search/${searchTerm}?results=0:1&fields=item_name,nf_calories,nf_total_fat,nf_saturated_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein&appId=${appId}&appKey=${appKey}`)
//       .then(response => response.json())
//       .then(data => {
//          const foodItem = data.hits[0].fields;
//          const html = `
//             <h3>${foodItem.item_name}</h3>
//             <p>Calories: ${foodItem.nf_calories}</p>
//             <p>Total Fat: ${foodItem.nf_total_fat}g</p>
//             <p>Saturated Fat: ${foodItem.nf_saturated_fat}g</p>
//             <p>Cholesterol: ${foodItem.nf_cholesterol}mg</p>
//             <p>Sodium: ${foodItem.nf_sodium}mg</p>
//             <p>Total Carbohydrate: ${foodItem.nf_total_carbohydrate}g</p>
//             <p>Dietary Fiber: ${foodItem.nf_dietary_fiber}g</p>
//             <p>Sugars: ${foodItem.nf_sugars}g</p>
//             <p>Protein: ${foodItem.nf_protein}g</p>
//          `;
//          foodResultsDiv.innerHTML = html;
//       })
//       .catch(error => console.error(error));
// });

const form = document.querySelector('#food-search-form');
const foodResults = document.querySelector('#food-results');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const searchTerm = event.target.elements['food-search'].value;
  const results = await searchFoods(searchTerm);
  displayFoodResults(results);
});

async function searchFoods(searchTerm) {
   const url = `https://api.nutritionix.com/v2/search?query=${searchTerm}&limit=10&offset=0&search_type=grocery`;
   const response = await fetch(url, {
     headers: {
       'x-app-id': '25850a88',
       'x-app-key': '037a99010fc1334604cd90034de61eaa',
     },
   });
   const data = await response.json();
   return data.hits;
 }
 
 function displayFoodResults(results) {
   foodResults.innerHTML = '';
   
   results.forEach((result) => {
     const { food_name, nf_calories, nf_total_fat, nf_sodium, nf_protein, nf_total_carbohydrate } = result.fields;
     
     const resultElement = document.createElement('div');
     resultElement.classList.add('food-result');
     
     const nameElement = document.createElement('h3');
     nameElement.textContent = food_name;
     resultElement.appendChild(nameElement);
     
     const caloriesElement = document.createElement('p');
     caloriesElement.textContent = `Calories: ${nf_calories}`;
     resultElement.appendChild(caloriesElement);
     
     const fatElement = document.createElement('p');
     fatElement.textContent = `Fat: ${nf_total_fat}g`;
     resultElement.appendChild(fatElement);
     
     const sodiumElement = document.createElement('p');
     sodiumElement.textContent = `Sodium: ${nf_sodium}mg`;
     resultElement.appendChild(sodiumElement);
     
     const proteinElement = document.createElement('p');
     proteinElement.textContent = `Protein: ${nf_protein}g`;
     resultElement.appendChild(proteinElement);
     
     const carbsElement = document.createElement('p');
     carbsElement.textContent = `Carbohydrates: ${nf_total_carbohydrate}g`;
     resultElement.appendChild(carbsElement);
     
     foodResults.appendChild(resultElement);
   });
 }
 
