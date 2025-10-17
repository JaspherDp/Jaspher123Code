/* =========================================================
   SIDEBAR TOGGLE FUNCTIONALITY
   ========================================================= */
const toggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleSidebar() {
  // Only trigger sidebar on mobile screens
  if (window.innerWidth <= 768) {
    if (toggle.checked) {
      sidebar.classList.add('active');
      overlay.classList.add('active');
    } else {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  }
}

// Listen for toggle switch changes
toggle.addEventListener('change', toggleSidebar);

// Close sidebar when clicking the overlay (outside area)
overlay.addEventListener('click', () => {
  if (window.innerWidth <= 768) {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    toggle.checked = false;
  }
});

// Hide sidebar when resizing to desktop view
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    toggle.checked = false;
  }
});


/* =========================================================
   CONTACT FORM SUBMIT ALERT
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Your message has been sent!');
      this.reset();
    });
  }
});


/* =========================================================
   NAVIGATION ACTIVE LINK HIGHLIGHT ON SCROLL
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("#nav-links a");
  const sections = document.querySelectorAll("section[id]");

  function activateNavLink() {
    let scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", activateNavLink);
  activateNavLink(); // Run once on load
});

// Disable automatic scroll restoration (optional)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}


/* =========================================================
   NAME TYPING ANIMATION (TWO LINES)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const firstLine = document.querySelector('.typing-line');
  const secondLine = document.querySelector('.lastname');

  // Remove cursor from first line after typing ends
  setTimeout(() => {
    firstLine.style.borderRight = 'none';
  }, 2300);

  // Start second line typing after first finishes
  setTimeout(() => {
    secondLine.style.opacity = '1';
    secondLine.style.animationPlayState = 'running';
  }, 2400);

  // Remove cursor from second line after typing ends
  setTimeout(() => {
    secondLine.style.borderRight = 'none';
  }, 4100);
});


/* =========================================================
   MULTI-WORD TYPING EFFECT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  function typeLine(lineSelector, delayBetweenWords = 300, callback) {
    const line = document.querySelector(lineSelector);
    const words = line.querySelectorAll('span');
    let i = 0;

    function typeWord() {
      if (i >= words.length) {
        // Remove cursor after all words are typed
        words.forEach(w => w.style.borderRight = 'none');
        if (callback) callback();
        return;
      }

      const word = words[i];
      word.style.opacity = '1';
      word.style.width = '0ch';

      let current = 0;
      const textLength = word.textContent.length;

      const interval = setInterval(() => {
        current++;
        word.style.width = `${current}ch`;

        if (current >= textLength) {
          clearInterval(interval);
          word.style.borderRight = 'none';
          i++;
          setTimeout(typeWord, delayBetweenWords);
        }
      }, 100);
    }

    typeWord();
  }

  // Run typing animation sequence
  typeLine('.typing-line', 300, () => {
    const lastLine = document.querySelector('.lastname');
    lastLine.style.opacity = '1';
    typeLine('.lastname', 300);
  });
});


/* =========================================================
   LIGHT / DARK MODE TOGGLE (HEADER)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('input');
  const body = document.body;

  if (toggle) {
    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        body.classList.remove('light-mode'); // Dark mode ON
      } else {
        body.classList.add('light-mode'); // Light mode ON
      }
    });
  }
});


/* =========================================================
   LIGHT / DARK MODE SYNC (HEADER + SIDEBAR)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const headerToggle = document.getElementById('input');
  const sidebarToggle = document.getElementById('sidebar-dark-toggle');
  const body = document.body;
  const rectangleLogo = document.querySelector('.logo-rectangle');

  // Set dark/light mode with optional localStorage save
  function setDarkMode(isDark, save = true) {
    if (isDark) {
      body.classList.remove('light-mode');
      rectangleLogo.src = 'rectanglelogo.png';
    } else {
      body.classList.add('light-mode');
      rectangleLogo.src = 'rectanglelogoblack.png';
    }

    // Sync both toggles
    headerToggle.checked = isDark;
    sidebarToggle.checked = isDark;

    // Save mode to localStorage
    if (save) {
      localStorage.setItem('mode', isDark ? 'dark' : 'light');
    }
  }

  // Load saved mode from localStorage
  const savedMode = localStorage.getItem('mode');
  if (savedMode) {
    setDarkMode(savedMode === 'dark', false);
  }

  // Toggle from header
  headerToggle.addEventListener('change', () => {
    setDarkMode(headerToggle.checked);
  });

  // Toggle from sidebar
  sidebarToggle.addEventListener('change', () => {
    setDarkMode(sidebarToggle.checked);
  });
});

/* =========================================================
   PHOTO GRID BEHAVIOR (TOUCH VS DESKTOP)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const photos = document.querySelectorAll(".photo");
  const grid = document.querySelector(".photo-grid");
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    // On touch devices: tap to activate photo
    photos.forEach((photo, index) => {
      photo.addEventListener("click", () => {
        // Remove active state from other photos
        photos.forEach((p, i) => {
          if (i !== index) p.classList.remove("active");
        });

        // Toggle active state for tapped photo
        photo.classList.toggle("active");

        // Update grid attribute
        if (photo.classList.contains("active")) {
          const pos = index + 1;
          grid.setAttribute("data-active", pos);
        } else {
          grid.removeAttribute("data-active");
        }
      });
    });
  } else {
    // On desktop: prevent click interference (hover only)
    photos.forEach(photo => {
      photo.addEventListener("click", e => e.preventDefault());
    });
  }
});


/* =========================================================
   TIMELINE SCROLL GLOW EFFECT
   ========================================================= */
const line = document.querySelector('.line');
const glow = document.querySelector('.glow');
const timelineContainer = document.querySelector('.timeline-container');

function updateGlow() {
  const containerRect = timelineContainer.getBoundingClientRect();
  const containerTop = containerRect.top + window.scrollY;
  const containerHeight = containerRect.height;
  const scrollMiddle = window.scrollY + window.innerHeight / 2;

  // Calculate progress ratio (0–1)
  let progress = (scrollMiddle - containerTop) / containerHeight;
  progress = Math.min(Math.max(progress, 0), 1);

  // Adjust glow height
  glow.style.height = `${progress * 100}%`;
}

// Update glow on scroll and resize
window.addEventListener('scroll', updateGlow);
window.addEventListener('resize', updateGlow);
updateGlow();


/* =========================================================
   PORTFOLIO PROJECT VIEW / BACK NAVIGATION
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const viewMoreBtns = document.querySelectorAll('.viewmore-btn');
  const backBtns = document.querySelectorAll('.back-btn');
  const projectSections = document.querySelectorAll('.project-details');
  const portfolioSection = document.getElementById('portfolio');
  const allSections = Array.from(document.querySelectorAll('section'));
  const navbar = document.querySelector('nav');
  const footer = document.querySelector('footer');

  let previouslyVisibleSections = [];
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Hide all sections except specific ones
  function hideAllSectionsExcept(allowedIds = []) {
    allSections.forEach(sec => {
      if (allowedIds.includes(sec.id)) sec.classList.remove('hidden');
      else sec.classList.add('hidden');
    });
  }

  // Open selected project section
  function openProject(projectId) {
    const target = document.getElementById(projectId);
    if (!target) return;

    previouslyVisibleSections = allSections
      .filter(s => !s.classList.contains('hidden'))
      .map(s => s.id);

    hideAllSectionsExcept([projectId]);
    target.classList.remove('hidden');

    // Scroll to top instantly
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 30);

    // Play carousel animation
    const carousel = target.querySelector('.carousel');
    if (carousel) carousel.style.animationPlayState = 'running';
  }

  // Close project and restore previous view
  function closeProjectAndRestore() {
    projectSections.forEach(sec => sec.classList.add('hidden'));

    if (previouslyVisibleSections.length) {
      allSections.forEach(sec => sec.classList.add('hidden'));
      previouslyVisibleSections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('hidden');
      });
    } else if (portfolioSection) {
      portfolioSection.classList.remove('hidden');
    }

    // Scroll restoration
    setTimeout(() => {
      if (portfolioSection && !portfolioSection.classList.contains('hidden')) {
        portfolioSection.scrollIntoView({ behavior: 'auto', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }, 30);
  }

  // Touch hover emulation for mobile
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  if (isTouchDevice) {
    portfolioItems.forEach(item => {
      item.addEventListener('click', (e) => {
        if (!item.classList.contains('touched')) {
          e.preventDefault();
          e.stopPropagation();
          portfolioItems.forEach(i => i.classList.remove('touched'));
          item.classList.add('touched');
          setTimeout(() => item.classList.remove('touched'), 2000);
        }
      });
    });
  }

  // View more button (open project)
  viewMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('.portfolio-item');
      if (!parent) return;
      const projectId = parent.dataset.project;
      if (!projectId) return;
      openProject(projectId);
    });
  });

  // Back button (close project)
  backBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeProjectAndRestore();
    });
  });


  /* ===== IMAGE MODAL EXPANSION ===== */
  let activeCarousel = null;
  let modal = null;

  // Open modal on image click
  document.body.addEventListener('click', (e) => {
    const img = e.target.closest('.carousel img');
    if (img) {
      const carousel = img.closest('.carousel');
      if (carousel) {
        activeCarousel = carousel;
        carousel.style.animationPlayState = 'paused';
      }

      if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal';

        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt || '';

        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        // Close modal on click
        modal.addEventListener('click', () => {
          modal.remove();
          modal = null;
          if (activeCarousel) activeCarousel.style.animationPlayState = 'running';
          activeCarousel = null;
        });
      }
      return;
    }
  });

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal) {
      modal.remove();
      modal = null;
      if (activeCarousel) activeCarousel.style.animationPlayState = 'running';
      activeCarousel = null;
    }
  });
});

/* =========================================================
   PRELOADER FADE-OUT (DESKTOP + MOBILE)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Always hide after max 2s (even if assets still loading)
  const hidePreloader = () => {
    preloader.style.transition = 'opacity 0.6s ease';
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600); // match fade-out time
  };

  // Safety timeout: force-hide after 2 seconds
  setTimeout(hidePreloader, 2000);

  // Also hide when window fully loads (just in case it’s faster)
  window.addEventListener('load', hidePreloader);
});

/* =========================================================
   RESUME MODAL DISPLAY / CLOSE LOGIC
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const downloadLink = document.getElementById('download-resume');
  const modal = document.getElementById('resume-modal');
  const closeModal = document.getElementById('close-modal');

  // Open resume modal on click
  downloadLink.addEventListener('click', function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
  });

  // Close modal on X button
  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Close modal when clicking outside modal content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
});
