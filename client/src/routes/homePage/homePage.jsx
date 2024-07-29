import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Property, Hostel & Get Your Dream Place</h1>
          <p>
          Welcome to <span style="font-weight: bold; color: #2c3e50;">PropertyyHuntt</span>, your ultimate destination for finding the perfect property, whether it's a <span style="color: #3498db;">cozy hostel</span>, your <span style="color: #e74c3c;">dream home</span>, or a great <span style="color: #f39c12;">rental space</span>. At <span style="font-weight: bold; color: #2c3e50;">PropertyyHuntt</span>, we understand that finding the right place to live or invest in can be a daunting task. That's why we offer a comprehensive and user-friendly platform that connects you with the best properties tailored to your needs. Explore our extensive listings, complete with detailed descriptions and high-quality images, to find your ideal property. Whether you're searching for a <span style="color: #1abc9c;">vibrant city apartment</span>, a <span style="color: #9b59b6;">serene countryside retreat</span>, or a <span style="color: #f39c12;">budget-friendly hostel</span>, <span style="font-weight: bold; color: #2c3e50;">PropertyyHuntt</span> has got you covered. Start your journey with us today and discover the place you'll love to call home.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>1</h1>
              <h2>Year of Experience</h2>
            </div>
            <div className="box">
              <h1>5</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>500+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
