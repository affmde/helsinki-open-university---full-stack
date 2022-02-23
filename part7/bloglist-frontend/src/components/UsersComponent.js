import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from 'react-bootstrap'

export const Users = () => {

  const users = useSelector(state => state.users)
  const array = [...users]

  const links ={
    textDecoration: 'none'
  }

  return(
    <div>
      <h2>Users</h2>
      <Table striped bordered hover size="sm">
        <tbody>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
          {array.map(user =>
            <tr key={user.id}>
              <td><Link to={`/user/${user.id}`} style={links}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}