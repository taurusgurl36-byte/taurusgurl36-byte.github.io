
import { lazy, Suspense, useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./components/ThemeContext";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import StackPage from "./pages/StackPage";
import CertificationsPage from "./pages/CertificationsPage";
import NotFoundPage from "./pages/NotFoundPage";

const ResumePage = lazy(() => import("./pages/ResumePage"));

function AnimatedBackground() {
  const [pointer, setPointer] = useState({ x: 50, y: 40 });
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    let nextId = 0;
    let timeoutIds = [];

    function handlePointerMove(event) {
      setPointer({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    }

    function handleClick(event) {
      const id = ++nextId;

      setRipples((current) => [
        ...current.slice(-5),
        { id, x: event.clientX, y: event.clientY },
      ]);

      const timeoutId = window.setTimeout(() => {
        setRipples((current) =>
          current.filter((ripple) => ripple.id !== id)
        );
      }, 1100);

      timeoutIds.push(timeoutId);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("click", handleClick);
      timeoutIds.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        backgroundColor: "#160824",
        backgroundImage: `
          radial-gradient(
            circle at ${pointer.x}% ${pointer.y}%,
            rgba(168, 85, 247, 0.32),
            transparent 32%
          ),
          radial-gradient(
            ellipse at 15% 20%,
            rgba(126, 34, 206, 0.3),
            transparent 48%
          ),
          radial-gradient(
            ellipse at 85% 80%,
            rgba(88, 28, 135, 0.32),
            transparent 50%
          ),
          linear-gradient(
            135deg,
            #160824 0%,
            #24103b 50%,
            #160824 100%
          )
        `,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-50%",
          backgroundImage: `
            linear-gradient(
              rgba(167, 139, 250, 0.14) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(167, 139, 250, 0.14) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "48px 48px",
          transform: `translate(
            ${(pointer.x - 50) * -0.12}px,
            ${(pointer.y - 50) * -0.12}px
          )`,
          maskImage:
            "linear-gradient(to bottom, black, transparent 95%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, transparent 95%)",
          animation: "neon-grid-drift 18s linear infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "min(45vw, 600px)",
          height: "min(45vw, 600px)",
          left: `${pointer.x}%`,
          top: `${pointer.y}%`,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent 70%)",
          filter: "blur(24px)",
          transition: "left 180ms ease-out, top 180ms ease-out",
        }}
      />

      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          style={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: 24,
            height: 24,
            border: "2px solid rgba(216, 180, 254, 0.9)",
            borderRadius: "50%",
            boxShadow: "0 0 20px rgba(168, 85, 247, 0.8)",
            transform: "translate(-50%, -50%)",
            animation: "neon-ripple 1.1s ease-out forwards",
          }}
        />
      ))}
    </div>
  );
}

function RootLayout() {
  return (
    <ThemeProvider>
      <AnimatedBackground />

      <div
        className="app-content"
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          background: "transparent",
        }}
      >
        <Outlet />
      </div>

      <ScrollRestoration />
    </ThemeProvider>
  );
}

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

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
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
      { path: "*", element: <NotFoundPage /> },
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
