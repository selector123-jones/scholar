import { useState } from "react";
import { Link } from "react-router-dom";
import { FAQS, ICONS, contactLink } from "../data/site";
import { Icon, Reveal } from "../components/Bits";
import { CtaBanner } from "../components/Sections";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="eyebrow">
              <Icon path={ICONS.info} />
              {FAQS.length} questions
            </span>
            <h1>Frequently asked questions</h1>
            <p>
              The things students ask before they apply. If yours is not here,
              message us and we will answer it directly.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="faq-list">
            {FAQS.map((f, i) => {
              const expanded = open === i;
              return (
                <Reveal className="faq" key={f.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(expanded ? -1 : i)}
                      aria-expanded={expanded}
                    >
                      <span>{f.q}</span>
                      <span className="faq-toggle" aria-hidden="true">
                        <Icon path={expanded ? ICONS.close : ICONS.arrow} />
                      </span>
                    </button>
                  </h3>
                  <div
                    className={`faq-body${expanded ? " is-open" : ""}`}
                    >
                    <p>{f.a}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="faq-cta">
            <h2>Still have a question?</h2>
            <p>Talk to a person — we usually reply the same working day.</p>
            <div className="cta-actions">
              <Link className="btn btn-brand" to="/contact">
                Contact us
                <Icon path={ICONS.arrow} />
              </Link>
              <a
                className="btn btn-outline"
                href={contactLink("Hello, I have a question about your services.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask by email
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
