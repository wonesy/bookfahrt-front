import { Routes, Route } from 'react-router-dom'
import { PublicHomePage } from './pages/PublicHomePage'

export function FahrtRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PublicHomePage />} />
        </Routes>
    )
}
