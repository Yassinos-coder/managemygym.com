import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosDefault } from '../utils/AxiosDefault';


export const Login = createAsyncThunk('users/login', async ({ loginData }) => {
    try {
        const respone = await AxiosDefault.post('login', loginData)
        return respone.data
    } catch (err) {
        console.error(`Error in UserLogin ${err.message}`)
    }
})

export const Signup = createAsyncThunk('users/Signup', async({newUser}) => {
    try {
        const response = await AxiosDefault.post('newUser', newUser)
        return response.data
    } catch (err) {
        console.error(`Error in Signup reducer ${err.message}`)
    }
})


const UserReducer = createSlice({
    name: 'UserActionHandler',
    initialState: {
        UserData: [],
        status: null,
        isUserConnected: false,
    },
    reducers: {
        setUserConnected(state, action) {
            state.isUserConnected = action.payload; // payload should be true or false
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(Login.fulfilled, (state, action) => {
                state.UserData = action.payload.userData
                state.status = 'accepted'
            })
            .addCase(Login.pending, (state,) => {
                state.status = 'pending'
            })
            .addCase(Login.rejected, (state, action) => {
                state.status = `refused ${action.payload.error}`
            })
            .addCase(Signup.fulfilled, (state, action) => {
                state.UserData = action.payload.userData
                state.status = 'accepted'
            })
            .addCase(Signup.pending, (state,) => {
                state.status = 'pending'
            })
            .addCase(Signup.rejected, (state, action) => {
                state.status = `refused ${action.payload.error}`
            })
    }
})
export const { setUserConnected } = UserReducer.actions;

export default UserReducer.reducer