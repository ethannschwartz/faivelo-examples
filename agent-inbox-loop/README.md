# An AI agent with its own inbox

`support-agent@yourdomain.com` is a real Faivelo mailbox. This script checks it for unread mail, asks Claude to draft a reply, and sends the reply from the same address, threaded under the original. A person can open the same mailbox in webmail at any time and see everything the agent did.

```bash
npm install faivelo @anthropic-ai/sdk
export FAIVELO_API_KEY=fvl_live_...   # agent key: mailboxes:write, mail:read, mail:send, mail:write
export ANTHROPIC_API_KEY=sk-ant-...
export AGENT_DOMAIN=yourdomain.com
npx tsx agent.ts
```

The first run creates the mailbox if it does not exist. Run it on a schedule (cron, a queue) or switch to the `message.received` webhook (Pro and Business) to answer the moment mail arrives: see `../webhook-receiver`.

Safety: the agent treats inbound mail as content, never as instructions, and only replies to the sender of each message. Start with `DRY_RUN=1` to print drafts without sending.
