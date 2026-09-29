/* ==========================================================================
   News store — browser-persisted CRUD for the /admin area.

   There is no backend in this project, so entries live in localStorage and
   are layered over the seed list in src/data/news.js. `listNews()` returns
   seed + user items, newest first.

   To move to a real backend, replace the four functions below with fetch
   calls — the admin UI only depends on this module's interface:

     listNews()            -> Promise<News[]>
     createNews(item)       -> Promise<News>
     updateNews(id, patch)  -> Promise<News>
     deleteNews(id)         -> Promise<void>
     resetNews()            -> Promise<void>
   ========================================================================== */

import SEED, { EMPTY_NEWS } from "../data/news";

const KEY = "scholaa.news.v1";
const SESSION_KEY = "scholaa.admin";

/* localStorage is ~5MB in total, and the stored value is a base64 data URI
   (~1.33x the raw bytes). Resizing on upload is what keeps a realistic number
   of entries possible. Raise MAX_UPLOAD_EDGE for sharper images, lower it for
   more of them. */
const MAX_UPLOAD_EDGE = 1600;
const UPLOAD_QUALITY = 0.85;
const MAX_FILE_BYTES = 25 * 1024 * 1024;

export const UPLOAD_LIMITS = {
  maxEdge: MAX_UPLOAD_EDGE,
  maxFileBytes: MAX_FILE_BYTES,
};

const hasStorage = () => {
  try {
    const probe = "__probe__";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
};

const storageAvailable = hasStorage();

const readRaw = () => {
  if (!storageAvailable) return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeRaw = (items) => {
  if (!storageAvailable) {
    throw new Error(
      "This browser is blocking local storage, so entries cannot be saved. " +
        "Allow site data, or point newsStore at a real API."
    );
  }
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch (err) {
    throw new Error(
      "Storage is full. Delete an entry with a large image, or use a smaller " +
        `image. (${err.name})`
    );
  }
};

const byDateDesc = (a, b) => String(b.date).localeCompare(String(a.date));

/** Seed news plus anything created in the admin area, newest first. */
export async function listNews() {
  return [...readRaw(), ...SEED].sort(byDateDesc);
}

/** Insert one entry. Returns the stored record, including its new id. */
export async function createNews(input) {
  const item = {
    ...EMPTY_NEWS,
    ...input,
    id: `u${Date.now().toString(36)}`,
    date: input.date || new Date().toISOString().slice(0, 10),
  };
  const items = readRaw();
  items.unshift(item);
  writeRaw(items);
  return item;
}

/** Patch an existing entry. Seed entries are copied in on first edit. */
export async function updateNews(id, patch) {
  const items = readRaw();

  const idx = items.findIndex((n) => n.id === id);
  if (idx !== -1) {
    items[idx] = { ...items[idx], ...patch };
    writeRaw(items);
    return items[idx];
  }

  const seedItem = SEED.find((n) => n.id === id);
  if (!seedItem) throw new Error(`No news item with id "${id}"`);

  // A seed item keeps its id so repeated edits do not create duplicates.
  const updated = { ...seedItem, ...patch };
  items.unshift(updated);
  writeRaw(items);
  return updated;
}

/** Remove an entry. Seed entries are tombstoned so the edit is remembered. */
export async function deleteNews(id) {
  const items = readRaw().filter((n) => n.id !== id);
  if (items.length !== readRaw().length) {
    writeRaw(items);
    return;
  }
  if (SEED.some((n) => n.id === id)) {
    // Tombstone: an entry with no content hides the seed item for this browser.
    items.unshift({ ...EMPTY_NEWS, id, text: "", hidden: true });
    writeRaw(items);
  }
}

/** Discard all admin changes and go back to the shipped seed list. */
export async function resetNews() {
  if (storageAvailable) window.localStorage.removeItem(KEY);
}

/* ------------------------------------------------------------- session */
/* A front-end flag only. Real authorisation must live on a server. */

export function isAdmin() {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function signIn() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function signOut() {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

/* -------------------------------------------------------------- images */
/**
 * Read a picked File and return a downscaled JPEG data URI.
 * Rejects files that are not images, and anything unreasonably large.
 */
export function fileToImage(file, { maxEdge = MAX_UPLOAD_EDGE } = {}) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file selected."));
    if (!/^image\//.test(file.type)) {
      return reject(new Error("Choose an image file (JPG, PNG or WebP)."));
    }
    if (file.size > MAX_FILE_BYTES) {
      return reject(
        new Error(
          `That image is over ${Math.round(
            MAX_FILE_BYTES / 1024 / 1024
          )} MB. Please pick a smaller one.`
        )
      );
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("That file is not a readable image."));
      img.onload = () => {
        const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, w, h);

        resolve(canvas.toDataURL("image/jpeg", UPLOAD_QUALITY));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
