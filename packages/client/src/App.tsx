import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Four04 from './components/404/Four04';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import PublicRoute from './components/Auth/PublicRoute';
import Signup from './components/Auth/Signup';
import Chatbot from './components/Chatbot/Chatbot';
import HealthForm from './pages/HealthForm';
import LandingPage from './pages/LandingPage';
import MainLayout from './pages/MainLayout';

function App() {
    return (
        <Router>
            <Routes>
                {/* Routes with shared layout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/health-form"
                        element={
                            <ProtectedRoute>
                                <HealthForm />
                            </ProtectedRoute>
                        }
                    />
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
