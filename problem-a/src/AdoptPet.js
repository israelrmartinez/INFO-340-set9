import React from 'react';
import { UncontrolledCarousel, Button } from 'reactstrap';
import _ from 'lodash';

import SAMPLE_DOGS from './dogs.json'; //a sample list of dogs (model)
import { useParams } from 'react-router';

function AdoptPage(props) {
  let {petName} = useParams(); //REPLACE THIS WITH CORRECT VALUE
  console.log(petName)

  //pretend we loaded external data    
  let pet =  _.find(SAMPLE_DOGS, {name: petName}); //find pet in data

  if(!pet) return <h2>No pet specified</h2> //if unspecified

  //make a bootstrap carousel (because its fun)
  let carouselItems = pet.images.map(function(img){
    let obj = { src: '../'+img, altText: pet.name, caption: '' };
    return obj;
  })

  return (
    <div>
      <h2>Adopt {pet.name}</h2>
      <p className="lead">{pet.sex} {pet.breed}</p>
      <UncontrolledCarousel
        items={carouselItems} 
        indicators={false}
        controls={true}
        />
      <Button disabled size="large" color="primary">Adopt me now!</Button>
    </div>
  );
}

export default AdoptPage;