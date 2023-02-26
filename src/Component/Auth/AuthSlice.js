import { createSlice } from "@reduxjs/toolkit";
import { Url_LogIn,Url_LogUp } from "../../FireBaseConfig";


export const signInAction = createAsyncThunk(
  "auth/signInAction",
  async (credentials) => {
    const response = await fetch(Url_LogIn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      throw new Error("Il y a eu un souci pour s'authentifier !")
    }

    const data = await response.json()
    
    return data 
  }
)

export const signUpAction = createAsyncThunk(
  "auth/signUpAction",
  async (credentials) => {
    const response = await fetch(Url_LogUp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      throw new Error("Il y a eu un souci pour s'authentifier !")
    }

    const data = await response.json()

    return data
  }
)



const authSlice = createSlice({
  name:"auth",
  initialState:{
    user:null,
    isLoading:false,
    error:null
  },
  reducers:{
    setUser(state, action) {
      state.user = action.payload
      localStorage.setItem('token', action.payload.idToken)
    },
    removeUser(state) {
      state.user = null
      localStorage.removeItem('token')
    }
  },
  extraReducers: (builder) => {

    builder.addCase(signInAction.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
    })

    builder.addCase(signUpAction.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
    })

  }
})

export const { setUser, removeUser } = authSlice.actions

export default authSlice.reducer