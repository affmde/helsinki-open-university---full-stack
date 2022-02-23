import React from 'react';


export const Message = ({message})=>{

    const error = {
        color:"white",
        backgroundColor:"red",
        width:"50%",
        fontSize:20,
        marginBottom:5,
        padding: "10px 20px"
    }

    const success={
        color:"green",
        width:"50%",
        fontSize:20,
        marginBottom:5,
        border: "1px solid darkgreen",
        padding: "10px 20px"
    }

    if(message===null)return null

    return(
        <div style={message.type === "error" ? error : success}>
            {message.text}
        </div>
    )
}