import HeroSlideshow, { HeroActions } from "./HeroSlideshow";
import { ICONS, STATS } from "../data/site";
import { Icon, Reveal } from "./Bits";

export function Hero() {
  return (
    <section className="hero">
      <HeroSlideshow label="Hero photo">
        <div className="wrap hero-inner">
          <Reveal as="p" className="hero-kicker">
            <Icon path={ICONS.star} />
            Global scholarship platform
          </Reveal>
          <Reveal as="h1">
            Welcome to a global scholarship application, where opportunities
            for education are just a click away.
          </Reveal>
          <Reveal className="hero-actions">
            <HeroActions />
          </Reveal>
        </div>
      </HeroSlideshow>
    </section>
  );
}

export function Stats({ items = STATS }) {
  return (
    <div className="wrap">
      <div className="stats">
        {items.map((s) => (
          <Reveal className="stat" key={s.label}>
            <b>{s.value}</b>
            <span>{s.label}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
