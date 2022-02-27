import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiService } from '../../services/apiService'
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
    extraReducers: (builder) => {
        builder.addMatcher(apiService.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.user = payload
        }),
            builder.addMatcher(apiService.endpoints.register.matchFulfilled, (state, { payload }) => {
                state.user = payload
            }),
            builder.addMatcher(apiService.endpoints.logout.matchFulfilled, (state, { payload }) => {
                state.user = undefined
            })
    },
})

export const { setUser, deleteUser } = authSlice.actions

export default authSlice.reducer
