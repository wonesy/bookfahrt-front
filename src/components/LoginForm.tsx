import React, { useState } from 'react'
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
} from 'semantic-ui-react'
import { useLoginMutation } from '../services/apiService'

export function LoginForm() {
    const [login, { isLoading: isLoggingIn }] = useLoginMutation()
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.currentTarget.value)
    }

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
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
        <Grid
            textAlign="center"
            style={{ height: '100vh' }}
            verticalAlign="middle"
        >
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="teal" textAlign="center">
                    Log in to your account
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Enter username"
                            onChange={handlePasswordChange}
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Enter password"
                            type="password"
                            onChange={handleUsernameChange}
                        />

                        <Button
                            color="teal"
                            fluid
                            size="large"
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href="#">Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}
