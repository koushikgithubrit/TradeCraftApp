import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Courses from './pages/Courses';
import TradingCourse from './pages/TradingCourse';
import ModuleViewer from './components/ModuleViewer';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-[#0A0F1C]">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trading-course" element={<TradingCourse />} />
            <Route path="/trading-course/:moduleId" element={<TradingCourse />} />
            <Route path="/trading-course/:moduleId/:lessonId" element={<TradingCourse />} />
            <Route path="/trading-modules/:moduleId" element={<ModuleViewer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

