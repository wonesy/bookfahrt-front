import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { PublicHomePage } from './pages/PublicHomePage'
import { useAuth } from './state/auth/hooks/useAuth'

function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth()
    let location = useLocation()

    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}

export function FahrtRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PublicHomePage />} />
            <Route path="/login" element={<PublicHomePage />} />
            <Route
                path="/home"
                element={
                    <RequireAuth>
                        <Layout />
                    </RequireAuth>
                }
            />
        </Routes>
    )
}
