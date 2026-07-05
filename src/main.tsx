import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import '@fontsource-variable/geist'
import '@fontsource-variable/jetbrains-mono'
import './index.css'

// A legacy service worker cached stale HTML after deploys; make sure any
// existing registration is removed. /sw.js is now a self-destructing worker
// that cleans up clients that still have the old one installed.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations()
      .then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      })
      .catch(() => {
        // Nothing to clean up.
      });
  });
}

// A hello for anyone curious enough to open DevTools
console.log(
  '%c>_ sergarsilla',
  'color:#41c889;font-size:20px;font-weight:bold;font-family:monospace;',
);
console.log(
  '%cCurious about the code? Good sign.\nThe interactive terminal is Ctrl+Shift+K (there is more inside than "help" admits).',
  'color:#8a8a93;font-family:monospace;',
);

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

const root = createRoot(container);
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
