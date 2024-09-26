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


const UserReducer = createSlice({
    name: 'UserActionHandler',
    initialState: {
        UserData: [],
        status: null,
    },
    reducers: {},
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
    }
})

export default UserReducer.reducer