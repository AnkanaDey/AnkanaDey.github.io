/* ============================================================
   RENDERING — turns the arrays in data.js into HTML.
   You should not need to edit this file to update content;
   edit data.js instead.
   ============================================================ */

function el(html){
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function escapeHtml(str){
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(str){
  return escapeHtml(str)
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ---------- Hero ----------
document.getElementById("heroRole").textContent = SITE.title;
document.getElementById("heroDept").textContent = SITE.dept;
document.getElementById("heroTagline").textContent = SITE.tagline;
document.getElementById("heroemailformatted").textContent = SITE.email_formatted;
document.getElementById("herouniversity").textContent = SITE.university;
document.getElementById("herooffice").textContent = SITE.office;
document.getElementById("ctaCV").href = SITE.links.cv;
document.getElementById("footerText").innerHTML = `
  © ${new Date().getFullYear()} ${escapeHtml(SITE.name)}
  <span class="footer-separator">·</span>
  Last updated: ${escapeHtml(SITE.lastUpdated)}
`;

// ---------- About ----------
const aboutBody = document.getElementById("aboutBody");
SITE.about.forEach(p => aboutBody.appendChild(el(`<p>${escapeHtml(p)}</p>`)));

const openingsNote = document.getElementById("openingsNote");

if (SITE.openings && openingsNote) {
  openingsNote.innerHTML = `
    <strong>Openings:</strong>
    ${escapeHtml(SITE.openings)}
  `;
}

const researchGrid = document.getElementById("researchGrid");
RESEARCH_AREAS.forEach(r => {
  researchGrid.appendChild(el(`
    <div class="research-card reveal">
      <h3>${escapeHtml(r.title)}</h3>
      <p>${escapeHtml(r.body)}</p>
    </div>
  `));
});

// ---------- News ----------
// ============================================================
// NEWS — show 3 items at a time
// ============================================================

const newsList =
  document.getElementById("newsList");

const newsNewer =
  document.getElementById("newsNewer");

const newsOlder =
  document.getElementById("newsOlder");

const newsPageStatus =
  document.getElementById("newsPageStatus");

const newsControls =
  document.getElementById("newsControls");


const NEWS_PER_PAGE = 4;

let currentNewsPage = 0;


// ------------------------------------------------------------
// Sort news automatically by date, newest first
//
// Dates should preferably use:
// YYYY-MM
// or
// YYYY-MM-DD
//
// Example:
// 2026-08
// 2026-08-15
// ------------------------------------------------------------

const sortedNews = [...NEWS].sort((a, b) => {

  return String(b.date).localeCompare(
    String(a.date)
  );

});


const totalNewsPages = Math.ceil(
  sortedNews.length / NEWS_PER_PAGE
);


// ------------------------------------------------------------
// Render one page
// ------------------------------------------------------------

function renderNewsPage(page) {

  if (!newsList) return;


  currentNewsPage = Math.max(
    0,
    Math.min(
      page,
      totalNewsPages - 1
    )
  );


  const start =
    currentNewsPage * NEWS_PER_PAGE;

  const currentItems =
    sortedNews.slice(
      start,
      start + NEWS_PER_PAGE
    );


  // Fade old content
  newsList.classList.add(
    "is-changing"
  );


  window.setTimeout(() => {

    newsList.innerHTML = "";


    currentItems.forEach(item => {

      const newsItem = el(`
        <li class="news-item">

          <time
            class="news-date"
            datetime="${escapeAttr(item.date)}"
          >
            ${escapeHtml(formatNewsDate(item.date))}
          </time>

          <div class="news-text">
            ${escapeHtml(item.text)}
          </div>

        </li>
      `);

      newsList.appendChild(newsItem);

    });


    // Page indicator
    if (newsPageStatus) {

      newsPageStatus.textContent =
        totalNewsPages > 1
          ? `${currentNewsPage + 1} / ${totalNewsPages}`
          : "";

    }


    // Disable arrows at beginning/end
    if (newsNewer) {

      newsNewer.disabled =
        currentNewsPage === 0;

    }


    if (newsOlder) {

      newsOlder.disabled =
        currentNewsPage >=
        totalNewsPages - 1;

    }


    newsList.classList.remove(
      "is-changing"
    );

  }, 120);

}


// ------------------------------------------------------------
// Make the date prettier
//
// 2026-08  -> Aug 2026
// 2026-08-15 -> Aug 2026
// ------------------------------------------------------------

function formatNewsDate(dateString) {

  const match = String(dateString).match(
    /^(\d{4})-(\d{2})/
  );


  if (!match) {
    return dateString;
  }


  const year =
    Number(match[1]);

  const month =
    Number(match[2]);


  const date =
    new Date(
      year,
      month - 1,
      1
    );


  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      year: "numeric"
    }
  );

}


// ------------------------------------------------------------
// Controls
// ------------------------------------------------------------

if (newsNewer) {

  newsNewer.addEventListener(
    "click",
    () => {

      renderNewsPage(
        currentNewsPage - 1
      );

    }
  );

}


if (newsOlder) {

  newsOlder.addEventListener(
    "click",
    () => {

      renderNewsPage(
        currentNewsPage + 1
      );

    }
  );

}


// ------------------------------------------------------------
// Hide navigation when 3 or fewer items exist
// ------------------------------------------------------------

if (
  newsControls &&
  sortedNews.length <= NEWS_PER_PAGE
) {

  newsControls.hidden = true;

}


// Initial page
if (sortedNews.length > 0) {

  renderNewsPage(0);

}
// ---------- Timeline ----------
const timeline = document.getElementById("timeline");
function externalLink(text, url) {
  if (!url) {
    return escapeHtml(text);
  }

  return `
    <a href="${url}" target="_blank" rel="noopener noreferrer">
      ${escapeHtml(text)}
    </a>
  `;
}

APPOINTMENTS.forEach(a => {
  const roleHtml = externalLink(a.role, a.roleUrl);

  const institutionParts = [];

  if (a.place) {
    institutionParts.push(externalLink(a.place, a.placeUrl));
  }

  if (a.secondaryPlace) {
    institutionParts.push(
      externalLink(a.secondaryPlace, a.secondaryPlaceUrl)
    );
  }

  let placeHtml = institutionParts.join(" &amp; ");

  if (a.location) {
    placeHtml += `, ${escapeHtml(a.location)}`;
  }

  const advisorsHtml =
    Array.isArray(a.advisors) && a.advisors.length
      ? `
        <div class="timeline-advisors">
          Advisors:
          ${a.advisors
            .map(advisor => externalLink(advisor.name, advisor.url))
            .join(", ")}
        </div>
      `
      : "";

  timeline.appendChild(el(`
    <div class="timeline-item reveal">
      <div class="timeline-role">${roleHtml}</div>
      <div class="timeline-meta">${placeHtml}</div>
      ${advisorsHtml}
      <div class="timeline-years">${escapeHtml(a.years)}</div>
    </div>
  `));
});

// ---------- Education ----------
const eduGrid = document.getElementById("eduGrid");
EDUCATION.forEach(e => {
  eduGrid.appendChild(el(`
    <div class="edu-card reveal">
      <h3>
  ${e.degreeUrl
    ? `<a href="${e.degreeUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(e.degree)}</a>`
    : escapeHtml(e.degree)}
</h3>

<div class="school">
  ${e.schoolUrl
    ? `<a href="${e.schoolUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(e.school)}</a>`
    : escapeHtml(e.school)}
</div>

${e.department
  ? `<div class="edu-department">
      ${e.departmentUrl
        ? `<a href="${e.departmentUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(e.department)}</a>`
        : escapeHtml(e.department)}
     </div>`
  : ""}
      <div class="years">${escapeHtml(e.years)}</div>
      <p>
        ${escapeHtml(e.detail)}
        ${e.advisor && e.advisorUrl
           ? ` Advisor: <a href="${e.advisorUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(e.advisor)}</a>.`
          : ""}
      </p>
    </div>
  `));
});



// ---------- Publications ----------
const pubList = document.getElementById("pubList");
const TAG_LABEL = { journal: "Journal / Conference", review: "Under review", preprint: "Preprint" };

function renderPubs(filter){
  pubList.innerHTML = "";
  const sorted = [...PUBLICATIONS].sort((a,b) => b.year - a.year);
  sorted
    .filter(p => filter === "all" || p.type === filter)
    .forEach(p => {
      pubList.appendChild(el(`
        <li class="pub-item reveal">
          <div class="pub-num"></div>
          <div>
            <div class="pub-title">
  ${p.url
    ? `<a href="${p.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.title)}</a>`
    : escapeHtml(p.title)}
</div>
            <div class="pub-authors">${escapeHtml(p.authors)}</div>
            ${p.venue
  ? `<div class="pub-venue">${escapeHtml(p.venue)}</div>`
  : ""}
            <div class="pub-tags">
              <span class="tag ${p.type}">${TAG_LABEL[p.type]}</span>
              <span class="tag year">${p.year}</span>
              ${p.note ? `<span class="tag year">${escapeHtml(p.note)}</span>` : ""}
            </div>
          </div>
        </li>
      `));
    });
  requestAnimationFrame(observeReveals);
}
renderPubs("all");

document.querySelectorAll("#pubFilters .pill").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#pubFilters .pill").forEach(b => b.setAttribute("aria-pressed","false"));
    btn.setAttribute("aria-pressed","true");
    renderPubs(btn.dataset.filter);
  });
});

// ---------- Talks ----------
const talkList = document.getElementById("talkList");

function renderTalks(filter){
  talkList.innerHTML = "";
  [...PRESENTATIONS]
    .filter(t => {
      const invited = String(t.kind).toLowerCase() === "invited";
      return filter === "all" || (filter === "invited" && invited) || (filter === "other" && !invited);
    })
    .forEach(t => {
      talkList.appendChild(el(`
        <li class="talk-item reveal">
          <div class="talk-year">${t.year}</div>
          <div>
            <div class="talk-title">${t.title}</div>
            <div class="talk-venue">${escapeHtml(t.venue)}</div>
          </div>
          <div class="talk-kind">${escapeHtml(t.kind)}</div>
        </li>
      `));
    });
  requestAnimationFrame(observeReveals);
}
renderTalks("all");

document.querySelectorAll("#talkFilters .pill").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#talkFilters .pill").forEach(b => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
    renderTalks(btn.dataset.filter);
  });
});

// ---------- Teaching ----------
const teachList = document.getElementById("teachList");

function renderTeaching(filter){
  teachList.innerHTML = "";
  TEACHING
    .filter(t => filter === "grader"
      ? t.role === "Grader"
      : t.role === "Teaching Assistant")
    .forEach(t => {
      teachList.appendChild(el(`
        <li class="teach-item reveal">
          <div class="teach-course">${escapeHtml(t.course)}</div>
          <div class="teach-meta">${escapeHtml(t.place)} · ${escapeHtml(t.term)}</div>
        </li>
      `));
    });
  requestAnimationFrame(observeReveals);
}
renderTeaching("assistant");

document.querySelectorAll("#teachFilters .pill").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#teachFilters .pill").forEach(b => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
    renderTeaching(btn.dataset.filter);
  });
});

const certList = document.getElementById("certList");
TEACHING_CERTS.forEach(c => certList.appendChild(el(`<li>${escapeHtml(c)}</li>`)));

const mentorGrid = document.getElementById("mentorGrid");

if (mentorGrid) {
  MENTORSHIP.forEach(m => {
    mentorGrid.appendChild(el(`
      <div class="mentor-card reveal">
        <h4>${escapeHtml(m.topic)}</h4>
        <p>${escapeHtml(m.students)}</p>
      </div>
    `));
  });
}

// ---------- Dynamic photo gallery ----------
const galleryCarousel = document.getElementById("galleryCarousel");

if (
  galleryCarousel &&
  Array.isArray(GALLERY) &&
  GALLERY.length > 0
) {

  const galleryImage =
    document.getElementById("galleryImage");

  const galleryCaption =
    document.getElementById("galleryCaption");

  const galleryCounter =
    document.getElementById("galleryCounter");

  const gallerySlide =
    document.getElementById("gallerySlide");

  const galleryPrev =
    document.getElementById("galleryPrev");

  const galleryNext =
    document.getElementById("galleryNext");

  const galleryDots =
    document.getElementById("galleryDots");


  // Time each photograph remains visible
  const AUTOPLAY_DELAY = 5000;

  let currentGalleryIndex = 0;
  let galleryTimer = null;




  // ---------------------------------------------------------
  // Create navigation dots
  // ---------------------------------------------------------
  const dots = GALLERY.map((photo, index) => {

    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "gallery-dot";

    dot.setAttribute(
      "aria-label",
      `Show photo ${index + 1}`
    );

    dot.addEventListener("click", () => {
      showGalleryPhoto(index, true);
    });

    galleryDots.appendChild(dot);

    return dot;
  });


  // ---------------------------------------------------------
  // Render photograph
  // ---------------------------------------------------------
  function showGalleryPhoto(index, userAction = false) {

    currentGalleryIndex =
      (index + GALLERY.length) % GALLERY.length;

    const photo = GALLERY[currentGalleryIndex];

    // Brief fade during transition
    gallerySlide.classList.add("is-changing");

    window.setTimeout(() => {

      galleryImage.src = photo.image;

      galleryImage.alt =
        photo.alt || "Gallery photograph";

      galleryCaption.textContent =
        photo.caption || "";

      galleryCounter.textContent =
        `${currentGalleryIndex + 1} / ${GALLERY.length}`;


      // Update navigation dots
      dots.forEach((dot, dotIndex) => {

        const active =
          dotIndex === currentGalleryIndex;

        dot.classList.toggle(
          "active",
          active
        );

        if (active) {
          dot.setAttribute(
            "aria-current",
            "true"
          );
        } else {
          dot.removeAttribute(
            "aria-current"
          );
        }

      });


      gallerySlide.classList.remove(
        "is-changing"
      );


      // Preload the next photograph
      const nextIndex =
        (currentGalleryIndex + 1) %
        GALLERY.length;

      const preloadImage = new Image();

      preloadImage.src =
        GALLERY[nextIndex].image;

    }, 130);


    // Restart timer after manual navigation
    if (userAction) {
      restartGalleryAutoplay();
    }
  }


  // ---------------------------------------------------------
  // Autoplay
  // ---------------------------------------------------------
  function startGalleryAutoplay() {

    if (
         GALLERY.length <= 1
    ) {
      return;
    }

    stopGalleryAutoplay();

    galleryTimer = window.setInterval(() => {

      showGalleryPhoto(
        currentGalleryIndex + 1,
        false
      );

    }, AUTOPLAY_DELAY);
  }


  function stopGalleryAutoplay() {

    if (galleryTimer) {

      window.clearInterval(
        galleryTimer
      );

      galleryTimer = null;
    }
  }


  function restartGalleryAutoplay() {

    stopGalleryAutoplay();

    startGalleryAutoplay();
  }


  // ---------------------------------------------------------
  // Arrow controls
  // ---------------------------------------------------------
  galleryPrev.addEventListener("click", () => {

    showGalleryPhoto(
      currentGalleryIndex - 1,
      true
    );

  });


  galleryNext.addEventListener("click", () => {

    showGalleryPhoto(
      currentGalleryIndex + 1,
      true
    );

  });


  // ---------------------------------------------------------
  // Keyboard navigation
  // ---------------------------------------------------------
  galleryCarousel.addEventListener(
    "keydown",
    event => {

      if (event.key === "ArrowLeft") {

        event.preventDefault();

        showGalleryPhoto(
          currentGalleryIndex - 1,
          true
        );

      }

      if (event.key === "ArrowRight") {

        event.preventDefault();

        showGalleryPhoto(
          currentGalleryIndex + 1,
          true
        );

      }

    }
  );


  // ---------------------------------------------------------
  // Pause while user is interacting
  // ---------------------------------------------------------
  /*
  galleryCarousel.addEventListener(
    "mouseenter",
    stopGalleryAutoplay
  );


  galleryCarousel.addEventListener(
    "mouseleave",
    startGalleryAutoplay
  );


  galleryCarousel.addEventListener(
    "focusin",
    stopGalleryAutoplay
  );


  galleryCarousel.addEventListener(
    "focusout",
    event => {

      if (
        !galleryCarousel.contains(
          event.relatedTarget
        )
      ) {
        startGalleryAutoplay();
      }

    }
  );
*/

  // Stop rotating when browser tab is hidden
  document.addEventListener(
    "visibilitychange",
    () => {

      if (document.hidden) {

        stopGalleryAutoplay();

      } else {

        startGalleryAutoplay();

      }

    }
  );


  // ---------------------------------------------------------
  // If only one photograph exists, hide controls
  // ---------------------------------------------------------
  if (GALLERY.length === 1) {

    galleryPrev.hidden = true;
    galleryNext.hidden = true;
    galleryDots.hidden = true;

  }


  // Initial photograph
  showGalleryPhoto(0);

  // Begin rotation
  startGalleryAutoplay();
}

// ---------- Awards ----------
const awardsGrid = document.getElementById("awardsGrid");
Object.entries(AWARDS).forEach(([group, items]) => {
  const col = el(`<div class="awards-col reveal"><h4>${escapeHtml(group)}</h4><ul></ul></div>`);
  const ul = col.querySelector("ul");
  items.forEach(i => ul.appendChild(el(`<li>${escapeHtml(i)}</li>`)));
  awardsGrid.appendChild(col);
});

// ---------- Service / grants / outreach ----------
const serviceList = document.getElementById("serviceList");
SERVICE.forEach(s => serviceList.appendChild(el(`<li>${escapeHtml(s)}</li>`)));

const fundingList = document.getElementById("fundingList");

if (fundingList) {
  GRANTS.forEach(g => {
    fundingList.appendChild(el(`
      <div class="grant-item reveal">
        <div class="grant-title">
          ${escapeHtml(g.title)}
          <span class="grant-year">(${escapeHtml(g.year)})</span>
        </div>

        ${g.role
          ? `<div class="grant-role">${escapeHtml(g.role)}</div>`
          : ""}

        ${g.amount
          ? `<div class="grant-amount">${escapeHtml(g.amount)}</div>`
          : ""}

        ${g.detail
          ? `<div class="grant-detail">${escapeHtml(g.detail)}</div>`
          : ""}
      </div>
    `));
  });
}

const outreachList = document.getElementById("outreachList");
OUTREACH.forEach(o => outreachList.appendChild(el(`<li>${escapeHtml(o)}</li>`)));

const membershipList = document.getElementById("membershipList");
MEMBERSHIPS.forEach(m => membershipList.appendChild(el(`<li>${escapeHtml(m)}</li>`)));


// ---------- Useful links ----------
const usefulLinksGrid = document.getElementById("usefulLinksGrid");

if (usefulLinksGrid && Array.isArray(USEFUL_LINKS)) {
  USEFUL_LINKS.forEach(link => {
    usefulLinksGrid.appendChild(el(`
      <a
        class="useful-link-card reveal"
        href="${escapeAttr(link.url)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="useful-link-abbr">
          ${escapeHtml(link.abbreviation)}
        </div>

        <div class="useful-link-content">
          <h3>${escapeHtml(link.title)}</h3>

          ${link.description
            ? `<p>${escapeHtml(link.description)}</p>`
            : ""}
        </div>

        <span class="useful-link-arrow" aria-hidden="true">↗</span>
      </a>
    `));
  });
}


// ---------- Contact ----------
const contactLinks = document.getElementById("contactLinks");

if (contactLinks) {

  const linkRows = [
    ["Email", `mailto:${SITE.email}`, SITE.email],

    SITE.phone
      ? ["Phone", `tel:${SITE.phone.replace(/[^+\d]/g, "")}`, SITE.phone]
      : null,

    ["Google Scholar", SITE.links.scholar, "Google Scholar profile"],

    SITE.links.github
      ? ["GitHub", SITE.links.github, "GitHub"]
      : null,

    SITE.links.orcid
      ? ["ORCID", SITE.links.orcid, "ORCID profile"]
      : null,

    SITE.links.linkedin
      ? ["LinkedIn", SITE.links.linkedin, "LinkedIn"]
      : null,

  ].filter(Boolean);


  linkRows.forEach(([label, href, text]) => {

    contactLinks.appendChild(
      el(`
        <a
          href="${href}"
          target="_blank"
          rel="noopener"
        >
          <strong>${label}:</strong>
          ${escapeHtml(text)}
        </a>
      `)
    );

  });
}

// ---------- Mobile nav ----------
const navBurger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");
navBurger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navBurger.setAttribute("aria-expanded", open ? "true" : "false");
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  navBurger.setAttribute("aria-expanded","false");
}));


// ---------- Reveal on scroll ----------
function observeReveals(){
  const items = document.querySelectorAll(".reveal:not(.in)");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  items.forEach(i => io.observe(i));
}
observeReveals();
