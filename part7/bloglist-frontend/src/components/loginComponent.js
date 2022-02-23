import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button } from 'react-bootstrap'

export const LoginComponent = ({ setUsername, setPassword, handleLogin }) => {
  return(
    <Form onSubmit={handleLogin}>
      <h1>Login</h1>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          id='username-login'
          type="text"
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}/>
        <Form.Label>Password</Form.Label>
        <Form.Control
          id='password-login'
          type="password"
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby="passwordHelpBlock"></Form.Control>
        <Button variant="outline-primary" type="submit">Login</Button>
      </Form.Group>
    </Form>
  )
}