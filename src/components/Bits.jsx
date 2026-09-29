import { Link } from "react-router-dom";
import logoNavy from "../assets/logo-navy.png";
import logoWhite from "../assets/logo-white.png";
import { BRAND } from "../data/site";

/* Small presentational helpers shared across components. */

export function Icon({ path, size, className = "", ...rest }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      // `.i` gives a sane 1em default; container rules like `.btn svg`
      // override it where a specific size is wanted.
      className={`i ${className}`.trim()}
      {...rest}
    >
      <path d={path} />
    </svg>
  );
}

/* The brand logo, auto-trimmed from the supplied artwork (see
   tools/make-logo.mjs). Two recolours: navy for light backgrounds, white for
   dark ones. Both are transparent PNGs. */
export function Logo({ variant = "navy", className = "" }) {
  const src = variant === "white" ? logoWhite : logoNavy;
  return (
    <img
      className={`brand-logo ${className}`.trim()}
      src={src}
      alt={BRAND.name}
      width="104"
      height="23"
      decoding="async"
    />
  );
}

/* Channel artwork. The brand's social/contact icons are the supplied image
   files, trimmed to transparent PNGs by tools/make-icons.mjs, not inline SVG. */
export function ChannelIcon({ src, alt = "", className = "" }) {
  return (
    <img
      className={`channel-icon ${className}`.trim()}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}

export function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

/* Internal link that preserves keyboard focus styling and router behaviour. */
export function AppLink({ to, className = "", children, ...rest }) {
  return (
    <Link to={to} className={className} {...rest}>
      {children}
    </Link>
  );
}
