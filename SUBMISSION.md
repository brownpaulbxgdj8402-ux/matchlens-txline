# Superteam Earn submission

## Project title

MatchLens - See the match change

## One-line summary

A live World Cup second screen that turns TxLINE fixture, score, and odds feeds into a clear match story for everyday fans.

## Submission description

MatchLens helps viewers understand not only what the score is, but why the match has changed. It combines TxLINE fixture metadata, score actions, historical sequences, and consensus odds snapshots into one responsive match centre.

The experience adds a consumer interpretation layer above the raw feed: a match pulse, implied win-probability movement, a chronological event timeline, and plain-language context. Market data is treated only as an explanatory signal; MatchLens does not accept wagers or hold funds.

The app remains useful in demo replay mode when a live fixture is unavailable. In production, all TxLINE credentials stay inside a serverless proxy and never reach the browser.

The integration was validated against TxLINE Devnet on July 15, 2026. The activated free-tier account returned six fixtures, and the browser successfully switched from replay mode to the live feed without console errors. Public validation details are included in `INTEGRATION_EVIDENCE.md`.

## Why it fits the track

- Designed for the phone-in-hand viewing behavior described by the track.
- Uses TxLINE as the core data layer rather than a superficial badge.
- Works as a consumer product, a broadcast companion, and an embeddable club or publisher experience.
- Converts normalized data into a format that does not require betting expertise.
- Includes a working responsive interface, public code, deployment path, and offline replay.

## TxLINE usage

- Fixture snapshot selects and identifies matches.
- Score snapshots populate state and score.
- Historical score sequences support replay and event explanation.
- Odds snapshots produce normalized implied probabilities and market movement.
- The proxy uses the required guest JWT and activated API token headers.

## Links to add before submission

- Live application: `TBD_AFTER_DEPLOYMENT`
- Public repository: `TBD_AFTER_GITHUB_PUBLISH`
- Demo video: `TBD_AFTER_RECORDING`

## API feedback

TxLINE's consistent fixture identifiers and separation between snapshot, live update, and historical resources are strong foundations for consumer replay products. The historical score sequence is particularly useful because it lets an application explain a match rather than only show its latest state.

The largest integration cost is the free-tier onboarding sequence: on-chain subscription, guest JWT, exact wallet message signature, and activated API token. A hackathon-scoped read-only token or downloadable sample response set would improve time-to-first-data. The soccer score reference would also be easier to adopt with canonical TypeScript response types and one complete, real-world response example.

## Disclaimer

MatchLens presents market data as sports context and does not provide wagering or financial services.
