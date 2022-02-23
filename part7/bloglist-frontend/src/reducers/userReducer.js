import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    getUser(state, action){
      return action.payload
    }
  }
})

export const { getUser } = userSlice.actions

export const loggedUser = (content) => {
  return async dispatch => {
    dispatch(getUser(content))
  }
}
export default userSlice.reducer