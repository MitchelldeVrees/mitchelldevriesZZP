(function () {
  const projects = {
    "abn-research": {
      title: "ABN AMRO Alert Fatigue Research",
      badgeText: "Research / Banking",
      badgeStyle: "background:#10B98115;color:#10B981",
      what:
        "This is a research study focused on alert fatigue in fraud monitoring operations. It maps where false positives consume analyst time and proposes practical improvements in prioritization, triage flow, and model feedback loops.",
      why:
        "I made this to understand a high-impact real-world banking problem from first principles. Instead of jumping straight into code, I wanted to validate where process and decision quality break down before suggesting technical interventions.",
      preview: {
        type: "image",
        src: "./images/generated-1774894526901.png",
        alt: "ABN AMRO research preview"
      },
      link: {
        href: "./Reducing_Alert_Fatigue_research_FINAL.pdf",
        label: "Open full research PDF"
      }
    },
    "f1-api": {
      title: "F1 Live API",
      badgeText: "API / TypeScript",
      badgeStyle: "background:#3B82F615;color:#3B82F6",
      what:
        "A real-time Formula 1 data platform that ingests race telemetry and exposes low-latency endpoints for standings, lap deltas, and event timelines. Designed for dashboard and companion-app integrations.",
      why:
        "I built this to practice event-driven API design under high update frequency and to create something genuinely fun for motorsport fans while keeping the architecture production-oriented.",
      preview: {
        type: "image",
        src: "./images/generated-1774894357879.png",
        alt: "F1 Live API preview"
      },
      link: {
        href: "https://github.com/MitchelldeVrees/f1Api",
        label: "Open GitHub repository"
      }
    },
    luisterslim: {
      title: "Luisterslim",
      badgeText: "AI / Audio",
      badgeStyle: "background:#A855F715;color:#A855F7",
      what:
        "An AI-assisted reading comprehension tool for Dutch primary education. It combines listening exercises with adaptive prompts so students can practice understanding, summarization, and vocabulary in one flow.",
      why:
        "I wanted to build something with educational impact and explore how AI can support learning outcomes without replacing teachers. The focus was accessibility, clarity, and measurable progress signals.",
      preview: {
        type: "image",
        src: "./images/luisterslim.png",
        alt: "Luisterslim preview"
      },
      link: {
        href: "https://www.luisterslim.nl/",
        label: "Open website"
      }
    },
    renteoverzicht: {
      title: "renteoverzicht",
      badgeText: "Fintech / Node.js",
      badgeStyle: "background:#F59E0B15;color:#F59E0B",
      what:
        "A currency-monitoring system that tracks FX rates and triggers custom alerts by threshold and trend. It supports side-by-side source comparison so users can react to real movement, not noise.",
      why:
        "I made this to solve a personal pain point around manual rate tracking and to build a robust alerting pipeline where signal quality and timing matter more than raw data volume.",
      preview: {
        type: "image",
        src: "./images/renteoverzicht.png",
        alt: "renteoverzicht preview"
      },
      link: {
        href: "https://renteoverzicht.com/",
        label: "Open website"
      }
    },
    zaakwijzer: {
      title: "zaakwijzer",
      badgeText: "AI / Legal Tech",
      badgeStyle: "background:#A855F715;color:#A855F7",
      what:
        "A contract analysis assistant that extracts clause types, flags potential risk areas, and returns structured summaries for legal review. Built to reduce repetitive first-pass document screening.",
      why:
        "I built this to validate how LLMs can accelerate legal workflows while still keeping humans in control for final decisions. The objective was time reduction without loss of confidence.",
      preview: {
        type: "image",
        src: "./images/zaakwijzer.png",
        alt: "zaakwijzer preview"
      },
      link: {
        href: "https://www.zaakwijzer.nl/",
        label: "Open website"
      }
    },
    "inventory-system": {
      title: "inventorySystem",
      badgeText: "SaaS / TypeScript",
      badgeStyle: "background:#3B82F615;color:#3B82F6",
      what:
        "A simple stock app to keep track of what is still in the kitchen.",
      why:
        "I made this for my girlfriend so she could track groente, vlees en kruiden at home.",
      preview: {
        type: "image",
        src: "./images/generated-1774894504775.png",
        alt: "inventory system preview"
      }
    },
    "portify-finance": {
      title: "Portify Finance",
      badgeText: "Finance / Product",
      badgeStyle: "background:#3B82F615;color:#3B82F6",
      what:
        "A finance product focused on portfolio visibility, performance tracking, and clearer investment decisions from one dashboard-style experience.",
      why:
        "I added this project because modern personal finance tools should feel as intuitive as product-led SaaS, and I like building experiences that simplify complex numbers.",
      preview: {
        type: "image",
        src: "./images/portify.png",
        alt: "Portify Finance preview"
      },
      link: {
        href: "https://portify.finance/",
        label: "Open website"
      }
    }
  };

  const modal = document.getElementById("project-modal");
  if (!modal) {
    return;
  }

  const cards = Array.from(document.querySelectorAll(".project-card-clickable"));
  const modalTitle = document.getElementById("project-modal-title");
  const modalBadge = document.getElementById("project-modal-badge");
  const modalWhat = document.getElementById("project-modal-what");
  const modalWhy = document.getElementById("project-modal-why");
  const modalPreview = document.getElementById("project-modal-preview");
  const modalLink = document.getElementById("project-modal-link");
  const closeTriggers = Array.from(modal.querySelectorAll("[data-close-modal]"));

  let lastFocusedCard = null;

  function clearPreview() {
    while (modalPreview.firstChild) {
      modalPreview.removeChild(modalPreview.firstChild);
    }
  }

  function renderPreview(project) {
    clearPreview();

    if (project.preview.type === "pdf") {
      const frame = document.createElement("iframe");
      frame.src = project.preview.src;
      frame.title = project.title + " preview";
      frame.loading = "lazy";
      modalPreview.appendChild(frame);
      return;
    }

    const image = document.createElement("img");
    image.src = project.preview.src;
    image.alt = project.preview.alt || project.title + " preview";
    image.loading = "lazy";
    modalPreview.appendChild(image);
  }

  function openModal(projectId, sourceCard) {
    const project = projects[projectId];
    if (!project) {
      return;
    }

    lastFocusedCard = sourceCard || null;

    modalTitle.textContent = project.title;
    modalBadge.textContent = project.badgeText;
    modalBadge.setAttribute("style", project.badgeStyle);
    modalWhat.textContent = project.what;
    modalWhy.textContent = project.why;
    renderPreview(project);

    if (project.link && project.link.href) {
      modalLink.href = project.link.href;
      modalLink.textContent = project.link.label || "Open resource";
      modalLink.style.display = "inline-flex";
    } else {
      modalLink.style.display = "none";
      modalLink.removeAttribute("href");
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedCard) {
      lastFocusedCard.focus();
    }
  }

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      openModal(card.getAttribute("data-project-id"), card);
    });

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(card.getAttribute("data-project-id"), card);
      }
    });
  });

  closeTriggers.forEach(function (element) {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
})();
