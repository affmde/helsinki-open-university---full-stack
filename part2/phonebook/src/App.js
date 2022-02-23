import React, { useState, useEffect } from 'react';
import { Header } from './components/header';
import { Form } from './components/form';
import { Persons } from './components/persons';
import { FilterName } from './components/filterName';
import Axios from 'axios';
import personsService from './services/persons'
import { Message } from './components/message';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(()=>{
    Axios.get("/api/persons").then(response=>{
      console.log(response)
      setPersons(response.data)
    })
  },[])


  const [newName, setNewName] = useState('');
  const [number, setNumber]=useState('');
  const [nameFilter, setNameFilter]= useState('');
  const [message, setMessage] = useState(null)

  const showPersons = nameFilter==="" ? persons : persons.filter(person=>person.name.toLowerCase().includes(nameFilter.toLowerCase()))
 
  const addPerson =(e)=>{
    e.preventDefault();
    const newPerson={
      name: newName,
      number: number
    }
    const person = persons.find(person=>person.name===newPerson.name)
    console.log(person)
    if(person){
      const confirm= window.confirm(`User ${newPerson.name} already exists. Do you want to replace him/her?`)
      if(confirm){
        return personsService.update(person.id, newPerson).then(res=>{
          setPersons(persons.map(pers=>pers.id !== person.id ? pers : {...pers, number: res.data.number}))
          setMessage({
            type: 'success',
            text: 'Person edited'
          })
          setTimeout(()=>{
            setMessage(null)
          }, 3000) 
          document.getElementById('input').reset();
        }).catch(err=>{
          setMessage({
            type: 'error',
            text: "Error occurer while editing the person"
          })
          setTimeout(()=>{
            setMessage(null)
          }, 3000) 
          document.getElementById('input').reset();
        })
      }else{
        return
      }
    }
    personsService.postPerson(newPerson).then(res=>{
      setPersons(persons.concat(res.data));
      setMessage({
        type: 'success',
        text: 'Person added'
      })
      setTimeout(()=>{
        setMessage(null)
      }, 3000) 
      setNewName('')
    }).catch(err=>{
      setNewName('')
      console.log(err.response.data)
      const txt =err.response.data.error.toString()
      setMessage({
        type: 'error',
        text: txt
      })
      setTimeout(()=>{
        setMessage(null)
      }, 3000) 
    })
    
    document.getElementById('input').reset();
  }

  const deletePerson = (id) =>{
    const confirm= window.confirm('Are you sure you want to delete this person?');
    if(confirm){
      personsService.deletePerson(id).then(res=>{
        setMessage({
          type: 'success',
          text: 'Person deleted successfully'
        })
        setTimeout(()=>{
          setMessage(null)
        }, 3000) 
        setPersons(persons.filter(person=>person.id !==id))
      }).catch(err=>{
        setMessage({
          type: "error",
          text: "Person has been already deleted"
        })
        setTimeout(()=>{
          setMessage(null)
        }, 3000);
        setPersons(persons.filter(person=>person.id !==id))
      })
    }
  }


  return (
    <div>
      <Header text="Phonebook" />
      <Message message={message} />
      <FilterName setNameFilter={setNameFilter} />
      <Form addPerson={addPerson} setNewName={setNewName} setNumber={setNumber} />
      <Header text="Phone" />
      <Persons persons={showPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
