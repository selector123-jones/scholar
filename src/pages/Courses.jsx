import { useState } from "react";
import { Link } from "react-router-dom";
import { COURSES, ICONS, contactLink } from "../data/site";
import { Icon, Reveal } from "../components/Bits";
import { CtaBanner } from "../components/Sections";

export default function Courses() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="eyebrow">
              <Icon path={ICONS.cap} />
              {COURSES.length} courses
            </span>
            <h1>Courses built around real applications</h1>
            <p>
              Short, practical programmes on the parts of the process students
              get wrong — shortlisting, documents, interviews and test
              preparation.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="course-grid">
            {COURSES.map((c, i) => {
              const expanded = open === c.id;
              return (
                <Reveal
                  as="article"
                  className={`course${expanded ? " is-open" : ""}`}
                  key={c.id}
                  style={{ transitionDelay: `${(i % 3) * 60}ms` }}
                >
                  <div className="course-top">
                    <span className="course-level">{c.level}</span>
                    <span className="course-price">
                      <b>${c.price}</b> / course
                    </span>
                  </div>

                  <h3 className="course-title">{c.title}</h3>
                  <p className="course-tagline">{c.tagline}</p>
                  <p className="course-blurb">{c.blurb}</p>

                  <ul className="course-facts">
                    <li>
                      <Icon path={ICONS.play} />
                      {c.lessons} lessons
                    </li>
                    <li>
                      <Icon path={ICONS.clock} />
                      {c.weeks} weeks
                    </li>
                  </ul>

                  <div
                    className={`course-outcomes${
                      expanded ? " is-open" : ""
                    }`}
                  >
                    <ul>
                      {c.outcomes.map((o) => (
                        <li key={o}>
                          <Icon path={ICONS.check} />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="course-actions">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline"
                      onClick={() => setOpen(expanded ? null : c.id)}
                      aria-expanded={expanded}
                    >
                      {expanded ? "Hide details" : "What you'll learn"}
                    </button>
                    <a
                      className="btn btn-sm btn-brand"
                      href={contactLink(
                        `Hello, I would like to enrol in "${c.title}".`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enrol
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
