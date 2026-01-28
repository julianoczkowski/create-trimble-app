import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import ModusProvider from "./components/ModusProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import ComponentsDemo from "./pages/ComponentsGalleryPage";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import ColorPalettePage from "./pages/ColorPalettePage";
import ButtonDemoPage from "./pages/ButtonDemoPage";
import HomePage from "./pages/HomePage";
import IconsPage from "./pages/IconsPage";
import SetupValidationPage from "./pages/SetupValidationPage";
import { demoRoutes } from "./config/routes";

function App() {
  return (
    <ThemeProvider>
      <ModusProvider>
        <Router>
          <Routes>
            {/* Special route without header/footer */}
            <Route path="/setup-validation" element={<SetupValidationPage />} />

            {/* Regular routes with header/footer */}
            <Route
              path="/*"
              element={
                <div className="min-h-screen flex flex-col">
                  <AppHeader />
                  <div className="flex-1">
                    <Suspense
                      fallback={
                        <div className="flex items-center justify-center min-h-screen">
                          Loading...
                        </div>
                      }
                    >
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                          path="/components"
                          element={<ComponentsDemo />}
                        />
                        <Route
                          path="/button-demo"
                          element={<ButtonDemoPage />}
                        />
                        <Route path="/icons" element={<IconsPage />} />
                        {/* Dynamically generated demo routes */}
                        {demoRoutes.map(({ path, component: Component }) => (
                          <Route
                            key={path}
                            path={path}
                            element={<Component />}
                          />
                        ))}
                        <Route
                          path="/color-palette"
                          element={<ColorPalettePage />}
                        />
                      </Routes>
                    </Suspense>
                  </div>
                  <AppFooter />
                </div>
              }
            />
          </Routes>
        </Router>
      </ModusProvider>
    </ThemeProvider>
  );
}

export default App;
