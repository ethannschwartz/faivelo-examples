# Webhook receiver

A dependency-light Node server that verifies Faivelo's `X-Faivelo-Signature` and handles `message.received` and `email.bounced`.

```bash
npm install faivelo
export FAIVELO_WEBHOOK_SECRET=whsec_...   # shown once when you add the endpoint
export FAIVELO_API_KEY=fvl_live_...       # only needed to fetch full message bodies
node server.mjs
```

Add the endpoint in **Settings → Developers → Webhooks** (Pro and Business), point it at `https://your-host/faivelo`, and press **Send test event**. For local testing, expose port 8787 with a tunnel such as `cloudflared tunnel --url http://localhost:8787`.

Verify against the RAW body. Parsing the JSON and re-serialising it changes the bytes and the signature will not match.
