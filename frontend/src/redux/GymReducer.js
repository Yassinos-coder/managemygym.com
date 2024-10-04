import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosDefault  from "../utils/AxiosDefault";
import { DecryptData } from "../utils/DecryptData";


export const GetGymData = createAsyncThunk('gym/GetGymData', async ({ uuid }) => {
    try {
        const response = await AxiosDefault.get(`GetGymData/${uuid}`)
        let DecryptedData = await DecryptData(response.data)
        return DecryptedData
    } catch (err) {
        console.error(`Error in GetGymData ${err.message}`)
        throw err;
    }
})


export const AddGym = createAsyncThunk('gym/AddGym', async({NewGym}) => {
    try {
        const response = await AxiosDefault.post('AddGym', NewGym)
        let DecryptedData = await DecryptData(response.data)
        return DecryptedData
    } catch (err) {
        console.error(`Error in AddGym ${err.message}`)
        throw err;
    }
})




const GymReducer = createSlice({
    name: 'GymActionsHandler',
    initialState: {
        GymData: [],
        status: '',
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(GetGymData.fulfilled, (state, action) => {
            state.GymData = action.payload
            state.status = 'accepted'
        })
        .addCase(GetGymData.pending, (state ) => {
            state.status = 'pending'
        })
        .addCase(GetGymData.rejected, (state) => {
            state.status = 'rejected'
        })
        .addCase(AddGym.fulfilled, (state, action) => {
            state.GymData = action.payload
            state.status = 'accepted'
        })
        .addCase(AddGym.pending, (state ) => {
            state.status = 'pending'
        })
        .addCase(AddGym.rejected, (state) => {
            state.status = 'rejected'
        })
    }
})

export default GymReducer.reducer