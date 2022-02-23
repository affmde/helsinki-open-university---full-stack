import React from "react";

export const Person = ({person, deletePerson})=>{
    return(
        <tr>
            <td><p>{person.name} {person.number} </p></td>
            <td><button onClick={()=>{deletePerson(person.id)}}>Delete</button></td>
        </tr>
        
    )
}