import React, { useState } from 'react'; //import React Component
import {AboutPage, ResourcesPage} from './About';
import AdoptPage from './AdoptPet';
import './App.css'; //import css file!
import { BrowserRouter as Router, Switch, Route, Link, Redirect, NavLink } from "react-router-dom";

import SAMPLE_DOGS from './dogs.json'; //a sample list of dogs (model)

function App(props) {

  const pets = SAMPLE_DOGS; //pretend this was loaded externally or via prop

  return (
    <div>
      <header className="jumbotron jumbotron-fluid py-4">
        <div className="container">
            <Link to="/"><h1>Adopt a Pet</h1></Link>
        </div>
      </header>
    
      <main className="container">
        <div className="row">
          <div className="col-3">
            <AboutNav />
          </div>
          <div className="col-9">
              <Switch>
                <Route exact path="/"> <PetList pets={pets}/> </Route>
                <Route path="/about"> <AboutPage/> </Route>
                <Route path="/resources"><ResourcesPage/></Route>
                <Route path="/adopt/:petName"><AdoptPage/></Route>
                <Redirect to="/"></Redirect>
              </Switch>
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
        <li><NavLink exact to="/" activeClassName="activeLink">Adopt a Pet</NavLink></li>
        <li><NavLink exact to="/about" activeClassName="activeLink">About Us</NavLink></li>
        <li><NavLink exact to="/resources" activeClassName="activeLink">Resources</NavLink></li>
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
  const [redirectTo, setRedirectTo] = useState(undefined);

  const handleClick = () => {
    setRedirectTo('/adopt/' + props.pet.name);
  }

  if (redirectTo != undefined) {
    return (<Redirect push to={redirectTo} />);
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
