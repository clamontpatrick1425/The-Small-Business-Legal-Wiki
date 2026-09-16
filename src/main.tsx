// Ensure window.fetch is writable and has both getter and setter across all iframe environments
(function ensureWritableFetch() {
  try {
    if (typeof window !== 'undefined') {
      const current = typeof window.fetch === 'function' ? window.fetch.bind(window) : null;
      let activeFetch = function (...args: Parameters<typeof fetch>) {
        return current ? current(...args) : Promise.reject(new Error('fetch not available'));
      };

      const desc = Object.getOwnPropertyDescriptor(window, 'fetch');
      if (!desc || !desc.set) {
        Object.defineProperty(window, 'fetch', {
          get() {
            return activeFetch;
          },
          set(fn) {
            activeFetch = fn;
          },
          configurable: true,
          enumerable: true,
        });
      }

      if (typeof Window !== 'undefined' && Window.prototype) {
        const protoDesc = Object.getOwnPropertyDescriptor(Window.prototype, 'fetch');
        if (!protoDesc || !protoDesc.set) {
          try {
            Object.defineProperty(Window.prototype, 'fetch', {
              get() {
                return activeFetch;
              },
              set(fn) {
                activeFetch = fn;
              },
              configurable: true,
              enumerable: true,
            });
          } catch (_) {
            // Ignore prototype modification restrictions
          }
        }
      }
    }
  } catch (_) {
    // Graceful fallback
  }
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
