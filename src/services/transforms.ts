import { User } from '../state/user/@types'
import { LoginResponse } from './@types'

export function xformLoginResponse(resp: LoginResponse): User {
    return {
        username: resp.username,
        lastName: resp.last_name,
        firstName: resp.first_name,
        email: resp.email,
    }
}
