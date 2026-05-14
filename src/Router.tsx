import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home1 from './pages/Home1';
import About from './pages/About';
import Contact from './pages/Contact';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
