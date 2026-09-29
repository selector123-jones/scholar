import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CHANNELS,
  ICONS,
  SCHOLARSHIPS,
  WRITING_SERVICES,
  daysUntil,
  formatDate,
  contactLink,
} from "../data/site";
import { ChannelIcon, Icon, Reveal } from "./Bits";
import Modal from "./Modal";

const SERVICE_ICONS = [
  ICONS.pen,
  ICONS.file,
  ICONS.mail,
  ICONS.chat,
  ICONS.briefcase,
];

function DeadlineTag({ iso }) {
  const d = daysUntil(iso);
  if (d == null) return null;
  if (d < 0) return <span className="dead-tag is-closed">Closed</span>;
  if (d <= 21) return <span className="dead-tag is-urgent">{d} days left</span>;
  return <span className="dead-tag">{d} days left</span>;
}

export function ScholarshipCard({ s, index = 0 }) {
  return (
    <Reveal
      as="article"
      className="sch-card"
      style={{ transitionDelay: `${(index % 3) * 60}ms` }}
    >
      <div className="sch-media">
        <span className="sch-tag">{s.tag}</span>
        <img src={s.image} alt="" loading="lazy" />
      </div>
      <div className="sch-body">
        <h3 className="sch-title">
          <Link to={`/applications?open=${s.id}`}>{s.title}</Link>
        </h3>
        <ul className="sch-facts">
          <li>
            <Icon path={ICONS.cap} />
            {s.university}
          </li>
          <li>
            <Icon path={ICONS.clock} />
            {s.year} intake
          </li>
          <li>
            <Icon path={ICONS.globe} />
            {s.country}
          </li>
        </ul>
        <p className="sch-excerpt">{s.body}</p>
        <div className="sch-foot">
          <span className="sch-date">
            <Icon path={ICONS.calendar} />
            Closes {formatDate(s.deadline)}
          </span>
          <div className="sch-actions">
            <DeadlineTag iso={s.deadline} />
            <Link
              className="chip chip-ghost"
              to={`/applications?open=${s.id}`}
            >
              Read More
              <Icon path={ICONS.arrow} />
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* Side column: contact channels + writing services. */
export function SideStack() {
  return (
    <aside className="side-stack">
      <Reveal className="info-card">
        <div className="info-card-media">
          <div className="info-card-art" aria-hidden="true">
            <span className="info-card-art-cap">
              <Icon path={ICONS.cap} />
            </span>
            <span className="info-card-art-label">Talk to an advisor</span>
          </div>
        </div>
        <div className="info-card-body">
          <h3 className="info-card-title">Get In Touch</h3>
          <div className="contact-list">
            {CHANNELS.map((c) => (
              <a
                key={c.id}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
              >
                <ChannelIcon src={c.icon} alt="" />
                <span>{c.value}</span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="services-card">
        <div className="services-head">
          <span className="services-icon">
            <Icon path={ICONS.pen} />
          </span>
          <h3>Writing Services</h3>
          <p>
            Expert writing &amp; proofreading support for your application
            documents.
          </p>
          <div className="services-rule">
            <i />
            <b />
            <i />
          </div>
        </div>
        <ul className="services-list">
          {WRITING_SERVICES.map((item, i) => (
            <li className="service-row" key={item}>
              <Icon path={SERVICE_ICONS[i % SERVICE_ICONS.length]} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="services-foot">
          <a
            className="btn btn-gold btn-block"
            href={contactLink(
              "Hello, I would like help with your writing services."
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Professional Help
            <Icon path={ICONS.arrow} />
          </a>
        </div>
      </Reveal>
    </aside>
  );
}

/* Home preview: first 6 opportunities, with a route into the full list. */
export function ScholarshipPreview() {
  return (
    <section className="section scholarships" id="scholarships">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">
            <Icon path={ICONS.star} />
            Freshly posted
          </span>
          <h2>Available Scholarships</h2>
          <p>
            Choose a scholarship you need from our wide range of open
            applications, with the key requirements listed for every one.
          </p>
        </div>

        <div className="scholarships-layout">
          <SideStack />

          <div className="scholarships-main">
            {SCHOLARSHIPS.slice(0, 6).map((s, i) => (
              <ScholarshipCard s={s} index={i} key={s.id} />
            ))}
          </div>
        </div>

        <div className="grid-cta reveal">
          <Link className="btn btn-brand" to="/applications">
            View all {SCHOLARSHIPS.length} applications
            <Icon path={ICONS.arrow} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Detail + eligibility dialogs, driven by the shared modal shell. */
export function ScholarshipDialogs({ open, onClose }) {
  const s = SCHOLARSHIPS.find((x) => String(x.id) === String(open));
  if (!s) return null;

  const applyMessage = `Hello, I am interested in "${s.title}" (ref ${s.id}). Please send me the application requirements.`;

  return (
    <Modal
      wide
      title={s.tag}
      icon={ICONS.cap}
      onClose={onClose}
      actions={
        <>
          <a
            className="btn btn-brand"
            href={contactLink(applyMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon path={ICONS.check} />
            Start Application
          </a>
          <a
            className="btn btn-outline"
            href={contactLink(
              `Hello, I would like help checking my eligibility for "${s.title}".`
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon path={ICONS.chat} />
            Ask For Help
          </a>
          <button type="button" className="btn modal-close-ghost" onClick={onClose}>
            Close
          </button>
        </>
      }
    >
      <div className="modal-media">
        <img src={s.image} alt="" />
      </div>
      <div className="modal-detail-meta">
        <span className="sch-tag" style={{ position: "static" }}>
          {s.tag}
        </span>
        <span className="sch-date">
          <Icon path={ICONS.calendar} />
          Closes {formatDate(s.deadline)}
        </span>
        <span className="sch-date">
          <Icon path={ICONS.globe} />
          {s.country}
        </span>
        <span className="sch-date">
          <Icon path={ICONS.clock} />
          {s.year} intake
        </span>
      </div>
      <h4 style={{ fontSize: "1.1rem" }}>{s.title}</h4>
      <p className="modal-uni">
        <Icon path={ICONS.cap} />
        {s.university}
      </p>
      <p className="modal-p">{s.body}</p>

      <h5 className="modal-eyebrow">Key requirements</h5>
      <ul className="about-points" style={{ margin: 0 }}>
        {s.requirements.map((r) => (
          <li key={r}>
            <Icon path={ICONS.check} />
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
