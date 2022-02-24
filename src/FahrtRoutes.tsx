import {Routes, Route} from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { PublicHomePage } from './pages/PublicHomePage'

export function FahrtRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PublicHomePage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}