import React from "react";
import { Country } from "./country";

export const FilterCountries = ({countries, setFilterName})=>{
    return(
        <div>
            Find Countries<input type="text" onChange={(e)=>setFilterName(e.target.value)}></input>
        </div>
    )
}