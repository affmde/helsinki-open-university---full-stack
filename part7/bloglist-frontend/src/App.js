import React, { useState, useEffect, useRef } from 'react'
import { BlogsComponent } from './components/blogsComponent'
import { CreateBlogFormComponent } from './components/createBlogFormComponent'
import { MessageComponent } from './components/messageComponent'
import { LoginComponent } from './components/loginComponent'
import blogService from './services/blogs'
import loginService from './services/login'
import { ToggleVisibilityComponent } from './components/toggleVisibilityComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from './reducers/blogReducer'
import { notification } from './reducers/notificationReducer'
import { loggedUser } from './reducers/userReducer'
import { Users } from './components/UsersComponent'
import { getAllUsers } from './reducers/usersReducer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { User } from './components/userComponent'
import { BlogDisplay } from './components/blogDisplay'
import { NavBar } from './components/nav'




const App = () => {
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const fullState = useSelector(state => state)
  const blogsFormRef = useRef()


  const handleLogin = async (e) => {
    e.preventDefault()

    try{
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      dispatch(loggedUser(user))
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(notification({ type: 'success', message: 'Login completed' }))
      setUsername('')
      setPassword('')
    }catch(error){
      console.log(error)
      dispatch(notification({ type: 'error', message: 'Wrong username or password' }))
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()

    try{
      window.localStorage.removeItem('loggedUser')
      dispatch(loggedUser(null))
      dispatch(notification({ type: 'success', message:'Logout completed!' }))
    }catch(error){
      dispatch(notification({ type: 'error', message:'Not able to logout at the momment' }))
    }
  }

  useEffect(() => {
    dispatch(getBlogs())
    dispatch(getAllUsers())
  }, [JSON.stringify(fullState), fullState.length])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedUser')
    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      dispatch(loggedUser(user))
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
    <BrowserRouter>
      <h1>Welcome {user.name}</h1>
      <MessageComponent message={message} />
      <NavBar handleLogout={handleLogout}/>
      <ToggleVisibilityComponent show={show} setShow={setShow} ref={blogsFormRef}>
        <CreateBlogFormComponent user={user}  blogsFormRef={blogsFormRef}/>
      </ToggleVisibilityComponent>
      <Routes>
        <Route path='/' element={<BlogsComponent handleLogout={handleLogout} setMessage={setMessage} user={user} />}></Route>
        <Route path='/users' element={<Users />}></Route>
        <Route path='/user/:id' element={<User users={users}/>}></Route>
        <Route path='/blogs/:id' element={<BlogDisplay />}></Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App