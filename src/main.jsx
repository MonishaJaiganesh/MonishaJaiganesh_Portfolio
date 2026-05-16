import { BrowserRouter } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

// Always start at the top on reload — clear hash and disable browser scroll restore
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname);
}
window.scrollTo(0, 0);
// Also scroll after the browser's native scroll restore fires (happens on 'load')
window.addEventListener('load', () => window.scrollTo(0, 0), { once: true });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    <Analytics />
    <SpeedInsights />
    </BrowserRouter>
  </StrictMode>,
)
