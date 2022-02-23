import React from "react";

export const Weather = ({weather, country})=>{

    if(weather.name){
        return(
            <div>
                <h3>Weather in Capital {country.capital[0]}</h3>
                <p>Temperatue: {Math.floor(weather.main.temp)} celsius</p>
                <img alt="weather" src={"http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png"}></img>
                <p>wind: {weather.wind.speed} m/sec</p>
            </div>
        )
    } 

    return null
}

