require("dotenv").config({ quiet: true });

const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const port = Number(process.env.PORT || 8080);

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "mitchelldevries2001@gmail.com";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = String(process.env.SMTP_SECURE || "true") === "true";
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const MAIL_FROM = process.env.MAIL_FROM || SMTP_USER;

let transporter = null;

function getTransporter() {
  if (!SMTP_USER || !SMTP_PASS) {
    const err = new Error("Missing SMTP credentials.");
    err.status = 500;
    throw err;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });
  }

  return transporter;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: false }));

app.post("/api/contact", async function (req, res) {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim();
    const subject = String(req.body.subject || "").trim();
    const message = String(req.body.message || "").trim();

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    if (name.length > 120 || email.length > 254 || subject.length > 160 || message.length > 5000) {
      return res.status(400).json({ message: "One or more fields exceed allowed length." });
    }

    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedSubject = escapeHtml(subject);
    const escapedMessage = escapeHtml(message);

    const mailer = getTransporter();
    await mailer.sendMail({
      from: MAIL_FROM,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: "[Portfolio Contact] " + subject,
      text:
        "New contact form message\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Subject: " + subject + "\n\n" +
        "Message:\n" +
        message,
      html:
        "<h2>New contact form message</h2>" +
        "<p><strong>Name:</strong> " + escapedName + "</p>" +
        "<p><strong>Email:</strong> " + escapedEmail + "</p>" +
        "<p><strong>Subject:</strong> " + escapedSubject + "</p>" +
        "<p><strong>Message:</strong></p>" +
        "<pre style=\"white-space:pre-wrap;font-family:Inter,Arial,sans-serif\">" +
        escapedMessage +
        "</pre>"
    });

    return res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error(error);
    const status = Number(error.status || 500);
    const message =
      status >= 500
        ? "Could not send message. Please try again later."
        : error.message || "Could not process your request.";
    return res.status(status).json({ message: message });
  }
});

// Keep the full paper private; only the 7-page preview PDF is public.
app.use(/^\/brokerage_and_ai\.pdf\/?$/i, function (_req, res) {
  return res.status(404).end();
});

app.use(express.static(path.join(__dirname), { extensions: ["html"] }));

app.listen(port, function () {
  console.log("Server running on http://localhost:" + port);
});
