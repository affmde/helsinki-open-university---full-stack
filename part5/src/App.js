import React, { useState, useEffect, useRef } from 'react'
import { BlogsComponent } from './components/blogsComponent'
import { CreateBlogFormComponent } from './components/createBlogFormComponent'
import { MessageComponent } from './components/messageComponent'
import { LoginComponent } from './components/loginComponent'
import blogService from './services/blogs'
import loginService from './services/login'
import { ToggleVisibilityComponent } from './components/toggleVisibilityComponent'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [show, setShow] = useState(false)

  const blogsFormRef = useRef()
  const handleLogin = async (e) => {
    e.preventDefault()

    try{
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    }catch(error){
      setMessage({ type: 'error', message: 'Wrong username or password' })
      setTimeout(() => {
        setMessage(null)
        console.log(error)
      },3000)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()

    try{
      window.localStorage.removeItem('loggedUser')
      setUser(null)
      setMessage({ type: 'success', message:'Logout completed!' })
      setTimeout(() => {
        setMessage(null)
      },1000)
    }catch(error){
      setMessage({ type: 'error', message:'Not able to logout at the momment' })
      setTimeout(() => {
        setMessage(null)
        console.log(error)
      },3000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [JSON.stringify(blogs)])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  if(user===null){
    return(
      <div>
        <MessageComponent message={message} />
        <LoginComponent setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
      </div>

    )
  }

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <MessageComponent message={message} />
      <ToggleVisibilityComponent show={show} setShow={setShow} ref={blogsFormRef}>
        <CreateBlogFormComponent user={user} setBlogs={setBlogs} blogs={blogs} setMessage={setMessage} blogsFormRef={blogsFormRef}/>
      </ToggleVisibilityComponent>
      <BlogsComponent blogs={blogs} handleLogout={handleLogout} setMessage={setMessage} user={user} setBlogs={setBlogs}/>
    </div>
  )
}

export default App