# Gambit plugin

Gambit is an AI research desk for [Hyperliquid](https://hyperliquid.xyz), including HIP-3 builder-DEX markets. It ranks opportunities and writes a thesis card with evidence, a counterpoint, an invalidation, and a size. You confirm every trade.

This repo packages the Gambit MCP server as a plugin for Cursor, ChatGPT and Codex. Until those listings go live, connect directly (see below); it works in any MCP client.

It contains no server code. The server is hosted at `https://api.gambit.trading/mcp`.

## What's inside

| Path | Purpose |
|---|---|
| `plugin.json` | Portable [Agent Plugins](https://agent-plugins.org) manifest, with the OpenAI listing under `extensions.com.openai` |
| `.cursor-plugin/plugin.json` | Cursor manifest |
| `mcp.json` | The one remote MCP server |
| `skills/get-started/` | Onboarding skill: connect, check scopes, first research pass, trading rule |
| `assets/` | Logo |
| `openai-review.json` | Review test cases merged into the OpenAI upload |
| `scripts/build-openai-zip.mjs` | Builds the OpenAI upload ZIP |

## Connect directly

The server speaks Streamable HTTP and signs you in with OAuth. Your client opens a Gambit sign-in page on first use, and you choose which scopes to grant.

```json
{
  "mcpServers": {
    "gambit": { "url": "https://api.gambit.trading/mcp" }
  }
}
```

Claude Code:

```bash
claude mcp add --transport http gambit https://api.gambit.trading/mcp
```

## What it can and can't do

- **Read**: market data, computed features, news, sentiment, the Today's Market opportunity feed, and (with the scopes you grant) your balances, positions, open orders, brokerage holdings, and recommendations.
- **Spend quota**: `generate_recommendation` and `ask_gambit_agent`.
- **Trade**: `propose_trade` stages a preview and places nothing. `confirm_trade` executes from your Gambit agent wallet only after the preview is shown to you. Without the `api:trade` scope, nothing can place trades or move funds.

Gambit is not an exchange, broker, or custodian, and it does not run unattended trading.

## Links

- Docs: https://www.gambit.trading/mcp
- Machine-readable docs: https://www.gambit.trading/llms.txt
- FAQ: https://www.gambit.trading/learn/faq
- Privacy: https://www.gambit.trading/privacy
- Terms: https://www.gambit.trading/terms

## Releasing

- **Cursor** reads this repo directly. Every update is reviewed before it ships.
- **OpenAI** takes a ZIP upload. Set `demo_recording_url` in `openai-review.json`, run `node scripts/build-openai-zip.mjs`, and upload `dist/gambit-plugin-openai.zip` at platform.openai.com/plugins. Server changes go live without a new upload. Changes to the manifest, skills, or logo need one.

Bump `version` in both manifests together.

## License

MIT. Operated by EMBR DEV PTE. LTD.
