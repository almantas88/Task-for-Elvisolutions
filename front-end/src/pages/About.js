import React from "react";
import MenuDrawer from "../components/menuDrawer";

export default function About() {


  return (
    <div>
      <MenuDrawer />
      <h1 className="centerHeader">About</h1>
      <h2 className="centerHeader">This is my task for Elvisolutions.</h2>
      <h3 className="centerHeader">This code is taken from my internship project which I'm doing at the moment and it can be found here:</h3>
      <h2 className="centerHeader"><a href="https://github.com/almantas88/Bakalauras-back-end">Back-end</a></h2>
      <h2 className="centerHeader"><a href="https://github.com/almantas88/Bakalauras-front-end">Front-end</a></h2>
    </div>
  );
}
