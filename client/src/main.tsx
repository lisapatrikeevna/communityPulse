import App from './App.tsx'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";


// main.tsx
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App/>
  </StrictMode>
)
