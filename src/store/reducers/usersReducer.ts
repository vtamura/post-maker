import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import IUsers from '../../@types/users'
import axios from '../../services/api'
import { AxiosError } from 'axios'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get('/users')
        return response.data
    } catch (err) {
        const error = err as AxiosError
        return error.message
    }
})

const initialState: IUsers[] = []

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, { payload }) => payload)
    },
})

export const showAllUsers = (state: RootState) => state.users

export default userSlice.reducer
