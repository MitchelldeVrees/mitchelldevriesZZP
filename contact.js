(function () {
  const form = document.getElementById("contact-form");
  if (!form) {
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  const statusEl = document.getElementById("form-status");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const params = new URLSearchParams(window.location.search);
  const presetSubject = String(params.get("subject") || "").trim();
  const presetMessage = String(params.get("message") || "").trim();

  if (subjectInput && presetSubject && !subjectInput.value.trim()) {
    subjectInput.value = presetSubject;
  }

  if (messageInput && presetMessage && !messageInput.value.trim()) {
    messageInput.value = presetMessage;
  }

  function setStatus(message, tone) {
    if (!statusEl) {
      return;
    }

    statusEl.textContent = message;
    statusEl.classList.remove("is-error", "is-success", "is-info");

    if (tone === "error") {
      statusEl.classList.add("is-error");
    } else if (tone === "success") {
      statusEl.classList.add("is-success");
    } else {
      statusEl.classList.add("is-info");
    }
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim()
    };

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      setStatus("Please complete all fields.", "error");
      return;
    }

    const originalButtonText = submitButton ? submitButton.textContent : "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
    setStatus("Sending message...", "info");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const body = await response.json().catch(function () {
        return {};
      });

      if (!response.ok) {
        throw new Error(body.message || "Failed to send your message.");
      }

      form.reset();
      setStatus("Message sent successfully. I'll get back to you soon.", "success");
    } catch (error) {
      setStatus(error.message || "Unexpected error while sending message.", "error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
})();
