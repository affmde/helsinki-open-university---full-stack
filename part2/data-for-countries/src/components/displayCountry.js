import React from 'react';
import { Country } from './country';

export const DisplayCountry = ({display, setFilterName})=>{


    return(
        <div>
            {display.length>10 ? "Too many matches, specify another filter" : display.map(country=>
                <Country key={country.name.common} country={country} display={display} setFilterName={setFilterName}/>
            )}
        </div>
    )
}