import './Search.css';

function Search(props) {
  return (
    <div className="search">
        <h2>Search for Foods</h2>
        <form id="food-search-form">
            <label for="food-search">Search for Foods:</label>
            <input type="text" id="food-search" name="food-search"/>
            <input type="submit" value="Search"/>
        </form>
        <div id="food-results">
            {/* <!-- Display search results here --> */}
        </div>
    </div>
  );
}

export default Search;