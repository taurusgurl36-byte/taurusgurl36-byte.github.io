
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./components/ThemeContext";
import Navbar from "./components/Navbar";

// Pages
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import StackPage from "./pages/StackPage";
import CertificationsPage from "./pages/CertificationsPage";
import NotFoundPage from "./pages/NotFoundPage";

const ResumePage = lazy(() => import("./pages/ResumePage"));

// Root Layout
function RootLayout() {
  return (
    <ThemeProvider>
      <div className="video-background" aria-hidden="true">
        <video
          className="light-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            src="/assets/backgrounds/light-background.mp4"
            type="video/mp4"
          />
        </video>

        <video
          className="dark-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            src="/assets/backgrounds/dark-background.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="app-content">
        <Outlet />
      </div>

      <ScrollRestoration />
    </ThemeProvider>
  );
}

// Subpage Layout
function SubPageLayout() {
  return (
    <>
      <Navbar />
      <div className="pt-11">
        <Outlet />
      </div>
    </>
  );
}

// Application Router
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        element: <SubPageLayout />,
        children: [
          { path: "/projects", element: <ProjectsPage /> },
          { path: "/experience", element: <ExperiencePage /> },
          { path: "/stack", element: <StackPage /> },
          { path: "/certifications", element: <CertificationsPage /> },
          {
            path: "/resume",
            element: (
              <Suspense
                fallback={
                  <p role="status" className="text-text-muted">
                    Loading résumé…
                  </p>
                }
              >
                <ResumePage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  );
}
