import { RootState } from '../store'

export const selectAuthenticatedUser = (state: RootState) => state.auth.user
