import './Search.css';
import { useState } from 'react';
import axios from 'axios';

function Search(props) {
    const [query, setQuery] = useState('');
    const [nutrients, setNutrients] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        axios.get('https://api.nutritionix.com/v1_1/search/' + query, {
          params: {
            results: '0:1',
            fields: 'item_name,brand_name,nf_calories,nf_total_fat,nf_saturated_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein',
            appId: '25850a88',
            appKey: '037a99010fc1334604cd90034de61eaa'
          }
        })
        .then((response) => {
          const food = response.data.hits[0].fields;
          setNutrients({
            name: food.item_name,
            brand: food.brand_name,
            calories: food.nf_calories,
            fat: food.nf_total_fat,
            saturatedFat: food.nf_saturated_fat,
            cholesterol: food.nf_cholesterol,
            sodium: food.nf_sodium,
            carbs: food.nf_total_carbohydrate,
            fiber: food.nf_dietary_fiber,
            sugar: food.nf_sugars,
            protein: food.nf_protein
          });
        })
        .catch((error) => {
          console.log(error);
        });
      };
    
    //   const handleChange = (e) => {
    //     setQuery(e.target.value);
    //   };

    return (
        <div className="search">
            <h2>Search for Foods</h2>
            <form id="food-search-form" onSubmit={handleSubmit}>
                <label htmlFor="food-search">Search for Foods:</label>
                <input type="text" id="food-search" name="food-search" value={query} onChange={(event) => setQuery(event.target.value)}/>
                <input type="submit" value="Search"/>
            </form>
            {/* <div id="food-results">
                {props.searchResults.map((result) => (
                    <div key={result._id}>{result.fields.item_name}</div>
                ))}
            </div> */}
            {nutrients && (
                <div id="food-results">
                    <h3>{nutrients.name}</h3>
                    <p>{nutrients.brand}</p>
                    <ul>
                        <li>Calories: {nutrients.calories}</li>
                        <li>Total Fat: {nutrients.fat}g</li>
                        <li>Saturated Fat: {nutrients.saturatedFat}g</li>
                        <li>Cholesterol: {nutrients.cholesterol}mg</li>
                        <li>Sodium: {nutrients.sodium}mg</li>
                        <li>Total Carbohydrate: {nutrients.carbs}g</li>
                        <li>Dietary Fiber: {nutrients.fiber}g</li>
                        <li>Sugar: {nutrients.sugar}g</li>
                        <li>Protein: {nutrients.protein}g</li>
                        <li>Fat: {nutrients.fat ? nutrients.fat.toFixed(1) + "g" : "-"}</li>
                        <li>Carbohydrates: {nutrients.carbohydrates ? nutrients.carbohydrates.toFixed(1) + "g" : "-"}</li>
                        <li>Fiber: {nutrients.fiber ? nutrients.fiber.toFixed(1) + "g" : "-"}</li>
                        <li>Sugar: {nutrients.sugar ? nutrients.sugar.toFixed(1) + "g" : "-"}</li>
                    </ul>
                </div>)}
        </div>
    );
}

export default Search;

