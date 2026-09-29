import { Link } from "react-router-dom";
import { ICONS } from "../data/site";
import { Icon, Reveal } from "../components/Bits";
import { Hero, Stats } from "../components/Hero";
import { ScholarshipPreview } from "../components/Scholarships";
import Testimonials from "../components/Testimonials";
import NewsFeed, { InstagramPanel } from "../components/NewsFeed";
import { CtaBanner, WhyUs } from "../components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ScholarshipPreview />
      <NewsFeed limit={3} />
      <CtaBanner />
      <Testimonials />
      <InstagramPanel />
      <WhyUs />
    </>
  );
}

export function NotFound() {
  return (
    <section className="section page-hero is-404">
      <div className="wrap">
        <div className="page-hero-inner">
          <span className="eyebrow">
            <Icon path={ICONS.info} />
            Error 404
          </span>
          <h1>That page has moved on</h1>
          <p>
            The link you followed does not exist. Here is where everything
            lives now.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-gold" to="/">
              Back to home
              <Icon path={ICONS.arrow} />
            </Link>
            <Link className="btn btn-light" to="/applications">
              Browse applications
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
