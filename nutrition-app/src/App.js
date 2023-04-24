import logo from './logo.svg';
import './App.css';
import Search from './Search';
import AddMeal from './AddMeal';
import Nav from './Nav';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <section>
          <header>
              <h1>MealMentor</h1>
          </header>
         <Nav></Nav>
          <div className="main">
            <Search></Search>
            <AddMeal></AddMeal>
            <div className='prevMeals'></div>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
