import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
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
import EventsPage from './pages/EventsPage';
import Layout from './components/Layout';
import VolunteerPage from './pages/VolunteerPage';
import ShopPage from './pages/ShopPage';
import DinePage from './pages/DinePage';
import InputPage from './pages/InputPage';
import ResetPasswordForm from './components/ResetPasswordForm';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <div className="App d-flex flex-column min-vh-100">
        <Header className="header"/>
        <main>
          <Routes>
              <Route path = "/" element={<Layout title="Welcome to GoGreener"><HomePage/></Layout>} />
              <Route path = "/events" element={<Layout title="Events"><EventsPage/></Layout>} />
              <Route path = "/volunteer" element={<Layout title="Volunteer"><VolunteerPage/></Layout>} />
              <Route path = "/shop" element={<Layout title="Shop"><ShopPage/></Layout>} />
              <Route path = "/dine" element={<Layout title="Dine"><DinePage/></Layout>} />
              <Route path = "/add-something-green" element={<Layout title="Add Something Green"><InputPage/></Layout>} />
                           
              <Route path = "verify-email" element={<Layout title="Verify Email"><VerifyEmail/></Layout>} />
              <Route path = "/about" element={<Layout title="About Us"><AboutUs/></Layout>} />
              <Route path = "/contact" element={<Layout title="Contact Us"><ContactUs/></Layout>} />
              <Route path = "/login" element={<Layout title="Login"><AuthPage/></Layout>} />
              <Route path = "/register" element={<Layout title="Sign up"><RegisterForm/></Layout>} />
               <Route path = "/admin-events" element={<Layout title="Manage Posts"><AdminEventsPage/></Layout>} />
              <Route path = "/admin-users" element={<Layout title="Manage Users"><AdminUsersPage/></Layout>} />
              <Route path = "/forgot-password" element={<Layout title="Reset Password"><ResetPasswordForm/></Layout>} />
              <Route path = "/reset-password" element={<Layout title="Reset Password"><ResetPasswordForm/></Layout>} />
          </Routes>
        </main>
      </div>
      <div style={{overflowX: "hidden"}}>
        <Footer/>
      </div>     
    </Router>
  
  );
}

export default App;
