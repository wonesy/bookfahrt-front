import { useSearchParams } from 'react-router-dom'
import { Button, Grid, Tab } from 'semantic-ui-react'
import { LoginForm } from '../components/LoginForm'
import { RegistrationForm } from '../components/RegistrationForm'

export function PublicHomePage() {
    let [searchParams, setSearchParams] = useSearchParams()

    const invitation = searchParams.get('invitation')

    const panes = [
        {
            menuItem: 'Login',
            render: () => (
                <Tab.Pane>
                    <LoginForm />
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Register',
            render: () => (
                <Tab.Pane>
                    <RegistrationForm invitation={invitation} />
                </Tab.Pane>
            ),
        },
    ]

    return (
        <Grid
            textAlign="center"
            style={{ height: '100vh', marginTop: '100px' }}
        >
            <Grid.Column style={{ maxWidth: 550 }}>
                <section>
                    <Tab panes={panes} activeIndex={invitation ? 1 : 0} />
                </section>
            </Grid.Column>
        </Grid>
    )
}
