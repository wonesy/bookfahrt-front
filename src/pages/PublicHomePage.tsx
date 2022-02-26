import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Grid, Tab } from 'semantic-ui-react'
import { LoginForm } from '../components/LoginForm'
import { RegistrationForm } from '../components/RegistrationForm'

export function PublicHomePage() {
    let [searchParams] = useSearchParams()
    const [invitation, setInvitation] = useState<string | null>(null)
    const [activeIndex, setActiveIndex] = useState<string | number | undefined>(
        0
    )

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
        <Grid
            textAlign="center"
            style={{ height: '100vh', marginTop: '100px' }}
        >
            <Grid.Column style={{ maxWidth: 550 }}>
                <section>
                    <Tab
                        panes={panes}
                        activeIndex={activeIndex}
                        onTabChange={(e, { activeIndex }) =>
                            setActiveIndex(activeIndex)
                        }
                    />
                </section>
            </Grid.Column>
        </Grid>
    )
}
