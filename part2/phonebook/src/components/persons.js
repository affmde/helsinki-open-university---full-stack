import React from "react";
import { Person } from "./person";

export const Persons = ({persons, deletePerson}) =>{
    return(
        persons.map(person=>{
            return(
                <table key={person.id}>
                    <tbody>
                        <Person key={person.id} person={person} deletePerson={deletePerson} />
                    </tbody>
                </table>
            )
        })
    )
}