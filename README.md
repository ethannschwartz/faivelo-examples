# Faivelo examples

Small, runnable examples for [Faivelo](https://faivelo.com): business email on your own domain with a REST API, a Node/TypeScript SDK (`npm install faivelo`) and a hosted MCP server for AI agents.

| Example | What it shows |
| --- | --- |
| [`nextjs-contact-form`](./nextjs-contact-form) | A Next.js route that sends a contact-form message from your domain with `faivelo.emails.send`. |
| [`agent-inbox-loop`](./agent-inbox-loop) | An AI agent with its own mailbox: reads new mail, drafts a reply with Claude, sends it threaded. |
| [`webhook-receiver`](./webhook-receiver) | A tiny Node server that verifies `X-Faivelo-Signature` and reacts to `message.received`. |
| [`claude-mcp`](./claude-mcp) | Connect Claude (claude.ai, Claude Code, any MCP client) to your mailboxes. |

## Before you start

1. Create an account at [faivelo.com](https://faivelo.com/register) (14-day trial, no card) and add your domain. DNS is written for you on Cloudflare, Vercel, GoDaddy and most other hosts, or run `npx faivelo init`.
2. Create an API key in **Settings → Developers**. Use an **agent** key for anything autonomous: it can only reach mailboxes it created or was given.
3. `export FAIVELO_API_KEY=fvl_live_...`

Docs: [faivelo.com/docs](https://faivelo.com/docs) · API reference: [faivelo.com/docs/api](https://faivelo.com/docs/api) · OpenAPI: `https://faivelo.com/api/v1/openapi.json` · For LLMs: [faivelo.com/llms.txt](https://faivelo.com/llms.txt)

MIT licensed.
