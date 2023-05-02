import './App.css';
import Search from './Search';
import AddMeal from './AddMeal';
import Nav from './Nav';
import About from './About';
import { useState } from 'react';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [pastMeals, setpastMeals] = useState([]);

  const searchFood = async (query) => {
    // const response = await fetch(`https://api.nutritionix.com/v1_1/search/${query}?results=0:20&fields=item_name,brand_name,nf_calories,nf_total_fat,nf_protein,nf_total_carbohydrate,nf_serving_size_unit&appId=25850a88&appKey=037a99010fc1334604cd90034de61eaa`);
    // const response = await fetch(`https://api.nutritionix.com/v1_1/search/${query}?results=0:20&fields=item_name,brand_name,nf_calories,nf_total_fat,nf_protein,nf_total_carbohydrate,nf_serving_size_unit&appId=25850a88&appKey=037a99010fc1334604cd90034de61eaa&brand_id=513fbc1283aa2dc80c00000c`);
    const response = await fetch(`https://api.nutritionix.com/v1_1/search/${query}?results=0:20&fields=item_name,brand_name,nf_calories,nf_total_fat,nf_protein,nf_total_carbohydrate,nf_serving_size_unit&appId=25850a88&appKey=037a99010fc1334604cd90034de61eaa&fields=nf_calories,nf_total_fat,nf_protein,nf_total_carbohydrate`);
    const data = await response.json();
    setSearchResults(data.hits);
  };

  const addMeal = (meal) => {
    const updatedMeals = meal.ingredients.map(ingredient => {
      return {
        ...ingredient,
        calories: parseFloat(ingredient.calories),
        total_fat: parseFloat(ingredient.fat),
        protein: parseFloat(ingredient.protein),
        total_carbohydrate: parseFloat(ingredient.total_carbohydrate) || 0
      }
    });
    
    console.log(updatedMeals);
    setpastMeals([...pastMeals, { ...meal, ingredients: updatedMeals }]);
  }  

  return (
    <div className="App">
      <header className="App-header">
          <h1>MealMentor</h1>
      </header>
      <Nav/>
      <section>
        <About/>
        <Search searchFood={searchFood} searchResults={searchResults}/>
        <AddMeal addMeal={addMeal} pastMeals={pastMeals}/>
        <div className='past-meals'>
          <h2> Past Meals </h2>
          <div className='past-meals-container'>
          {pastMeals.map((meal,index) => (
            <div key={index} className='past-meal'>
                <h3> {meal.name} </h3>
                <p>Ingredients:</p>
                  {meal.ingredients.map((ingredient, index) =>(
                    <p key={index}>
                     <strong> {ingredient.name}  </strong> ({ingredient.weight}g)
                      <br/>
                      <ul className='nutrientList'>
                        <li> Calories: {(ingredient.calories).toFixed(1)} cal</li>
                        <li> Total Fat: {(ingredient.fat).toFixed(1)} g</li>
                        <li> Protein: {(ingredient.protein).toFixed(1)} g</li>
                        <li><span>Total Carbs: {(ingredient.carbs).toFixed(1)} g </span></li>
                      </ul>
                    </p>
                  ))}
                <p> Meal Date: {meal.date} </p>
            </div>
          ))}
          </div>
        </div>
    </section>
    </div>
  );
}

export default App;