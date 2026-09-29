import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BRAND,
  CHANNELS,
  ICONS,
  NAV_AUTH,
  NAV_MAIN,
  NAV_MORE,
  todayLong,
} from "../data/site";
import { useBodyLock } from "../hooks/useUi";
import { ChannelIcon, Icon, Logo } from "./Bits";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  useBodyLock(drawerOpen);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setMoreOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // The desktop dropdown is also hover-driven; reset it when the layout shrinks.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const sync = (e) => e.matches && setMoreOpen(false);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <header className="site-header">
      {/* Top bar — date + contact shortcuts. Hidden on phones, mirrored below. */}
      <div className="topbar">
        <div className="wrap topbar-inner">
          <span className="topbar-date">{todayLong()}</span>
          <div className="topbar-socials">
            {CHANNELS.map((c) => (
              <a
                key={c.id}
                className={`topbar-chip chip-${c.id}`}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                aria-label={`${c.label}: ${c.value}`}
                title={`${c.label}: ${c.value}`}
              >
                <ChannelIcon src={c.icon} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        <nav className="nav" aria-label="Main">
          <NavLink to="/" aria-label={`${BRAND.name} — home`}>
            <Logo variant="navy" />
          </NavLink>

          <div className="nav-menu">
            <ul className="nav-list">
              {NAV_MAIN.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `nav-link${isActive ? " is-active" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              <li className={`nav-more${moreOpen ? " is-open" : ""}`}>
                <button
                  type="button"
                  className={`nav-link${moreOpen ? " is-active" : ""}`}
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                  onClick={() => setMoreOpen((v) => !v)}
                >
                  More
                </button>
                <ul className="nav-more-menu">
                  {NAV_MORE.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        onClick={() => setMoreOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                  {NAV_AUTH.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        onClick={() => setMoreOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          <div className="nav-right">
            <div className="nav-auth">
              {NAV_AUTH.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="btn btn-brand btn-sm"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <button
              type="button"
              className="burger"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={`drawer-backdrop${drawerOpen ? " is-open" : ""}`}
        onClick={closeDrawer}
        aria-hidden={!drawerOpen}
      >
        <div
          className="drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="drawer-head">
            <NavLink to="/" onClick={closeDrawer}>
              <Logo variant="navy" />
            </NavLink>
            <button
              type="button"
              className="drawer-close"
              aria-label="Close menu"
              onClick={closeDrawer}
            />
          </div>

          <div className="drawer-body">
            <ul>
              {NAV_MAIN.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={closeDrawer}
                    className={({ isActive }) =>
                      `drawer-link${isActive ? " is-active" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <p className="drawer-group-label">More</p>
            <ul>
              {NAV_MORE.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={closeDrawer}
                    className={({ isActive }) =>
                      `drawer-link${isActive ? " is-active" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="drawer-cta">
              {NAV_AUTH.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeDrawer}
                  className={`btn btn-block ${
                    item.label === "Login" ? "btn-brand" : "btn-outline"
                  }`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <p className="drawer-group-label">Get in touch</p>
            <ul className="drawer-channels">
              {CHANNELS.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                  >
                    <ChannelIcon src={c.icon} alt="" />
                    <span>{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
