import { createSlice } from "@reduxjs/toolkit"

const initialState={
    data:{
        content: "yyyyy",
        style:{
            display: 'none'
        }
    }
    
}
let timeout=null


const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        displayNotification (state, action) {
            return{
                data:{
                    content: action.payload,
                    style:{
                        border: 'solid',
                        padding: 10,
                        borderWidth: 1,
                        marginBottom: 15
                    }
                }
            }
        },
        hideNotification(state, action){
            return initialState
        }
    }

})

export const {displayNotification, hideNotification} = notificationReducer.actions

export const setNotification = (content, time) =>{
    return async dispatch =>{
        if(timeout){
            clearTimeout(timeout)
        }
        dispatch(displayNotification(content))
        timeout= setTimeout(()=>{
            dispatch(hideNotification())
        },time*1000)
    }
}
export default notificationReducer.reducer