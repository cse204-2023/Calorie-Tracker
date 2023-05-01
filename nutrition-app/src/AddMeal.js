import { useState } from 'react';
import './AddMeal.css';
import axios from 'axios';
import Search from './Search';

function AddMeal(props) {
  const [showForm, setShowForm] = useState(false);
  const [mealName, setMealName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [weight, setWeight] = useState('');
  const [mealDate, setMealDate] = useState('');

  const handleAddMeal = () => {
    setShowForm(true);
  };

  const handleMealNameChange = (event) => {
    setMealName(event.target.value);
  };

  const handleIngredientNameChange = (event) => {
    setIngredientName(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };
  
  const handleMealDateChange = (event) => {
    setMealDate(event.target.value);
  };  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // const meal = { name: mealName, ingredients: ingredients };
    // const meal = { name: mealName, date: mealDate, ingredients: ingredients };
    const meal = { name: mealName, date: mealDate, ingredients: ingredients, weight: weight };

    props.addMeal(meal);
    setShowForm(false);
    setMealName('');
    setIngredients([]);
    setMealDate('');
};
  
  const handleAddIngredient = async (event) => {
    event.preventDefault();
  
    if (ingredientName.trim() !== '' && weight !== '') {
      // var servingWeight = 2;

      try {
        const response = await axios.get(
          'https://api.nutritionix.com/v1_1/search/' + ingredientName,
          {
            params: {
              results: '0:1',
              fields: 'item_name,brand_name,nf_calories,nf_total_fat,nf_saturated_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_serving_weight_grams',
              appId: '25850a88',
              appKey: '037a99010fc1334604cd90034de61eaa',
            },
          }
        );

        const food = response.data.hits[0].fields;
        const weightInGrams = parseInt(weight);
        const servingWeight = food.nf_serving_weight_grams;

        console.log("Weight, weight in g, Serving Weight: ",weight, weightInGrams, servingWeight);

        const newIngredient = {
          name: food.item_name,
          weight: weightInGrams,
          calories: (food.nf_calories / servingWeight) * weightInGrams,
          fat: (food.nf_total_fat / servingWeight) * weightInGrams,
          saturatedFat: (food.nf_saturated_fat / servingWeight) * weightInGrams,
          cholesterol: (food.nf_cholesterol / servingWeight) * weightInGrams,
          sodium: (food.nf_sodium / servingWeight) * weightInGrams,
          carbs: (food.nf_total_carbohydrate / servingWeight) * weightInGrams,
          fiber: (food.nf_dietary_fiber / servingWeight) * weightInGrams,
          sugar: (food.nf_sugars / servingWeight) * weightInGrams,
          protein: (food.nf_protein / servingWeight) * weightInGrams,
        };
  
        setIngredients([...ingredients, newIngredient]);
        setIngredientName('');
        setWeight('');
      } catch (error) {
        console.log(error);
      }
    }
  };  
  
  return (
    <div className='addMeal'>
      <h2>Add a Meal</h2>
      {!showForm && (
        <button onClick={handleAddMeal}>Add a new meal</button>
      )}
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor='meal-name'>Meal Name:</label>
          <input type='text' id='meal-name' name='meal-name' value={mealName} onChange={handleMealNameChange} required />

          <label htmlFor='ingredients'>Ingredients:</label>
          {/* <div> */}
            <input type='text' id='ingredient-name' name='ingredient-name' value={ingredientName} onChange={handleIngredientNameChange} />
            <input type='text' id='food-weight' name='food-weight' placeholder='Weight in grams' value={weight} onChange={(event) => setWeight(event.target.value)} />
            <button onClick={handleAddIngredient}>Add</button>
          {/* </div> */}
          {/* {ingredients.map((ingredient, index) => (
            <div key={index}>
              <span>{ingredient.name}</span>
              <span> </span>
              <span>{ingredient.quantity}g</span>
            </div>

          ))} */}
          {ingredients.map((ingredient, index) => (
          <div key={index}>
            <span>{ingredient.name}</span>
            <span> </span>
            <span>{ingredient.weight}g</span>
            <span> </span>
            <span>{Math.round(ingredient.calories)} calories</span>
          </div>
          ))}
          <div>
            <label htmlFor='meal-date'>Meal Date:</label>
            <input type='date' id='meal-date' name='meal-date' value={mealDate} onChange={handleMealDateChange} required />
          </div>
          <input type='submit' value='Submit' />
        </form>
      )}
      <div id='meal-results'></div>
    </div>
  );
}

export default AddMeal;