import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BRAND,
  CHANNELS,
  CONTACT,
  ICONS,
  SOCIAL_CHANNELS,
  contactLink,
} from "../data/site";
import { ChannelIcon, Icon, Logo, Reveal } from "./Bits";

export function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="wrap cta-inner reveal">
        <h2>Ready to take your skills to the next level?</h2>
        <p>
          Start learning the skills you need. Build a shortlist, prepare your
          documents and apply with support at every step.
        </p>
        <div className="cta-actions">
          <Link className="btn btn-gold" to="/signup">
            Register Now
            <Icon path={ICONS.arrow} />
          </Link>
          <Link className="btn btn-light" to="/courses">
            Browse Courses
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Compact "why us" band used on the home page. */
export function WhyUs() {
  return (
    <section className="section about">
      <div className="wrap about-inner">
        <Reveal>
          <span className="eyebrow">
            <Icon path={ICONS.star} />
            Who we are
          </span>
          <h2>Your path to scholarships, jobs and success</h2>
          <p>
            We make it easy to find scholarships, study programs, job
            opportunities and internships around the world — and our team helps
            you with every part of the application process.
          </p>
          <p>
            Whether you need help writing essays, proofreading your work,
            applying for financial aid, preparing for tests, or coaching for
            interviews, we have got you covered.
          </p>
          <Link className="btn btn-brand" to="/about">
            Learn More
            <Icon path={ICONS.arrow} />
          </Link>
        </Reveal>

        <Reveal className="about-media">
          <div className="about-media-art">
            <span className="about-media-cap">
              <Icon path={ICONS.cap} />
            </span>
            <span className="about-media-label">12+ years supporting students</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
  };

  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-about">
            <Logo variant="white" />
            <p>
              A global platform for scholarship opportunities and study
              programmes — from essay writing and proofreading to admission,
              financial aid, test preparation and interview coaching.
            </p>
            <p className="footer-copy" style={{ marginTop: "1.1rem" }}>
              &copy; {year} {BRAND.name}. All rights reserved.
            </p>
          </div>

          <div className="footer-links">
            <h6>Explore</h6>
            <ul>
              <li>
                <Link to="/applications">Scholarships</Link>
              </li>
              <li>
                <Link to="/news">News &amp; Updates</Link>
              </li>
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/services">Success Stories</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h6>Support</h6>
            <ul>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`}>Email support</a>
              </li>
              <li>
                <a href={CONTACT.phoneHref}>Call us</a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h6>Follow</h6>
            <ul>
              {SOCIAL_CHANNELS.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                  >
                    <ChannelIcon src={c.icon} alt="" />
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h6>Account</h6>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            </ul>
          </div>

          <div>
            <h6>Subscribe</h6>
            <p style={{ fontSize: "0.9rem" }}>
              Get the latest scholarship news in your inbox.
            </p>
            <form className="footer-form" onSubmit={submit}>
              <input
                type="email"
                required
                placeholder="Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSent(false);
                }}
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="btn btn-gold btn-block">
                {sent ? "Subscribed" : "Send"}
              </button>
            </form>
            <a
              className="btn btn-outline btn-block"
              style={{ marginTop: "0.7rem" }}
              href={contactLink("Hello, I would like to speak to an advisor.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Email an Advisor
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            Built for desktop, tablet and mobile — the same experience
            everywhere.
          </span>
          <Link to="/">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
