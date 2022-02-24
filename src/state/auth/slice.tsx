import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../user/@types'

export type AuthState = {
    user: User | undefined
}

const initialState: AuthState = {
    user: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload
        },
        deleteUser(state) {
            state = initialState
        },
    },
})

export const { setUser, deleteUser } = authSlice.actions

export default authSlice.reducer
