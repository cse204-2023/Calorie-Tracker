const appId = document.currentScript.dataset.appId;
const appKey = document.currentScript.dataset.appKey;

const foodSearchForm = document.getElementById('food-search-form');
const foodSearchInput = document.getElementById('food-search');
const foodResultsDiv = document.getElementById('food-results');

foodSearchForm.addEventListener('submit', (event) => {
   event.preventDefault();
   const searchTerm = foodSearchInput.value;
   fetch(`https://api.nutritionix.com/v1_1/search/${searchTerm}?results=0:1&fields=item_name,nf_calories,nf_total_fat,nf_saturated_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein&appId=${appId}&appKey=${appKey}`)
      .then(response => response.json())
      .then(data => {
         const foodItem = data.hits[0].fields;
         const html = `
            <h3>${foodItem.item_name}</h3>
            <p>Calories: ${foodItem.nf_calories}</p>
            <p>Total Fat: ${foodItem.nf_total_fat}g</p>
            <p>Saturated Fat: ${foodItem.nf_saturated_fat}g</p>
            <p>Cholesterol: ${foodItem.nf_cholesterol}mg</p>
            <p>Sodium: ${foodItem.nf_sodium}mg</p>
            <p>Total Carbohydrate: ${foodItem.nf_total_carbohydrate}g</p>
            <p>Dietary Fiber: ${foodItem.nf_dietary_fiber}g</p>
            <p>Sugars: ${foodItem.nf_sugars}g</p>
            <p>Protein: ${foodItem.nf_protein}g</p>
         `;
         foodResultsDiv.innerHTML = html;
      })
      .catch(error => console.error(error));
});

