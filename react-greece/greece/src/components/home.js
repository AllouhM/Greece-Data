import React from "react";

const Home = () => {
  return (
    <div>
      <h1>How to use this App.....?</h1>
      <p>
        {" "}
        This app mainly providing user with information about houses for sales
        in Greece country Athens - Center city
      </p>
      <ul>
        <li> To see all inquiries for Athens - Center go to </li>
        <a href="http://localhost:3000/show">http://localhost:3000/show</a>
        <li>
          To contribute to the list you can go to
          http://localhost:3000/contribute and add your json{" "}
        </li>{" "}
        <a href="http://localhost:3000/contribute">
          http://localhost:3000/contribute
        </a>
      </ul>
    </div>
  );
};
export default Home;
