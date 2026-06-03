import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Footer from './Components/Common/Footer'
import Header from './Components/Common/Header'
import WhatsappButton from './Components/Common/WhatsappButton'
import AboutPage from './Pages/AboutPage'
import HomePage from './Pages/HomePage'
import ProductPage from './Pages/ProductPage'
import GalleryPage from './Pages/GalleryPage'
import ContactPage from './Pages/ContactPage'
import BeyondJewellery from './Pages/Beyondjewellery'
import AdminPage from './Pages/AdminPage'
import TermsCondition from './Components/Common/Terms&Condition'
import PrivacyPolicy from './Components/Common/Privacypolicy'
import PiracyPolicy from './Components/Common/PiracyPolicy'

// MainLayout checks if the current route is the admin workspace and hides customer elements
function MainLayout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <>
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <WhatsappButton />}
      {!isAdmin && <Footer />}
    </>
  );
}

function App() { 
  return (
    <Router>
       <MainLayout>
         <Routes>
            {/* Main Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/womenempowerment" element={<BeyondJewellery />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Administration Workspace */}
            <Route path="/admin" element={<AdminPage />} />

            <Route path="/terms" element={<TermsCondition />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/piracy" element={<PiracyPolicy />} />
            
            {/* Catch-all redirect to Home */}
            <Route path="*" element={<HomePage />} />
         </Routes>
       </MainLayout>
    </Router>
  )
}

export default App