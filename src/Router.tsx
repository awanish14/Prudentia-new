import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home1 from './pages/Home1';
import About from './pages/About';
import Contact from './pages/Contact';
import CorporateTraining from './pages/services/CorporateTraining';
import ELearning from './pages/services/ELearning';
import Certification from './pages/services/Certification';
import Workshops from './pages/services/Workshops';
import Translation from './pages/services/Translation';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/corporate-training" element={<CorporateTraining />} />
        <Route path="/services/elearning" element={<ELearning />} />
        <Route path="/services/certification" element={<Certification />} />
        <Route path="/services/workshops" element={<Workshops />} />
        <Route path="/services/translation" element={<Translation />} />
      </Routes>
    </BrowserRouter>
  );
}
