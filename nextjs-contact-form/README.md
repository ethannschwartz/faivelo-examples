# Next.js contact form → your inbox

A route handler that sends each contact-form submission from `website@yourdomain.com` to your team, with the visitor as Reply-To so you can answer straight from your mail app.

```bash
npm install faivelo
FAIVELO_API_KEY=fvl_live_... CONTACT_FROM=website@yourdomain.com CONTACT_TO=hello@yourdomain.com npm run dev
```

`CONTACT_FROM` must be an address on a domain you verified in Faivelo. It does not need to be a mailbox.

Test it:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Tom Becker","email":"tom@example.com","message":"Do you ship to Austria?"}'
```
