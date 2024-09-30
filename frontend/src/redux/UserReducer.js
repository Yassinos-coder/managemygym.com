import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosDefault } from '../utils/AxiosDefault';
import CryptoJS from 'crypto-js';


export const Login = createAsyncThunk('users/login', async ({ loginData }) => {
    try {
        const response = await AxiosDefault.post('login', loginData);
        console.log(response.data);
        var bytes = CryptoJS.AES.decrypt(response.data.encryptedData, import.meta.env.VITE_ENCRYPTION_KEY);
        var decryptedString = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedString) {
            throw new Error('Decryption failed: Invalid or empty encrypted data');
        }

        var decryptedData = JSON.parse(decryptedString);

        console.log(decryptedData)
        return decryptedData; // Parse the decrypted JSON
    } catch (err) {
        console.error(`Error in UserLogin: ${err.message}`);
        throw err; // Ensure to propagate the error
    }
});

export const Signup = createAsyncThunk('users/Signup', async ({ newUser }) => {
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
        userData: [],
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
                console.log("reducer", action.payload)
                state.userData = action.payload.userData
                state.status = 'accepted'
            })
            .addCase(Login.pending, (state,) => {
                state.status = 'pending'
            })
            .addCase(Login.rejected, (state, action) => {
                state.status = `refused ${action.payload.error}`
            })
            .addCase(Signup.fulfilled, (state,) => {
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