import React, { useEffect, useMemo, useReducer } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useRegisterMutation } from '../services/apiService'
import { useAuth } from '../state/auth/hooks/useAuth'
import { Flex, FlexItem } from './flex'

type RegistrationState = {
    username?: string | undefined
    firstName?: string | undefined
    lastName?: string | undefined
    email?: string | undefined
    password?: string | undefined

    // errors
    usernameErrorMessage?: string | undefined
    passwordErrorMessage?: string | undefined
}

type RegistrationAction = {
    type:
        | 'UPDATE_USERNAME'
        | 'UPDATE_FIRST_NAME'
        | 'UPDATE_LAST_NAME'
        | 'UPDATE_PASSWORD'
        | 'UPDATE_EMAIL'
        | 'SET_USERNAME_ERR'
        | 'SET_PASSWORD_ERR'
    payload: string | undefined
}

function registrationReducer(state: RegistrationState, action: RegistrationAction) {
    switch (action.type) {
        case 'UPDATE_USERNAME':
            let uerr = state.usernameErrorMessage
            if (action.payload && action.payload !== '') {
                uerr = undefined
            }
            return {
                ...state,
                username: action.payload,
                usernameErrorMessage: uerr,
            }
        case 'UPDATE_FIRST_NAME':
            return { ...state, firstName: action.payload }
        case 'UPDATE_LAST_NAME':
            return { ...state, lastName: action.payload }
        case 'UPDATE_EMAIL':
            return { ...state, email: action.payload }
        case 'UPDATE_PASSWORD':
            let perr = state.passwordErrorMessage
            if (action.payload && action.payload !== '') {
                perr = undefined
            }
            return {
                ...state,
                password: action.payload,
                passwordErrorMessage: perr,
            }
        case 'SET_USERNAME_ERR':
            return { ...state, usernameErrorMessage: action.payload }
        case 'SET_PASSWORD_ERR':
            return { ...state, passwordErrorMessage: action.payload }
        default:
            return state
    }
}

export function FormItemLabel({ label, required }: { label: string; required?: boolean }) {
    return (
        <FlexItem shrink={1}>
            <label
                style={{
                    whiteSpace: 'nowrap',
                    minWidth: '100px',
                    paddingRight: '10px',
                    display: 'inline-block',
                    textAlign: 'left',
                }}
            >
                {label}

                {required ? <span style={{ color: 'red', paddingLeft: '5px' }}>*</span> : null}
            </label>
        </FlexItem>
    )
}

type RegistrationFormProps = {
    invitation: string | null
}

export function RegistrationForm({ invitation }: RegistrationFormProps) {
    const [register, { isLoading: isRegistering }] = useRegisterMutation()
    const [state, dispatch] = useReducer(registrationReducer, {})

    const handleSubmit = () => {
        let shouldSubmit = true
        if (!state.username || state.username === '') {
            dispatch({
                type: 'SET_USERNAME_ERR',
                payload: 'Username must not be empty',
            })
            shouldSubmit = false
        }

        if (!state.password || state.password === '') {
            dispatch({
                type: 'SET_PASSWORD_ERR',
                payload: 'Password must not be empty',
            })
            shouldSubmit = false
        }

        if (!isRegistering && shouldSubmit) {
            register({
                ...state,
                username: state.username!,
                password: state.password!,
            })
        }
    }

    const unErr = useMemo(() => {
        if (state.usernameErrorMessage) {
            return {
                content: state.usernameErrorMessage,
                pointing: 'below',
            }
        }
        return null
    }, [state.usernameErrorMessage])

    const pwErr = useMemo(() => {
        if (state.passwordErrorMessage) {
            return {
                content: state.passwordErrorMessage,
                pointing: 'below',
            }
        }
        return null
    }, [state.passwordErrorMessage])

    return (
        <>
            <Form size="large">
                <Form.Field>
                    <Flex>
                        <FormItemLabel label="Username" required />
                        <FlexItem grow={1}>
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="Enter username"
                                error={unErr}
                                onChange={(e) => {
                                    dispatch({
                                        type: 'UPDATE_USERNAME',
                                        payload: e.currentTarget.value,
                                    })
                                }}
                            />
                        </FlexItem>
                    </Flex>
                </Form.Field>
                <Form.Field>
                    <Flex>
                        <FormItemLabel label="First name" />
                        <FlexItem grow={1}>
                            <Form.Input
                                fluid
                                icon="address card"
                                iconPosition="left"
                                placeholder="Enter first name"
                                onChange={(e) => {
                                    dispatch({
                                        type: 'UPDATE_FIRST_NAME',
                                        payload: e.currentTarget.value,
                                    })
                                }}
                            />
                        </FlexItem>
                    </Flex>
                </Form.Field>
                <Form.Field>
                    <Flex>
                        <FormItemLabel label="Last name" />
                        <FlexItem grow={1}>
                            <Form.Input
                                fluid
                                icon="address card"
                                iconPosition="left"
                                placeholder="Enter last name"
                                onChange={(e) => {
                                    dispatch({
                                        type: 'UPDATE_LAST_NAME',
                                        payload: e.currentTarget.value,
                                    })
                                }}
                            />
                        </FlexItem>
                    </Flex>
                </Form.Field>
                <Form.Field>
                    <Flex>
                        <FormItemLabel label="Email" />
                        <FlexItem grow={1}>
                            <Form.Input
                                fluid
                                icon="mail"
                                iconPosition="left"
                                placeholder="Enter email"
                                onChange={(e) => {
                                    dispatch({
                                        type: 'UPDATE_EMAIL',
                                        payload: e.currentTarget.value,
                                    })
                                }}
                            />
                        </FlexItem>
                    </Flex>
                </Form.Field>
                <Form.Field>
                    <Flex>
                        <FormItemLabel label="Password" required />
                        <FlexItem grow={1}>
                            <Form.Input
                                fluid
                                required
                                icon="lock"
                                iconPosition="left"
                                placeholder="Enter password"
                                type="password"
                                error={pwErr}
                                onChange={(e) => {
                                    dispatch({
                                        type: 'UPDATE_PASSWORD',
                                        payload: e.currentTarget.value,
                                    })
                                }}
                            />
                        </FlexItem>
                    </Flex>
                </Form.Field>

                <Button color="teal" fluid size="large" onClick={handleSubmit}>
                    Register
                </Button>
            </Form>
        </>
    )
}
