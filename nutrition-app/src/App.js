import './App.css';
import Search from './Search';
import AddMeal from './AddMeal';
import Nav from './Nav';
import About from './About';
import { useState } from 'react';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const searchFood = async (query) => {
    const response = await fetch(`https://api.nutritionix.com/v1_1/search/${query}?results=0:20&fields=item_name,brand_name,nf_calories,nf_total_fat,nf_protein,nf_total_carbohydrate,nf_serving_size_unit&appId=25850a88&appKey=037a99010fc1334604cd90034de61eaa`);
    const data = await response.json();
    setSearchResults(data.hits);
  };

  return (
    <div className="App">
      <header className="App-header">
          <h1>MealMentor</h1>
      </header>
      <section>
        <Nav/>
        <About/>
        <Search searchFood={searchFood} searchResults={searchResults}/>
        <AddMeal/>
    </section>
    </div>
  );
}

export default App;
