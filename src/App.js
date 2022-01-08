import './App.css';
import React from 'react'
import Weather from './components/Weather.js'
import {useEffect, useState} from 'react' 
import { CarouselProvider, Slider } from "pure-react-carousel";
import 'pure-react-carousel/dist/react-carousel.es.css';
import CustomDotGroup from './components/CustomDotGroup'
import {Input } from 'semantic-ui-react'


export default function App() {
  const[lat, setLat] =  useState([])
  const[lon, setLon] = useState([])
  const[data, setData] = useState([])

  useEffect(()=> {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position){
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
      })

      await fetch(`${process.env.REACT_APP_API_URL}/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
      });
    }
    fetchData()

  }, [lat, lon])

  let content = []

  if(typeof data.daily != 'undefined') {
    for(let i = 0; i < 5; i++) {
     content.push(<Weather weatherData={data.daily[i]} index={i}/>)
   }
  }

  return (
        <div className="app">
          <h1>My Weather App</h1>

          <CarouselProvider
          naturalSlideWidth={1}
          naturalSlideHeight={1.5}
          totalSlides={5}
          style={{ width: "300px" }}
          >
            <Slider>
              {(typeof data.daily != 'undefined') ? (content) :  (<div>Data Loading...</div>)}
            </Slider>
            <CustomDotGroup slides={5} />
          </CarouselProvider>
          <div className="location">
            <p>Latitude: {lat}</p>
            <p>Longitude: {lon}</p>
          </div>
        </div>  
  );
}

