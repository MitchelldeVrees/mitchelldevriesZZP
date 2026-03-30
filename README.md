# mitchelldevriesZZP

Portfolio website based on `design.pen`.

## Pages
- `index.html` (Work)
- `services.html` (Services)
- `contact.html` (Contact)

## Contact form features
- Sends form submissions by email to `mitchelldevries2001@gmail.com`

## Setup
1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Fill in `.env` values:
- `SMTP_USER` and `SMTP_PASS`
  - For Gmail, use an **App Password** (not your normal account password)
- `CONTACT_TO_EMAIL` defaults to `mitchelldevries2001@gmail.com`

4. Run the server:

```bash
npm start
```

5. Open:
- `http://localhost:8080/index.html`
- `http://localhost:8080/services.html`
- `http://localhost:8080/contact.html`

## Notes
- Without valid `.env` values, email sending will fail.
