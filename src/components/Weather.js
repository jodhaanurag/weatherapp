import React from 'react'
import moment from 'moment';
import { Card, Icon, Image } from 'semantic-ui-react'
import {useEffect, useState} from 'react' 
import PropTypes from "prop-types";
import { Slide } from "pure-react-carousel";

export default function Weather({weatherData, index}) {
	const [photos, setPhotos] = useState([]);
	useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${weatherData.weather[0].description}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        setPhotos(data?.results[0]?.urls?.small);
      })
      .catch((error) => console.log(error));

     return () => {
     	setPhotos([])
     }
  }, []);
	

	return(
		<Slide index={index}>
	    <div style={{ padding: 10 }}>
	      <Card>
		    <Image src={photos} wrapped ui={false} />
		    <Card.Content>
		      <Card.Header>{moment(weatherData.dt * 1000).calendar(null, {
					    sameDay: '[Today]',
					    nextDay: '[Tomorrow]',
					    nextWeek: 'dddd',
					    
					})
		    }</Card.Header>
		      <Card.Meta>
		      <span>{weatherData.weather[0].description}</span>
		      </Card.Meta>
		      <Card.Description>
		        <p>Min. Temperature: {weatherData.temp.min}&deg; C</p>
		        <p>Max. Temperature: {weatherData.temp.max}&deg; C</p>
		        <p>Humidity: {weatherData.humidity}%</p>
		        <p>Sunrise: {moment(weatherData.sunrise * 1000).format('h:mm a')}</p>
		        <p>Sunset: {moment(weatherData.sunset * 1000).format('h:mm a')}</p>
		      </Card.Description>
		    </Card.Content>
	  	</Card>
	    </div>
	  </Slide>
	
	)
}