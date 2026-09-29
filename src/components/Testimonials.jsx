import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ICONS, TESTIMONIALS, contactLink } from "../data/site";
import { Icon, Reveal } from "./Bits";

const INTERVAL = 6000;
const SWIPE_THRESHOLD = 48;

export default function Testimonials({ isPage = false }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const total = TESTIMONIALS.length;

  const go = (dir) => setIndex((i) => (i + dir + total) % total);
  const jump = (i) => setIndex(i);

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => go(1), INTERVAL);
    return () => clearInterval(t);
  }, [paused, total]); // eslint-disable-line react-hooks/exhaustive-deps

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const onTouchEnd = (e) => {
    const start = touchX.current;
    if (start == null) return;
    const delta = e.changedTouches[0].clientX - start;
    if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
    touchX.current = null;
    setPaused(false);
  };

  const onKey = (e) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };

  return (
    <section className="section testimonials">
      <span className="blob blob-1" />
      <span className="blob blob-2" />
      <span className="blob blob-3" />
      <span className="blob blob-4" />

      <div className="wrap">
        {isPage ? (
          <div className="section-head reveal">
            <span className="eyebrow">
              <Icon path={ICONS.star} />
              Success Stories
            </span>
            <h1>
              <span className="text-gradient">Real Stories,</span>{" "}
              <span className="text-gold">Real Success</span>
            </h1>
            <p>
              How students turned shortlists and long shot applications into
              places to study. Every quote below is from someone who went
              through the process end to end.
            </p>
          </div>
        ) : (
          <div className="section-head reveal">
            <span className="eyebrow">
              <Icon path={ICONS.star} />
              Success Stories
            </span>
            <h2>
              <span className="text-gradient">Real Stories,</span>{" "}
              <span className="text-gold">Real Success</span>
            </h2>
            <p>
              Discover how students transformed their dreams into reality. Their
              journeys inspire us every day.
            </p>
          </div>
        )}

        <div
          className="slider"
          tabIndex={0}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={onKey}
        >
          <div
            className="slider-viewport"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                className={`slide${i === index ? " is-active" : ""}`}
                key={t.name}
                aria-hidden={i !== index}
              >
                <article
                  className={`tcard${t.featured ? " is-featured" : ""}`}
                >
                  <div className="tcard-head">
                    <span className="quote-icon">
                      <Icon path={ICONS.quote} />
                    </span>
                    <span className="stars" aria-label="5 out of 5 stars">
                      ★★★★★
                    </span>
                  </div>
                  <p className="tcard-text">{t.text}</p>
                  <div className="tprofile">
                    <span className="avatar" aria-hidden="true">
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <h4>{t.name}</h4>
                      <p>{t.role}</p>
                      {t.university ? (
                        <span className="tuni">
                          <Icon path={ICONS.cap} />
                          {t.university}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className="slider-controls">
            <button
              type="button"
              className="snav"
              onClick={() => go(-1)}
              aria-label="Previous story"
            >
              <Icon path={ICONS.chevL} />
            </button>
            <div className="sdots">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  className={`sdot${i === index ? " is-active" : ""}`}
                  onClick={() => jump(i)}
                  aria-label={`Go to story ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>
            <button
              type="button"
              className="snav"
              onClick={() => go(1)}
              aria-label="Next story"
            >
              <Icon path={ICONS.chevR} />
            </button>
          </div>
        </div>

        <Reveal className="testimonial-actions">
          <Link className="btn btn-gold" to="/services">
            View all success stories
            <Icon path={ICONS.arrow} />
          </Link>
          <Link className="btn btn-outline" to="/applications">
            Start your journey
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
