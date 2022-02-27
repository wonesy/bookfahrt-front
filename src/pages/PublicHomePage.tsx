import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Grid, Tab } from 'semantic-ui-react'
import { LoginForm } from '../components/LoginForm'
import { RegistrationForm } from '../components/RegistrationForm'
import { useAuth } from '../state/auth/hooks/useAuth'

export function PublicHomePage() {
    const auth = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [invitation, setInvitation] = useState<string | null>(null)
    const [activeIndex, setActiveIndex] = useState<string | number | undefined>(0)

    useEffect(() => {
        if (auth.user) {
            navigate('/home')
        }
    }, [auth.user])

    useEffect(() => {
        const inv = searchParams.get('invitation')
        setInvitation(inv)
        if (inv) {
            setActiveIndex(1)
        }
    }, [searchParams, setActiveIndex, setInvitation])

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
        <Grid textAlign="center" style={{ height: '100vh', marginTop: '100px' }}>
            <Grid.Column style={{ maxWidth: 550 }}>
                <section>
                    <Tab
                        panes={panes}
                        activeIndex={activeIndex}
                        onTabChange={(e, { activeIndex }) => setActiveIndex(activeIndex)}
                    />
                </section>
            </Grid.Column>
        </Grid>
    )
}
