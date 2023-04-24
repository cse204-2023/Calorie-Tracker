import './About.css';

function About(props) {
  return (
    <div className="about">
        <h2> About </h2>
        <p> 
            MealMentor is an app that provides its users with information on 
            the nutritional content of their meals and ensure they meet 
            their dietary needs and restrictions. It's aim is to promote better health
            and diet while keeping meals as tasty as possible. 
        </p>
        <p>
            You can search for different foods to find out about their indiviaul nutritional content,
            or enter a meal and let us break it down and inform you of the nutritional content of the
            meal. In addition, you can enter your allergies, ilnesses and more to see what foods you 
            should and should not be consuming.
        </p>
    </div>  
  );
}

export default About;