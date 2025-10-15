import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Chatbot from './components/Chatbot/Chatbot';
import Navbar from './components/ui/Navbar';
import { useAuth } from './context/AuthContext';

function App() {
    const { user } = useAuth();

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/chatbot" /> : <Login />}
                />
                <Route
                    path="/signup"
                    element={user ? <Navigate to="/chatbot" /> : <Signup />}
                />
                <Route
                    path="/chatbot"
                    element={user ? <Chatbot /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
