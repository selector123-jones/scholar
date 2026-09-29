import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ICONS, LEVELS, SCHOLARSHIPS } from "../data/site";
import { Icon, Reveal } from "../components/Bits";
import HeroSlideshow from "../components/HeroSlideshow";
import {
  ScholarshipCard,
  ScholarshipDialogs,
  SideStack,
} from "../components/Scholarships";

export default function Applications() {
  const [params, setParams] = useSearchParams();
  const [level, setLevel] = useState("All levels");
  const [query, setQuery] = useState("");

  const openId = params.get("open");

  const setOpen = (id) => {
    if (id) params.set("open", String(id));
    else params.delete("open");
    setParams(params, { replace: true });
  };

  const filtered = SCHOLARSHIPS.filter((s) => {
    const byLevel = level === "All levels" || s.level === level;
    const q = query.trim().toLowerCase();
    const byQuery =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.country.toLowerCase().includes(q) ||
      s.level.toLowerCase().includes(q) ||
      s.body.toLowerCase().includes(q);
    return byLevel && byQuery;
  });

  return (
    <>
      <section className="page-hero page-hero--bare">
        {/* The heading stays for screen readers and search engines; the
            visual banner is the photo slideshow. */}
        <h1 className="sr-only">All scholarship applications</h1>
        <HeroSlideshow label="Applications photo" arrows />
      </section>

      <section className="section scholarships">
        <div className="wrap">
          <div className="scholarships-layout">
            <SideStack />

            <div className="scholarships-results">
              <div className="filters reveal">
                <div className="filters-search">
                  <Icon path={ICONS.search} />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title, country or level…"
                    aria-label="Search applications"
                  />
                </div>

                <div className="chips-row" role="group" aria-label="Filter by level">
                  {LEVELS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      className={`pill${level === l ? " is-active" : ""}`}
                      onClick={() => setLevel(l)}
                      aria-pressed={level === l}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {filtered.length ? (
                <div className="scholarships-main">
                  {filtered.map((s, i) => (
                    <ScholarshipCard s={s} index={i} key={s.id} />
                  ))}
                </div>
              ) : (
                <Reveal className="empty">
                  <Icon path={ICONS.filter} />
                  <h3>No applications match that search</h3>
                  <p>Try a different level, or clear the search box.</p>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setQuery("");
                      setLevel("All levels");
                    }}
                  >
                    Clear filters
                  </button>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      <ScholarshipDialogs open={openId} onClose={() => setOpen(null)} />
    </>
  );
}
