# Connect Claude to your mailboxes (MCP)

Faivelo hosts an MCP server at `https://faivelo.com/api/mcp` (Streamable HTTP). It exposes your mailboxes as tools: `list_messages`, `read_message`, `get_thread`, `search_messages`, `search_all_mailboxes`, `send_message`, `move_message`, `create_mailbox`, `get_delivery_status` and more. Included from the Growth plan and during the trial.

## claude.ai

Settings → Connectors → **Add custom connector** → paste `https://faivelo.com/api/mcp`. Sign in, tick the mailboxes Claude may use, approve. No key to paste.

## Claude Code

```bash
claude mcp add --transport http faivelo https://faivelo.com/api/mcp
```

## Any MCP client with an API key (headless agents)

Use an **agent** key so the agent only reaches mailboxes it created or was given. See [`mcp.json`](./mcp.json):

```json
{
  "mcpServers": {
    "faivelo": {
      "url": "https://faivelo.com/api/mcp",
      "headers": { "Authorization": "Bearer fvl_live_..." }
    }
  }
}
```

If a client cannot set headers, put the key in the URL: `https://faivelo.com/api/mcp/fvl_live_...` (it may end up in logs; prefer the header).

Things to ask once connected: "What came in overnight that needs me?", "Reply to Anna and tell her the fix is live", "Create a mailbox called orders@ for the shop".
