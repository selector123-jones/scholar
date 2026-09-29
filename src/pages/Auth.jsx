import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ICONS } from "../data/site";
import { Icon, Logo } from "../components/Bits";

/* Local-only demo auth. Swap `submit` for a real API call when a backend
   exists — the form state, validation and routing all already work. */
function AuthForm({ mode }) {
  const isLogin = mode === "login";
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setBusy(true);
    // Simulated request; swap for fetch(...) to a real endpoint.
    setTimeout(() => {
      setBusy(false);
      navigate("/applications");
    }, 700);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <Link to="/" className="auth-back">
          <Icon path={ICONS.chevL} />
          Back to home
        </Link>

        <span className="auth-badge" aria-hidden="true">
          <Logo variant="white" />
        </span>
        <h1>{isLogin ? "Welcome back" : "Create your account"}</h1>
        <p className="auth-sub">
          {isLogin
            ? "Log in to see your shortlist and deadlines."
            : "Save opportunities, track deadlines and get document reminders."}
        </p>

        <form className="form" onSubmit={submit}>
          {!isLogin && (
            <label>
              <span>Full name</span>
              <input
                required
                value={form.name}
                onChange={set("name")}
                autoComplete="name"
                placeholder="Your name"
              />
            </label>
          )}

          <label>
            <span>Email address</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={set("email")}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              required
              type="password"
              minLength={8}
              value={form.password}
              onChange={set("password")}
              autoComplete={isLogin ? "current-password" : "new-password"}
              placeholder="At least 8 characters"
            />
          </label>

          <button
            type="submit"
            className="btn btn-brand btn-block"
            disabled={busy}
          >
            <Icon path={isLogin ? ICONS.lock : ICONS.check} />
            {busy
              ? "Please wait…"
              : isLogin
              ? "Log in"
              : "Create account"}
          </button>
        </form>

        <p className="auth-alt">
          {isLogin ? "No account yet?" : "Already registered?"}{" "}
          <Link to={isLogin ? "/signup" : "/login"}>
            {isLogin ? "Sign up" : "Log in"}
          </Link>
        </p>
      </div>
    </div>
  );
}

export function Login() {
  return <AuthForm mode="login" />;
}

export function SignUp() {
  return <AuthForm mode="signup" />;
}
