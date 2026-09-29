import { useEffect } from "react";
import { ICONS } from "../data/site";
import { Icon } from "./Bits";

/* Accessible modal shell: locks scroll, closes on Escape / backdrop click. */
export default function Modal({ title, icon, onClose, children, actions, wide }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.classList.add("is-locked");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("is-locked");
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className={`modal${wide ? " modal--wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          {icon ? (
            <span className="modal-head-icon">
              <Icon path={icon} />
            </span>
          ) : null}
          <h3>{title}</h3>
          <button
            type="button"
            className="modal-x"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <Icon path={ICONS.close} />
          </button>
        </div>

        <div className="modal-body">{children}</div>

        {actions ? <div className="modal-actions">{actions}</div> : null}
      </div>
    </div>
  );
}
