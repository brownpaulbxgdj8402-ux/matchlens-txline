# MatchLens

MatchLens is a live World Cup second-screen experience built for the TxODDS World Cup Hackathon. It translates fixture, score, and odds updates into an accessible match narrative for fans who do not normally read betting markets.

## Product idea

Sports feeds are accurate but difficult to read as a story. MatchLens adds a consumer layer:

- a compact live scoreboard;
- a match-event timeline;
- implied win probability and market movement;
- short, plain-language explanations of what changed;
- visible data provenance and feed health.

The static demo works without credentials. Once TxLINE access is activated, the server-side adapter can retrieve live fixtures, score snapshots, odds snapshots, and historical score sequences without exposing API credentials to the browser.

## TxLINE endpoints

- `GET /api/fixtures/snapshot`
- `GET /api/scores/snapshot/{fixtureId}`
- `GET /api/scores/historical/{fixtureId}`
- `GET /api/odds/snapshot/{fixtureId}`

The adapter is implemented in `api/txline.js`.

## Run the demo

Open `index.html` directly in a browser. It uses a deterministic three-match replay and requires no build step.

Live deployment: https://matchlens-txline.netlify.app

Demo video: https://matchlens-txline.netlify.app/demo.webm

## Activate live data

1. Follow the official TxLINE World Cup Free Tier guide.
2. Use one network consistently for the wallet, program, guest JWT, subscription, and activation endpoint.
3. Complete the free on-chain subscription. Free tiers require no TxL payment, but the wallet needs SOL for network fees and possible account rent.
4. Activate the subscription and obtain the guest JWT and API token.
5. Set `TXLINE_JWT`, `TXLINE_API_TOKEN`, and optionally `TXLINE_API_ORIGIN` in the deployment environment.
6. Deploy to Netlify or Vercel. The serverless adapters keep credentials on the server.

Never commit live credentials. `.env.example` contains placeholders only.

## Deployment

The repository includes both Netlify and Vercel deployment configurations. The root serves the static interface; `/api/txline` is a Node serverless function.

## Data mapping

TxLINE fixture fields map directly to match identity and schedule. Score actions build the timeline and current game state. Odds `PriceNames` and `Prices` are normalized into outcome rows; implied probability is calculated as `1 / decimalPrice` and normalized across outcomes when needed.

## Submission checklist

- Public GitHub repository
- Working deployed URL
- Demo video under five minutes
- Brief technical documentation
- Specific feedback on TxLINE API integration

## TxLINE feedback

The normalized fixture, score, and odds resources make it possible to build one consumer model across competitions. Keeping historical score sequences beside current snapshots is particularly useful for replay and explanation.

The main integration friction is onboarding: the free tier still requires an on-chain subscription, a guest JWT, a wallet signature, and a second API token. A hackathon-scoped server token or a read-only sample dataset would shorten time-to-first-data substantially. The documentation would also benefit from one canonical TypeScript response type for the deeply structured soccer score payload.

## Disclaimer

Market data is presented as match context. MatchLens does not accept wagers, hold funds, or provide financial advice.
