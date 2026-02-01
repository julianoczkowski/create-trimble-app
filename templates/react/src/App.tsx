import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModusProvider from "./components/ModusProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DevPanelProvider, DevPanel, DevRoutes, isDevPanelEnabled } from "./dev";

// Your pages
import HomePage from "./pages/HomePage";

/**
 * Main Application Component.
 *
 * Structure:
 * - ThemeProvider: Manages Modus themes (6 themes available)
 * - ModusProvider: Provides Modus Web Components CSS
 * - DevPanelProvider: Manages Dev Panel state (development only)
 * - Router: React Router for navigation
 *
 * Routes:
 * - /dev/*: Development panel routes (demos, colors, icons) - dev only
 * - /: Your application routes
 *
 * Getting Started:
 * 1. Edit src/pages/HomePage.tsx for your landing page
 * 2. Add new pages in src/pages/
 * 3. Add routes below
 * 4. Use Ctrl+Shift+D to open the Dev Panel for component reference
 */
function App() {
  const showDevPanel = isDevPanelEnabled();

  return (
    <ThemeProvider>
      <ModusProvider>
        <DevPanelProvider>
          <Router>
            <Routes>
              {/* Development routes - only available when VITE_DEV_PANEL=true */}
              {showDevPanel && <Route path="/dev/*" element={<DevRoutes />} />}

              {/* Your application routes - add more Route elements here */}
              <Route path="/" element={<HomePage />} />
              {/* Example: <Route path="/about" element={<AboutPage />} /> */}
            </Routes>

            {/* Dev Panel - floating panel for development reference */}
            {showDevPanel && <DevPanel />}
          </Router>
        </DevPanelProvider>
      </ModusProvider>
    </ThemeProvider>
  );
}

export default App;
