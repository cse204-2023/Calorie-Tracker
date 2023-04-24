import './Nav.css';

function Nav(props) {
  return (
    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Search Foods</a></li>
            <li><a href="#">My Meals</a></li>
            <li><a href="#">My Dietary Restrictions</a></li>
        </ul>
    </nav>
  );
}

export default Nav;