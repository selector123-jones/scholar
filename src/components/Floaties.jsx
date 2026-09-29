import { CHANNELS, ICONS } from "../data/site";
import { useFirstVisit, useScrolled } from "../hooks/useUi";
import { ChannelIcon, Icon } from "./Bits";

const byId = (id) => CHANNELS.find((c) => c.id === id);

export default function Floaties() {
  const showTop = useScrolled(320);
  const chatRef = useFirstVisit("scholaa_visited");

  const whatsapp = byId("whatsapp");
  const phone = byId("phone");

  return (
    <div className="floaties">
      <button
        type="button"
        className={`float-btn float-top${showTop ? " is-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <Icon path={ICONS.up} />
      </button>

      {whatsapp ? (
        <a
          ref={chatRef}
          className="float-btn float-chat"
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message us on WhatsApp"
          title="Message on WhatsApp"
        >
          <ChannelIcon src={whatsapp.icon} alt="" />
        </a>
      ) : null}

      {phone ? (
        <a
          className="float-btn float-call"
          href={phone.href}
          aria-label={`Call ${phone.value}`}
          title={phone.value}
        >
          <ChannelIcon src={phone.icon} alt="" />
        </a>
      ) : null}
    </div>
  );
}
