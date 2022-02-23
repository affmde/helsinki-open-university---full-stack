import React from "react";

export const Form =({addPerson, setNewName, setNumber})=>{
    return(
        <form id="input" onSubmit={addPerson}>
            <h5>Add a new Person</h5>
            <div>
                name: <input onChange={(e)=>setNewName(e.target.value)}/>
            </div>
            <div>
                phone: <input placeholder="xxx-xxxxxxxx" onChange={(e)=>setNumber(e.target.value)}></input>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
    
}