import './Search.css';
import { useState } from 'react';
import axios from 'axios';

function Search(props) {
    const [query, setQuery] = useState('');
    const [nutrients, setNutrients] = useState(null);
    const [weight, setWeight] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const weight = event.target.elements["food-weight"].value;
        const weightInGrams = parseInt(weight);
    
        axios.get('https://api.nutritionix.com/v1_1/search/' + query, {
            params: {
                results: '0:1',
                fields: 'item_name,brand_name,nf_calories,nf_total_fat,nf_saturated_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_serving_weight_grams',
                appId: '25850a88',
                appKey: '037a99010fc1334604cd90034de61eaa'
            }
        })
        .then((response) => {
            const food = response.data.hits[0].fields;
            const servingWeight = food.nf_serving_weight_grams;
    
            if(!weightInGrams){
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
                    protein: food.nf_protein,
                    servingWeight: servingWeight
                });
            } else {
                setNutrients({
                    name: food.item_name,
                    brand: food.brand_name,
                    calories: (food.nf_calories * weightInGrams / servingWeight),
                    fat: (food.nf_total_fat * weightInGrams / servingWeight),
                    saturatedFat: (food.nf_saturated_fat * weightInGrams / servingWeight),
                    cholesterol: (food.nf_cholesterol * weightInGrams / servingWeight),
                    sodium: (food.nf_sodium * weightInGrams / servingWeight),
                    carbs: (food.nf_total_carbohydrate * weightInGrams / servingWeight),
                    fiber: (food.nf_dietary_fiber * weightInGrams / servingWeight),
                    sugar: (food.nf_sugars * weightInGrams / servingWeight),
                    protein: (food.nf_protein * weightInGrams / servingWeight),
                    servingWeight: servingWeight
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };
    
    return (
        <div className="search">
            <h2>Search for Foods</h2>
            <form id="food-search-form" onSubmit={handleSubmit}>
                <label htmlFor="food-search">Search for Foods:</label>
                <input type="text" id="food-search" name="food-search" value={query} onChange={(event) => setQuery(event.target.value)}/>
                <input type="text" id="food-weight" name="food-weight" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder="Weight in grams"/>
                <input type="submit" value="Search"/>
            </form>
            {nutrients && (
                <div id="food-results">
                    <h3>{nutrients.name}</h3>
                    <p>{nutrients.brand}</p>
                    <ul>
                        <li>Calories: {nutrients.calories}</li>
                        <li>Total Fat: {(nutrients.fat).toFixed(2)} g</li>
                        <li>Saturated Fat: {(nutrients.saturatedFat).toFixed(2)} g</li>
                        <li>Cholesterol: {(nutrients.cholesterol).toFixed(2)} mg</li>
                        <li>Sodium: {(nutrients.sodium).toFixed(2)} mg</li>
                        <li>Total Carbohydrate: {(nutrients.carbs).toFixed(2)}g</li>
                        <li>Dietary Fiber: {(nutrients.fiber).toFixed(2)} g</li>
                        <li>Sugar: {(nutrients.sugar).toFixed(2)} g</li>
                        <li>Protein: {(nutrients.protein).toFixed(2)} g</li>
                        <li>Fat: {nutrients.fat ? nutrients.fat.toFixed(1) + " g" : "-"}</li>
                        <li>Carbohydrates: {nutrients.carbohydrates ? nutrients.carbohydrates.toFixed(2) + "g" : "-"}</li>
                        <li>Fiber: {nutrients.fiber ? nutrients.fiber.toFixed(2) + " g" : "-"}</li>
                        <li>Sugar: {nutrients.sugar ? nutrients.sugar.toFixed(2) + " g" : "-"}</li>
                        <li> Weight per Serving : {nutrients.servingWeight} g</li>
                    </ul>
                </div>)}
        </div>
    );
}

export default Search;