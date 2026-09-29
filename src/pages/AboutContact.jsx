import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ABOUT_POINTS,
  BRAND,
  CHANNELS,
  CONTACT,
  ICONS,
  PROCESS,
  STATS_FULL,
  contactLink,
} from "../data/site";
import { ChannelIcon, Icon, Reveal } from "../components/Bits";
import { CtaBanner } from "../components/Sections";
import { Stats } from "../components/Hero";

export function About() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="eyebrow">
              <Icon path={ICONS.star} />
              About us
            </span>
            <h1>Your path to scholarships, jobs and success</h1>
            <p>
              {BRAND.name} exists for one reason: to make the search for
              funding manageable, and the application process something you can
              actually get through.
            </p>
          </div>
        </div>
      </section>

      <section className="section about">
        <div className="wrap about-inner">
          <Reveal>
            <h2>What we do</h2>
            <p>
              We make it easy to find scholarships, study programs, job
              opportunities and internships around the world — and our team
              helps you with every part of the application process.
            </p>
            <p>
              Whether you need help writing essays, proofreading your work,
              applying for financial aid, preparing for tests, or coaching for
              interviews, we have got you covered. We are here to support you
              every step of the way.
            </p>

            <ul className="about-points">
              {ABOUT_POINTS.map((p) => (
                <li key={p}>
                  <Icon path={ICONS.check} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <Link className="btn btn-brand" to="/applications">
              See open applications
              <Icon path={ICONS.arrow} />
            </Link>
          </Reveal>

          <Reveal className="about-media">
            <div className="about-media-art">
              <span className="about-media-cap">
                <Icon path={ICONS.cap} />
              </span>
              <span className="about-media-label">
                12+ years supporting students
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">
              <Icon path={ICONS.arrow} />
              How it works
            </span>
            <h2>Four steps, no surprises</h2>
            <p>
              The same process for every student, whether you need one
              application or twenty.
            </p>
          </div>

          <div className="process">
            {PROCESS.map((p, i) => (
              <Reveal className="process-step" key={p.step}>
                <span className="process-num">{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                {i < PROCESS.length - 1 ? (
                  <span className="process-arrow" aria-hidden="true">
                    <Icon path={ICONS.chevR} />
                  </span>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <Stats items={STATS_FULL} />
      </section>

      <CtaBanner />
    </>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "Application help",
    message: "",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="eyebrow">
              <Icon path={ICONS.mail} />
              Contact
            </span>
            <h1>Talk to a person, not a form queue</h1>
            <p>
              Send the details of what you are applying for and an advisor will
              come back to you — usually the same working day.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap contact-layout">
          <Reveal className="contact-panel">
            <h2>Reach us directly</h2>
            <p className="contact-panel-sub">
              Prefer a quick answer? Use whichever channel suits you.
            </p>

            <ul className="contact-cards">
              {CHANNELS.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                  >
                    <ChannelIcon src={c.icon} alt="" className="contact-card-icon" />
                    <span>
                      <strong>{c.label}</strong>
                      <small>{c.value}</small>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="contact-note">
              <Icon path={ICONS.globe} />
              Based in {CONTACT.address}. We work with students internationally.
            </p>
          </Reveal>

          <Reveal className="contact-form-wrap">
            {sent ? (
              <div className="form-success">
                <span className="form-success-icon">
                  <Icon path={ICONS.check} />
                </span>
                <h2>Message received</h2>
                <p>
                  Thanks {form.name.split(" ")[0]} — an advisor will reply
                  within one working day. In a hurry? Message us directly.
                </p>
                <div className="cta-actions">
                  <a
                    className="btn btn-brand"
                    href={contactLink(
                      `Hello, I just sent a message about "${form.topic}".`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Message now
                  </a>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setSent(false);
                      setForm({
                        name: "",
                        email: "",
                        topic: "Application help",
                        message: "",
                      });
                    }}
                  >
                    Send another
                  </button>
                </div>
              </div>
            ) : (
              <form className="form" onSubmit={submit}>
                <h2>Send us a message</h2>

                <label>
                  <span>Your name</span>
                  <input
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </label>

                <label>
                  <span>Email address</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </label>

                <label>
                  <span>What is this about?</span>
                  <select value={form.topic} onChange={set("topic")}>
                    <option>Application help</option>
                    <option>Shortlist request</option>
                    <option>Document review</option>
                    <option>Course enquiry</option>
                    <option>Something else</option>
                  </select>
                </label>

                <label>
                  <span>Message</span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Degree level, target country and your deadline help us reply usefully."
                  />
                </label>

                <button type="submit" className="btn btn-brand btn-block">
                  Send message
                  <Icon path={ICONS.arrow} />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
