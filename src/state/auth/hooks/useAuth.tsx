import React from 'react'
import { useAppSelector } from '../../store'
import { selectAuthenticatedUser } from '../selectors'

export function useAuth() {
    const user = useAppSelector(selectAuthenticatedUser)

    const isLoggedIn = React.useMemo(() => {
        return user !== undefined
    }, [user])

    return { user, isLoggedIn }
}
