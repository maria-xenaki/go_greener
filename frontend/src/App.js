import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import EventForm from "./components/EventForm";
import './App.css';
import HomePage from "./pages/HomePage";
import Footer from './components/Footer';
import Header from './components/Header';
import AdminEventsPage from './pages/AdminEventsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import RegisterForm from './components/RegisterForm';
import VerifyEmail from './pages/VerifyEmail';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Header/>
        <main>
          <Routes>
              <Route path = "/" element={<HomePage/>} />
              <Route path = "/auth" element={<AuthPage/>} />
              <Route path = "/register" element={<RegisterForm/>} />
              <Route path = "/new-event" element={<EventForm/>} />
              <Route path = "/admin-events" element={<AdminEventsPage/>} />
              <Route path = "/admin-users" element={<AdminUsersPage/>} />
              <Route path = "verify-email" element={<VerifyEmail/>} />
              <Route path = "/about" element={<AboutUs/>} />
              <Route path = "/contact" element={<ContactUs/>} />
          </Routes>
        </main>
        <Footer/>
      </div>     
    </Router>
  
  );
}

export default App;
