import { createSlice } from '@reduxjs/toolkit'
// import { registration, login } from ''

// initialize userToken from local storage
const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null

const initialState = {
  loading: false,
  userInfo: null,
  token,
  error: null,
  success: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('token') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.token = null
      state.error = null
    },
    setUser: (state, action) => {
      state.userInfo = action.payload.user
      state.token = action.payload.accesToken
    },
    setError: (state,action) => {
      state.error = action.payload
    },
    clearError: (state) =>{
      state.error = null
    }
    
  },
})

export const { logoutUser, setUser, setError, clearError } = userSlice.actions

export default userSlice.reducer