// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css'; // Import global en premier
import './index.css';
import { AuthProvider } from './contexts/AuthContext';

// Configuration TypeScript pour l'élément root
const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  
  root.render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  );
  
} else {
  console.error("Failed to find the root element");
}