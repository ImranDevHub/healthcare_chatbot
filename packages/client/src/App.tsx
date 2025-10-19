import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Chatbot from './components/Chatbot/Chatbot';
import Four04 from './components/404/Four04';
import MainLayout from './pages/MainLayout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import PublicRoute from './components/Auth/PublicRoute';

function App() {
    return (
        <Router>
            <Routes>
                {/* Routes with shared layout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<LandingPage />} />
                </Route>

                {/* Auth routes */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    }
                />

                {/* Protected routes */}
                <Route
                    path="/chatbot"
                    element={
                        <ProtectedRoute>
                            <Chatbot />
                        </ProtectedRoute>
                    }
                />

                {/* 404 page */}
                <Route path="*" element={<Four04 />} />
            </Routes>
        </Router>
    );
}

export default App;
