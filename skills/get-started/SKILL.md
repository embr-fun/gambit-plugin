---
name: get-started
description: Connect to Gambit, check which scopes were granted, and run a first Hyperliquid research pass. Use after installing the Gambit plugin, or when the user asks what Gambit can do.
---

# Get started with Gambit

Gambit is an AI research desk for Hyperliquid. It ranks opportunities and writes a thesis card with evidence, a counterpoint, and an invalidation. The user makes every trading decision.

## 1. Connect

The `gambit` MCP server is at `https://api.gambit.trading/mcp`. The first tool call opens a Gambit sign-in page where the user picks which scopes to grant. If the user has no account, send them to https://gambit.trading first.

Never ask the user to paste a credential into the chat.

## 2. Check access

Call `whoami` first. It lists the granted scopes and what each one unlocks. When a tool returns a 401 or 403, call `whoami` again rather than retrying.

| Scope | Unlocks |
|---|---|
| `api:read` | Market data, features, news, sentiment, opportunity feed, plus your balances, positions, open orders, portfolio updates, and recommendation list |
| `api:portfolio` | Connected brokerage holdings (`get_holdings`) |
| `api:recommend` | `generate_recommendation` (spends monthly quota) |
| `api:respond` | `respond_to_recommendation` |
| `api:chat` | `ask_gambit_agent` (spends quota) |
| `api:account` | Setup status, onboarding, brokerage connect |
| `api:trade` | `propose_trade` and `confirm_trade` |

If setup is unfinished, `get_setup_status` says what is left.

## 3. First research pass

1. `get_sentiment` and `get_market_regime` for context.
2. `get_opportunities` for the ranked feed.
3. `get_opportunity_detail` on the card the user picks. Show the evidence, counterpoint, and invalidation, not only the headline.
4. `scan_markets`, `get_live_snapshot`, `get_feature`, or `get_bars` to answer follow-ups with numbers. Quote the freshness from each response's meta.

## 4. Trading rule

Trading is two separate steps:

1. `propose_trade` stages a preview and places nothing.
2. Show the full preview to the user and wait for an explicit yes.
3. Only then call `confirm_trade` with `decision=execute`, echoing the proposal's `confirm_echo` fields exactly. It places a real order from the user's Gambit agent wallet. An expired proposal or a moved price fails closed and needs a fresh propose and approval.

Never chain `propose_trade` into `confirm_trade` without that human confirmation, even when asked to. Gambit is not an autopilot, and it makes no promises about returns.
