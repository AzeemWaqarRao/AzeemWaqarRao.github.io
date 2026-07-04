/* =========================================================
   Azeem Waqar — Portfolio interactions
   ========================================================= */

/* --- Contact form config ---------------------------------
   Leave blank to use the mailto fallback (works on any host).
   To enable real submissions: create a free form at
   https://formspree.io and paste your endpoint, e.g.
   "https://formspree.io/f/abcdwxyz"
--------------------------------------------------------- */
const FORMSPREE_ENDPOINT = "";
const CONTACT_EMAIL = "azeemwaqar2k15@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initMobileNav();
  initRevealOnScroll();
  initActiveNavLink();
  initProgressBar();
  initContactForm();
});

/* ---------- Footer year ---------- */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Mobile nav toggle ---------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close after picking a link (mobile)
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));

  // Close if resized up to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) close();
  });
}

/* ---------- Reveal on scroll ---------- */
function initRevealOnScroll() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Active nav link on scroll ---------- */
function initActiveNavLink() {
  const links = Array.from(
    document.querySelectorAll('.primary-nav a[href^="#"]')
  );
  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === `#${id}`)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => io.observe(s));
}

/* ---------- Reading progress bar ---------- */
function initProgressBar() {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;

  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    bar.style.width = pct + "%";
  };

  document.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ---------- Contact form ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    if (!form.reportValidity()) return;

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    // Path 1: Formspree (if configured)
    if (FORMSPREE_ENDPOINT) {
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        if (res.ok) {
          form.reset();
          setStatus(status, "Thanks! Your message has been sent.", "ok");
        } else {
          setStatus(status, "Something went wrong. Please email me directly.", "err");
        }
      } catch {
        setStatus(status, "Network error. Please email me directly.", "err");
      }
      return;
    }

    // Path 2: mailto fallback (works with no backend)
    const subject = encodeURIComponent(`Portfolio contact from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus(status, "Opening your email app…", "ok");
  });
}

function setStatus(el, msg, kind) {
  el.textContent = msg;
  el.className = `form-status ${kind}`;
}
