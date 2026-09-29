import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Floaties from "./components/Floaties";
import Testimonials from "./components/Testimonials";
import { Footer } from "./components/Sections";
import { useReveal, useScrollToTop } from "./hooks/useUi";

import Home, { NotFound } from "./pages/Home";
import Applications from "./pages/Applications";
import Courses from "./pages/Courses";
import Faq from "./pages/Faq";
import News from "./pages/News";
import Admin from "./pages/Admin";
import { About, Contact } from "./pages/AboutContact";
import { Login, SignUp } from "./pages/Auth";

const TITLES = {
  "/": "Scholaa — Global Scholarship Platform",
  "/applications": "All Applications — Scholaa",
  "/courses": "Courses — Scholaa",
  "/services": "Success Stories — Scholaa",
  "/news": "News & Updates — Scholaa",
  "/about": "About Us — Scholaa",
  "/contact": "Contact Us — Scholaa",
  "/faq": "FAQ — Scholaa",
  "/login": "Log in — Scholaa",
  "/signup": "Create an account — Scholaa",
  "/admin": "Admin — Scholaa",
};

/* Success stories get their own route, reusing the home slider. */
function Services() {
  return <Testimonials isPage />;
}

export default function App() {
  useReveal();
  useScrollToTop();
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = TITLES[pathname] || "Scholaa";
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      {/* key forces a fresh subtree per route so scroll + reveal reset cleanly */}
      <main id="main" key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/services" element={<Services />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <Floaties />
    </>
  );
}
