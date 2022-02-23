import React from "react";

export const FilterName = ({setNameFilter})=>{
    return(
        <input type="text" onChange={(e)=>setNameFilter(e.target.value)} placeholder="filter by name"></input>
    )
}