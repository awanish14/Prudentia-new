import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home1 from './pages/Home1';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home1 />
  </StrictMode>,
);
