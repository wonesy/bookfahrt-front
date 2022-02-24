import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Credentials } from '../state/auth/@types'
import { User } from '../state/user/@types'
import { LoginResponse } from './@types'
import { xformLoginResponse } from './transforms'

export const apiService = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/',
    }),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        // auth
        login: build.mutation<User, Credentials>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response: LoginResponse) =>
                xformLoginResponse(response),
            invalidatesTags: ['Auth'],
        }),
        logout: build.mutation<void, string>({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
})

export const { useLoginMutation, useLogoutMutation } = apiService
export const apiReducer = apiService.reducer
