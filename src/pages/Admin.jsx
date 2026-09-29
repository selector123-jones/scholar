import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ICONS, CONTACT } from "../data/site";
import {
  EMPTY_NEWS,
  NEWS_COUNTRIES,
  NEWS_FIELDS,
  NEWS_YEARS,
} from "../data/news";
import {
  createNews,
  deleteNews,
  fileToImage,
  isAdmin,
  listNews,
  resetNews,
  signIn,
  signOut,
  updateNews,
  UPLOAD_LIMITS,
} from "../store/newsStore";
import { Icon, Reveal } from "../components/Bits";

/* ------------------------------------------------------------------ gate */
function AdminGate({ onSignedIn }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    // No backend: any non-empty key unlocks the editor for this tab session.
    if (!key.trim()) {
      setError("Enter the admin key to continue.");
      return;
    }
    signIn();
    onSignedIn();
  };

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <Link to="/" className="auth-back">
          <Icon path={ICONS.chevL} />
          Back to site
        </Link>

        <span className="auth-badge" aria-hidden="true">
          <Icon path={ICONS.lock} />
        </span>
        <h1>Admin sign in</h1>
        <p className="auth-sub">
          This editor runs entirely in your browser. Enter any key to unlock it
          for this tab.
        </p>

        <form className="form" onSubmit={submit}>
          <label>
            <span>Admin key</span>
            <input
              type="password"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                setError("");
              }}
              placeholder="••••••••"
              autoFocus
            />
          </label>
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}
          <button type="submit" className="btn btn-brand btn-block">
            <Icon path={ICONS.lock} />
            Sign in
          </button>
        </form>

        <p className="auth-alt">
          Lost the key? Ask whoever manages this site, then email{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- upload */
const kb = (bytes) => `${Math.max(1, Math.round(bytes / 1024))} KB`;

function UploadField({ value, onChange, error }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [note, setNote] = useState("");
  const inputRef = useRef(null);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    setNote("");
    try {
      const uri = await fileToImage(file);
      onChange(uri);
      // A data URI is ~1.33x the raw JPEG and lives in localStorage, so show
      // the real cost rather than letting people hit the quota later.
      const bytes = Math.round((uri.length * 3) / 4);
      setNote(
        `Stored at up to ${UPLOAD_LIMITS.maxEdge}px — ${kb(bytes)} of your ` +
          "~5 MB browser allowance."
      );
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const clear = () => {
    onChange("");
    setNote("");
    setErr("");
  };

  return (
    <div className="upload">
      <span className="upload-label">Cover image</span>

      <div className="upload-preview">
        {value ? (
          <img src={value} alt="Selected cover" />
        ) : (
          <span className="upload-empty">
            <Icon path={ICONS.filter} />
            No image chosen yet
          </span>
        )}
      </div>

      <div className="upload-actions">
        <button
          type="button"
          className="btn btn-sm btn-outline"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
        >
          {busy ? "Processing…" : value ? "Replace image" : "Choose image"}
        </button>
        {value ? (
          <button
            type="button"
            className="btn btn-sm modal-close-ghost"
            onClick={clear}
          >
            Remove
          </button>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={pick}
        className="sr-only"
        tabIndex={-1}
      />

      <p className="upload-hint">
        JPG, PNG or WebP up to {UPLOAD_LIMITS.maxFileBytes / 1024 / 1024} MB.
        Large images are resized to {UPLOAD_LIMITS.maxEdge}px on the longest
        side.
      </p>

      {note ? <p className="upload-note">{note}</p> : null}

      {err ? (
        <p className="form-error" role="alert">
          {err}
        </p>
      ) : null}
      {error && !err ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ form */
function NewsForm({ editing, onDone, onCancel }) {
  const [form, setForm] = useState(EMPTY_NEWS);
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setForm(editing ? { ...editing } : { ...EMPTY_NEWS });
    setErrors({});
    setBanner("");
  }, [editing]);

  const set = (k) => (e) => {
    const v = e?.target ? e.target.value : e;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((x) => ({ ...x, [k]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "A headline is required.";
    if (!form.university.trim()) next.university = "Name the university or body.";
    if (!form.text.trim()) next.text = "Add the announcement details.";
    else if (form.text.trim().length < 20)
      next.text = "Please write at least a sentence or two.";
    if (!form.country) next.country = "Pick a country.";
    if (!form.year) next.year = "Pick a year.";
    if (!form.upload) next.upload = "A cover image is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setBanner("");
    if (!validate()) {
      setBanner("Please fix the highlighted fields.");
      return;
    }
    setBusy(true);
    try {
      if (editing) {
        await updateNews(editing.id, form);
        setBanner("Changes saved.");
      } else {
        await createNews(form);
        setBanner("Announcement published.");
      }
      onDone();
    } catch (ex) {
      setBanner(ex.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="form admin-form" onSubmit={submit} noValidate>
      <h2>{editing ? "Edit announcement" : "New announcement"}</h2>

      <label>
        <span>Headline *</span>
        <input
          value={form.title}
          onChange={set("title")}
          placeholder="e.g. Commonwealth Scholarships open for 2026 intake"
        />
        {errors.title ? <em className="field-error">{errors.title}</em> : null}
      </label>

      <div className="form-row">
        <label>
          <span>Country *</span>
          <select value={form.country} onChange={set("country")}>
            {NEWS_COUNTRIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {errors.country ? (
            <em className="field-error">{errors.country}</em>
          ) : null}
        </label>

        <label>
          <span>Year *</span>
          <select value={form.year} onChange={set("year")}>
            {NEWS_YEARS.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
          {errors.year ? (
            <em className="field-error">{errors.year}</em>
          ) : null}
        </label>
      </div>

      <label>
        <span>University / awarding body *</span>
        <input
          value={form.university}
          onChange={set("university")}
          placeholder="e.g. University of Edinburgh"
        />
        {errors.university ? (
          <em className="field-error">{errors.university}</em>
        ) : null}
      </label>

      <UploadField
        value={form.upload}
        onChange={(v) => {
          setForm((f) => ({ ...f, upload: v }));
          setErrors((x) => ({ ...x, upload: "" }));
        }}
        error={errors.upload}
      />

      <label>
        <span>Details *</span>
        <textarea
          rows={6}
          value={form.text}
          onChange={set("text")}
          placeholder="What is open, who is eligible, and what does an applicant need to submit?"
        />
        {errors.text ? <em className="field-error">{errors.text}</em> : null}
      </label>

      <label className="check">
        <input
          type="checkbox"
          checked={!!form.featured}
          onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
        />
        <span>Feature this on the home page</span>
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-brand" disabled={busy}>
          <Icon path={ICONS.check} />
          {busy
            ? "Saving…"
            : editing
            ? "Save changes"
            : "Publish announcement"}
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
      </div>

      {banner ? (
        <p className="form-banner" role="status">
          {banner}
        </p>
      ) : null}
    </form>
  );
}

/* ------------------------------------------------------------------ page */
export default function Admin() {
  const [authed, setAuthed] = useState(isAdmin());
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [composing, setComposing] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      // Tombstones hide a deleted seed item; they are not listable entries.
      setItems((await listNews()).filter((n) => !n.hidden));
      setError("");
    } catch (ex) {
      setError(ex.message);
    }
  };

  useEffect(() => {
    // Re-check on mount: the admin flag lives in sessionStorage, so a
    // refresh keeps you signed in but a new tab does not.
    setAuthed(isAdmin());
  }, []);

  useEffect(() => {
    if (authed) refresh();
  }, [authed]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!composing && !editing && !confirmId) return undefined;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setComposing(false);
      setEditing(null);
      setConfirmId(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [composing, editing, confirmId]);

  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return items;
    return items.filter((n) =>
      [n.title, n.country, n.university, n.year, n.text]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [items, filter]);

  if (!authed) return <AdminGate onSignedIn={() => setAuthed(true)} />;

  const closeComposer = () => {
    setComposing(false);
    setEditing(null);
  };

  const handleDone = async () => {
    closeComposer();
    await refresh();
  };

  const remove = async (id) => {
    setConfirmId(null);
    try {
      await deleteNews(id);
      await refresh();
    } catch (ex) {
      setError(ex.message);
    }
  };

  const doReset = async () => {
    if (!window.confirm("Discard all admin changes and restore the original list?")) {
      return;
    }
    await resetNews();
    await refresh();
  };

  const signOutAndLeave = () => {
    signOut();
    setAuthed(false);
    navigate("/");
  };

  const composerOpen = composing || !!editing;

  return (
    <>
      <section className="page-hero is-admin">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="eyebrow">
              <Icon path={ICONS.lock} />
              Admin only
            </span>
            <h1>News &amp; announcements</h1>
            <p>
              Add, edit and remove the announcements shown on this site. Changes
              are saved in this browser.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="admin-toolbar">
            <div className="admin-count">
              <b>{visible.length}</b>
              <span>
                {visible.length === 1 ? "announcement" : "announcements"}
              </span>
            </div>

            <div className="admin-tools">
              <div className="filters-search admin-search">
                <Icon path={ICONS.search} />
                <input
                  type="search"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search announcements…"
                  aria-label="Search announcements"
                />
              </div>

              <Link className="btn btn-sm btn-outline" to="/news">
                <Icon path={ICONS.globe} />
                View on site
              </Link>
              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={doReset}
                title="Discard admin changes"
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={signOutAndLeave}
              >
                Sign out
              </button>
              <button
                type="button"
                className="btn btn-sm btn-brand"
                onClick={() => {
                  setEditing(null);
                  setComposing(true);
                }}
              >
                <Icon path={ICONS.check} />
                New announcement
              </button>
            </div>
          </Reveal>

          {error ? (
            <p className="form-error admin-error" role="alert">
              {error}
            </p>
          ) : null}

          <div className={`admin-layout${composerOpen ? " is-split" : ""}`}>
            {composerOpen ? (
              <Reveal className="admin-form-card">
                <NewsForm
                  editing={editing}
                  onDone={handleDone}
                  onCancel={closeComposer}
                />
              </Reveal>
            ) : null}

            <div className="admin-list">
              {visible.length ? (
                visible.map((n) => (
                  <article className="news-row" key={n.id}>
                    <div className="news-thumb">
                      {n.upload ? (
                        <img src={n.upload} alt="" loading="lazy" />
                      ) : null}
                    </div>

                    <div className="news-main">
                      <div className="news-meta">
                        <span className="news-chip">{n.country}</span>
                        <span className="news-chip is-year">{n.year}</span>
                        {n.featured ? (
                          <span className="news-chip is-featured">Featured</span>
                        ) : null}
                      </div>
                      <h3>{n.title}</h3>
                      <p className="news-uni">{n.university}</p>
                      <p className="news-text">{n.text}</p>
                    </div>

                    <div className="news-actions">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline"
                        onClick={() => {
                          setComposing(false);
                          setEditing(n);
                        }}
                      >
                        Edit
                      </button>
                      {confirmId === n.id ? (
                        <div className="confirm" role="alertdialog">
                          <span>Delete this?</span>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => remove(n.id)}
                          >
                            Yes, delete
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline"
                            onClick={() => setConfirmId(null)}
                          >
                            Keep
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger-ghost"
                          onClick={() => setConfirmId(n.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </article>
                ))
              ) : (
                <Reveal className="empty">
                  <Icon path={ICONS.info} />
                  <h3>Nothing to show</h3>
                  <p>
                    {filter
                      ? "No announcement matches that search."
                      : "Add your first announcement to get started."}
                  </p>
                  {filter ? (
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setFilter("")}
                    >
                      Clear search
                    </button>
                  ) : null}
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
