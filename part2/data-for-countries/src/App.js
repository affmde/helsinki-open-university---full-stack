import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {FilterCountries} from './components/filterCountries';
import { DisplayCountry } from './components/displayCountry';

function App() {

  const [countries, setCountries]= useState([])
  const [filterName, setFilterName] = useState("");
  const filteredCountries = filterName ==="" ? countries : countries.filter(country=>country.name.common.toLowerCase().includes(filterName.toLowerCase()))
  

  useEffect(()=>{
    Axios.get("https://restcountries.com/v3.1/all").then(res=>{
      console.log(res);
      setCountries(res.data)
    })
  },[])

  return (
    <div className="App">
      <FilterCountries countries={countries} setFilterName={setFilterName} />
      <DisplayCountry display={filteredCountries} setFilterName={setFilterName}/>
    </div>
  );
}

export default App;
