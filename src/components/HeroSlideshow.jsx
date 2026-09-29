import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ICONS } from "../data/site";
import { Icon } from "./Bits";

import studentsImg from "../assets/hero/students.jpg";
import graduationImg from "../assets/hero/graduation.jpg";
import degreesImg from "../assets/hero/degrees.jpg";

/* The supplied photographs, in slide order. */
export const HERO_IMAGES = [
  { src: studentsImg, alt: "Graduates celebrating together" },
  { src: graduationImg, alt: "Graduates throwing caps into the air" },
  { src: degreesImg, alt: "Students holding their rolled degrees" },
];

const INTERVAL = 6000;
const SWIPE = 48;

/**
 * Auto-advancing photo slideshow with dots, arrows and swipe.
 *
 * `children` renders on top of the photos, so the same slideshow backs both
 * the home hero (with a headline) and the plain page banners (without one).
 */
export default function HeroSlideshow({
  images = HERO_IMAGES,
  children,
  label = "Featured",
  dots = true,
  arrows = false,
  interval = INTERVAL,
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const count = images.length;

  const go = useCallback(
    (dir) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused || count < 2) return undefined;
    const t = setInterval(() => go(1), interval);
    return () => clearInterval(t);
  }, [paused, count, interval, go]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const onTouchEnd = (e) => {
    const start = touchX.current;
    if (start == null) return;
    const delta = e.changedTouches[0].clientX - start;
    if (Math.abs(delta) > SWIPE) go(delta < 0 ? 1 : -1);
    touchX.current = null;
    setPaused(false);
  };

  return (
    <div
      className="slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="slideshow-stage">
        {images.map((img, i) => (
          <img
            key={img.src}
            className={`slideshow-img${i === index ? " is-active" : ""}`}
            src={img.src}
            alt={i === index ? img.alt : ""}
            aria-hidden={i !== index}
            /* First slide is the LCP element — let it load eagerly. */
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
          />
        ))}
        <span className="slideshow-scrim" aria-hidden="true" />
      </div>

      {children ? <div className="slideshow-body">{children}</div> : null}

      {arrows ? (
        <button
          type="button"
          className="slideshow-arrow is-prev"
          onClick={() => go(-1)}
          aria-label="Previous photo"
        >
          <Icon path={ICONS.chevL} />
        </button>
      ) : null}

      {dots ? (
        <div className="slideshow-dots" role="tablist" aria-label={label}>
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${label} ${i + 1} of ${count}`}
              className={i === index ? "is-active" : ""}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** Standard call-to-action pair used over the home hero. */
export function HeroActions() {
  return (
    <div className="cta-actions">
      <Link className="btn btn-gold" to="/applications">
        All Applications
        <Icon path={ICONS.arrow} />
      </Link>
      <Link className="btn btn-light" to="/courses">
        Enroll Now
      </Link>
    </div>
  );
}
