import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CONTACT, ICONS, formatDate, contactLink } from "../data/site";
import { listNews } from "../store/newsStore";
import { Icon, Reveal } from "./Bits";

/* Loads announcements, and re-reads them whenever another tab publishes
   something (the admin editor runs in its own tab). Without this, an
   already-open site tab keeps showing the stale list until it is reloaded —
   which reads as "the new post never reached the public site". */
function useNews(limit) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;

    const load = () => {
      listNews()
        .then((all) => {
          if (!alive) return;
          setItems(all.filter((n) => !n.hidden));
          setReady(true);
        })
        .catch(() => {
          if (alive) setReady(true);
        });
    };

    load();

    const onStorage = (e) => {
      if (e.key === "scholaa.news.v1") load();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      alive = false;
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return ready ? (limit ? items.slice(0, limit) : items) : [];
}

/** Card list used by the home page and the full news page. */
export function NewsList({ limit = null, id }) {
  const items = useNews(limit);
  if (!items.length) return null;

  return (
    <div className="news-grid" id={id}>
      {items.map((n, i) => (
        <Reveal
          as="article"
          className="news-card"
          key={n.id}
          style={{ transitionDelay: `${(i % 3) * 70}ms` }}
        >
          <div className="news-card-media">
            {n.upload ? <img src={n.upload} alt="" loading="lazy" /> : null}
            <span className="news-card-year">{n.year}</span>
          </div>
          <div className="news-card-body">
            <div className="news-card-meta">
              <span className="news-chip">{n.country}</span>
              <span className="news-date">
                <Icon path={ICONS.calendar} />
                {formatDate(n.date)}
              </span>
            </div>
            <h2 className="news-card-h">{n.title}</h2>
            <p className="news-card-uni">{n.university}</p>
            <p className="news-card-text">{n.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Compact feed for the home page. */
export default function NewsFeed({ limit = 3 }) {
  const items = useNews(limit);
  if (!items.length) return null;

  return (
    <section className="section news-section" id="news">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">
            <Icon path={ICONS.cap} />
            Latest announcements
          </span>
          <h2>News &amp; updates</h2>
          <p>
            New programmes, deadlines and award announcements as they are
            published.
          </p>
        </div>

        <div className="news-grid">
          {items.map((n, i) => (
            <Reveal
              as="article"
              className="news-card"
              key={n.id}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="news-card-media">
                {n.upload ? <img src={n.upload} alt="" loading="lazy" /> : null}
                <span className="news-card-year">{n.year}</span>
              </div>
              <div className="news-card-body">
                <div className="news-card-meta">
                  <span className="news-chip">{n.country}</span>
                  <span className="news-date">
                    <Icon path={ICONS.calendar} />
                    {formatDate(n.date)}
                  </span>
                </div>
                <h3>{n.title}</h3>
                <p className="news-card-uni">{n.university}</p>
                <p className="news-card-text">{n.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid-cta reveal">
          <Link className="btn btn-outline" to="/news">
            All announcements
            <Icon path={ICONS.arrow} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Instagram panel — handle, follow link and message shortcut. */
export function InstagramPanel() {
  return (
    <section className="section ig-section">
      <div className="wrap">
        <Reveal className="ig-card">
          <div className="ig-mark" aria-hidden="true">
            <Icon path={ICONS.instagram} />
          </div>

          <div className="ig-copy">
            <span className="eyebrow">
              <Icon path={ICONS.star} />
              Follow us
            </span>
            <h2>
              Updates on <span className="ig-handle">@{CONTACT.instagram}</span>
            </h2>
            <p>
              New scholarships, deadline reminders and application tips are
              posted as they happen. Follow the account, or send us a direct
              message and we will answer within a working day.
            </p>

            <div className="ig-actions">
              <a
                className="btn btn-ig"
                href={CONTACT.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon path={ICONS.instagram} />
                Follow @{CONTACT.instagram}
              </a>
              <Link className="btn btn-outline" to="/contact">
                Send a message
                <Icon path={ICONS.arrow} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
