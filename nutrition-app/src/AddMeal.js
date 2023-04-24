import './AddMeal.css';

function AddMeal(props) {
  return (
    <div className='addMeal'>
        <h2> Add a Meal </h2>
        <form>
            <label> Enter Ingredients in the Meal: </label>
            <input type="text" id="meal-add" name="meal-add"/>
            <input type="submit" value="Enter"/> 
        </form>
        <div id="meal-results">

        </div>
    </div>
  );
}

export default AddMeal;