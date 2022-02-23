import React from 'react'

export const LoginComponent = ({ setUsername, setPassword, handleLogin }) => {
  return(
    <form onSubmit={handleLogin}>
            Username <input id='username-login' type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)}></input> <br />
            Password <input id='password-login' type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}></input> <br />
      <button type="submit">Login</button>
    </form>
  )
}