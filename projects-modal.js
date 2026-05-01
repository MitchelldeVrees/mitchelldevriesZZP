(function () {
  const projects = {
    "abn-research": {
      title: "ABN AMRO Alert Fatigue Research",
      badgeText: "Research / Banking",
      badgeStyle: "background:#10B98115;color:#10B981",
      what:
        "A research paper examining how false-positive fraud alerts overwhelm compliance teams and degrade detection quality. Covers the operational cost of alert fatigue, compares ML and rule-based approaches used at large banks, and proposes concrete tuning strategies to cut noise without increasing missed fraud.",
      why:
        "Fraud ops at large banks face thousands of alerts per day — most are false positives. I wanted to understand where the line actually sits between catching real fraud and drowning analysts in noise, and whether modern ML approaches meaningfully solve it or just shift the failure mode.",
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
      badgeText: "API / Real-time Data",
      badgeStyle: "background:#3B82F615;color:#3B82F6",
      what:
        "Low-latency API serving live F1 race data — lap times, gaps, tire strategy, standings — from ingestion through websocket delivery, with a cache layer for replay queries. Built in TypeScript.",
      why:
        "Wanted to build a real-time data system end-to-end. F1 was the excuse — but the architecture is essentially the same as a market data feed, which is why it doubles as a reference for trading-adjacent work.",
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
      badgeText: "AI / Education",
      badgeStyle: "background:#A855F715;color:#A855F7",
      what:
        "Generates reading passages in Dutch at a company's current level, asks comprehension questions, and adapts difficulty based on responses. LLM-based passage generation with an adaptive difficulty engine.",
      why:
        "There are multiple transcription websites. But most are not clear what they do with your data. So I wanted to create my own application with a local AI model where I know 100% that I own the data and the AI model is running locally on a server at home.",
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
        "Tracks savings and deposit rates across major banks, normalizes them into a single comparison view, and alerts when rates change or better offers appear. Node.js scraping pipeline, PostgreSQL, notification layer.",
      why:
        "Consumer rates change constantly but are scattered across a dozen bank sites. I wanted one dashboard telling me when to move money — and the scraping and normalization problem was the technically interesting part.",
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
        "Ingests contracts, extracts key clauses (term, liability, termination, IP), flags non-standard language, and produces a structured summary for review. RAG pipeline with embeddings over a clause library plus LLM-based extraction and comparison.",
      why:
        "Contract review is one of the few white-collar tasks where LLMs can genuinely save hours per document — but most tools over-promise and hallucinate. I wanted to see how tight I could make the extraction-plus-verification loop with retrieval grounding.",
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
    "portify-finance": {
      title: "Portify Finance",
      badgeText: "Finance / Product",
      badgeStyle: "background:#3B82F615;color:#3B82F6",
      what:
        "Aggregates positions across brokers, tracks performance against benchmarks, and surfaces cost basis, dividends, and currency impact. Built to give individual investors the clarity that professional desks take for granted.",
      why:
        "Working at a broker, I kept noticing the gap between the tooling professionals have and what retail investors actually see in their apps. Portify is an attempt to close part of that gap.",
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
