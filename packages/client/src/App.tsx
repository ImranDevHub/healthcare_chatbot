import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Chatbot from './components/Chatbot/Chatbot';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';

function App() {
    const { user } = useAuth();

    return (
        <Router>
            {/* <Navbar /> */}
            {/* <Header /> */}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* <Route path="/" element={<Hero />} /> */}
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
