import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/* Adds `is-in` to .reveal elements as they scroll into view.
   A MutationObserver keeps watching, because some pages mount `.reveal`
   nodes after the first paint (e.g. the admin editor once signed in). */
export function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seen = new WeakSet();
    let io = null;

    const observeAll = () => {
      document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (io) io.observe(el);
      });
    };

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((n) => n.classList.add("is-in"));
      return undefined;
    }

    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);
}

/* Prevents background scroll while an overlay is open. */
export function useBodyLock(locked) {
  useEffect(() => {
    document.body.classList.toggle("is-locked", locked);
    return () => document.body.classList.remove("is-locked");
  }, [locked]);
}

/* Reactive `true` once the page is scrolled past `offset` px. */
export function useScrolled(offset = 300) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return past;
}

/* Resets scroll on route change, or jumps to a hash target when present. */
export function useScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);
}

/* Adds a class for 10s on first visit only (for the floating chat button). */
export function useFirstVisit(key) {
  const ref = useRef(null);

  useEffect(() => {
    let seen = true;
    try {
      seen = window.localStorage.getItem(key) === "1";
      if (!seen) window.localStorage.setItem(key, "1");
    } catch {
      seen = true; // storage blocked — never pulse
    }

    if (ref.current && !seen) {
      ref.current.classList.add("is-pulsing");
      const t = setTimeout(
        () => ref.current?.classList.remove("is-pulsing"),
        10000
      );
      return () => clearTimeout(t);
    }
  }, [key]);

  return ref;
}
