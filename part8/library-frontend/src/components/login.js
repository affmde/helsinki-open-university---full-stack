import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { Login } from "../App"


export const LoginComponent = ({setToken, show, token}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(Login, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(()=>{
        if(result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('booklist-user', token)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    const handleLogin = (e) =>{
        e.preventDefault()
        login({variables: {username, password}})
        document.getElementById('loginForm').reset()
    }

    if(!show){
        return null
    }

    if(token){
        return null
    }

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin} id="loginForm">
                <div>
                    <input type="text" placeholder="username" onChange={e=>setUsername(e.target.value)}/> 
                </div>
                <div>
                    <input type="password" placeholder="password" onChange={e=> setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>

    )
}