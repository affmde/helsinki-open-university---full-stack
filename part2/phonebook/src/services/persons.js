import Axios from "axios";


const url="/api/persons";

const getAll = () =>{
    Axios.get(url).then(res=>{
        return res.data
    })
}

const postPerson = (newPerson) =>{
    return Axios.post(url, newPerson)
}

const update = (id, newPerson) => {
    return Axios.put(`${url}/${id}`, newPerson)
  }

const deletePerson = (id) =>{
    return Axios.delete(`${url}/${id}`)
}

  export default {getAll, postPerson, update, deletePerson}