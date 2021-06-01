import React, { useState } from 'react'; //import React Component
import {AboutPage, ResourcesPage} from './About';
import AdoptPage from './AdoptPet';
import './App.css'; //import css file!

import SAMPLE_DOGS from './dogs.json'; //a sample list of dogs (model)

function App(props) {

  const pets = SAMPLE_DOGS; //pretend this was loaded externally or via prop

  return (
    <div>
      <header className="jumbotron jumbotron-fluid py-4">
        <div className="container">
          <h1>Adopt a Pet</h1>
        </div>
      </header>
    
      <main className="container">
        <div className="row">
          <div className="col-3">
            <AboutNav />
          </div>
          <div className="col-9">
            <PetList pets={pets} />
          </div>
        </div>
      </main>

      <footer className="container">
        <small>Images from <a href="http://www.seattlehumane.org/adoption/dogs">Seattle Humane Society</a></small>
      </footer>
    </div>
  );
}

function AboutNav() {
  return (
    <nav id="aboutLinks">
      <h2>About</h2>
      <ul className="list-unstyled">
        <li><a href="/">Adopt a Pet</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/resources">Resources</a></li>
      </ul>
    </nav>
  );
}

function PetList(props) {
  let pets = props.pets || []; //handle if not provided a prop
  let petCards = pets.map((pet) => {
    return <PetCard key={pet.name} pet={pet} />;
  })

  return (
    <div>
      <h2>Dogs for Adoption</h2>
      <div className="card-deck">
        {petCards}
      </div>
    </div>
  );
}

function PetCard(props) {

  const handleClick = () => {
    console.log("You clicked on", props.pet.name);
  }

  let pet = props.pet; //shortcut
  return (
    <div className="card clickable" onClick={handleClick}>
      <img className="card-img-top" src={pet.images[0]} alt={pet.name} />
      <div className="card-body">
        <h3 className="card-title">{pet.name} {pet.adopted ? '(Adopted)' : ''}</h3>
        <p className="card-text">{pet.sex} {pet.breed}</p>
      </div>
    </div>
  );
}

export default App;
