import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useLoginMutation } from '../services/apiService'
import { Flex, FlexItem } from './flex'
import { FormItemLabel } from './RegistrationForm'

export function LoginForm() {
    const [login, { isLoading: isLoggingIn }] = useLoginMutation()
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }

    const handleSubmit = () => {
        if (!username || !password) {
            return
        }

        if (username === '' || password === '') {
            return
        }

        login({ username, password })
    }

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
                                onChange={handleUsernameChange}
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
                                icon="lock"
                                iconPosition="left"
                                placeholder="Enter password"
                                type="password"
                                onChange={handlePasswordChange}
                            />
                        </FlexItem>
                    </Flex>
                </Form.Field>

                <Button color="teal" fluid size="large" onClick={handleSubmit}>
                    Login
                </Button>
            </Form>
        </>
    )
}
