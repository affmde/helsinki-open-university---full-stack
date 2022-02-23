import React, {useState, useEffect} from "react";
import {Weather} from './weather'
import Axios from 'axios';


export const Country = ({country, display, setFilterName}) =>{

    const weatherKey=process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState({})
    useEffect(()=>{
        if(display.length !== 1) return;
        Axios.get(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${country.capital[0]}&appid=${weatherKey}`).then(res=>{
            setWeather(res.data);
        })
    },[display.length])


    const lang = Object.values(country.languages);
    
    const filterButton = (name)=>{
        setFilterName(name)
    }

    
    if(display.length===1){
        return(
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
                <h3>Languages</h3>
                <ul>
                    {lang.map(language=><li key={language}>{language}</li>)}
                </ul>
                <img alt="flag" src={country.flags.png}></img>
                <Weather weather={weather} country={country}/>
            </div>
        )
    }


        return(
            <table>
                <tbody>
                    <tr>
                        <td>{country.name.common}</td>
                        <td><button onClick={()=>filterButton(country.name.common)}>show</button></td>
                    </tr>
                </tbody>
            </table>
        )
        
    }
    