import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import { apiReducer, apiService } from '../services/apiService'
import authReducer from './auth/slice'

export const createStore = (
    options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
    configureStore({
        reducer: {
            auth: authReducer,
            // services
            [apiService.reducerPath]: apiReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiService.middleware),
        ...options,
    })

export const store = createStore()

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
