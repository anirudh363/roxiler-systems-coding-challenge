/**
 * Author: Anirudh Manjunath Sandilya
 * Date Created: 2025-02-22 18:33:28
 * Last Modified: 2025-02-23 19:10:30
 * Filename: main.jsx
 * 
 * Description:
 *   Entry point for the React app using Vite.
 *   Initializes the React DOM and renders the App component.
 * 
 * Usage: 
 *   $ npm run dev
 * 
 * Dependencies:
 *   - react
 *   - react-dom
 *   - vite
 *   - react-router-dom
 *   - fontawesome
 *   - react-chartjs-2 chart.js
 *   - react-modal
 * 
 * Notes:
 * 
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
