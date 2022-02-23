import React from "react";

export const Notification = ({message}) =>{

    const successStyle= {
        border: '1px solid darkGreen',
        padding: '10px 20px',
        color: 'green',
        backgroundColor: 'lightGrey'
    }

    if(!message) return null

    return (
        <div style={successStyle}>{message.content}</div>
    )
}