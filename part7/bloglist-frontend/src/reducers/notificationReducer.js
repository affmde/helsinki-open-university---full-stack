import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers:{
    showNotification(state, action){
      return action.payload
    },
    hideNotification(state, action){
      return action.payload
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions


export const notification = (content) => {
  return async dispatch => {
    dispatch(showNotification(content))
    setTimeout(() => {
      dispatch(hideNotification(''))
    }, 3000)
  }
}

export default notificationSlice.reducer