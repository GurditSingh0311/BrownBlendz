(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));

  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbClose = document.getElementById("lbClose");

  function openLB(src, alt) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || "Gallery image";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLB() {
    if (!lb || !lbImg) return;
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".gcard").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-full") || "";
      const img = btn.querySelector("img");
      openLB(src, img ? img.alt : "");
    });
  });

  if (lbClose) lbClose.addEventListener("click", closeLB);
  if (lb) lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLB(); });
})();