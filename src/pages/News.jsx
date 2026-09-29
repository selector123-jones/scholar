import { CONTACT, ICONS, SOCIAL_CHANNELS, CHANNELS } from "../data/site";
import emailIcon from "../assets/icons/email.png";
import { NewsList } from "../components/NewsFeed";
import { ChannelIcon, Icon, Reveal } from "../components/Bits";

export default function News() {
  const email = CHANNELS.find((c) => c.id === "email");

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="eyebrow">
              <Icon path={ICONS.cap} />
              Announcements
            </span>
            <h1>News &amp; updates</h1>
            <p>
              New programmes, deadlines and award announcements, newest first.
              Anything published in the admin area shows up here straight away.
            </p>
          </div>
        </div>
      </section>

      <section className="section news-section">
        <div className="wrap">
          <NewsList />

          <Reveal className="news-cta">
            <h2>Get announcements as they post</h2>
            <p>
              Follow @{CONTACT.instagram} for deadline reminders, or email
              {` ${CONTACT.email}`} and we will add you to the list.
            </p>
            <div className="cta-actions">
              {SOCIAL_CHANNELS.map((c) => (
                <a
                  key={c.id}
                  className="btn btn-outline btn-sm"
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ChannelIcon src={c.icon} alt="" className="is-btn" />
                  {c.label}
                </a>
              ))}
              {email ? (
                <a className="btn btn-brand btn-sm" href={email.href}>
                  <ChannelIcon src={emailIcon} alt="" className="is-btn" />
                  Email us
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
