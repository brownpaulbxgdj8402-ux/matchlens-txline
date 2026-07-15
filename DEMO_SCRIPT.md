# Demo video script (under 3 minutes)

## 0:00-0:20 - Problem

Sports feeds tell you the score. They rarely tell you how the match arrived there. MatchLens is a live World Cup companion that turns TxLINE data into a story any fan can follow.

## 0:20-0:55 - Match selection and score

The top row shows available fixtures. Select a match to see its competition, live state, teams, score, and venue. The layout is designed for television second-screen use and works down to mobile widths.

## 0:55-1:30 - Match pulse

The match pulse translates changing consensus prices into an implied win-probability line. It highlights meaningful shifts and pairs the number with plain-language context, so a viewer can understand why control changed.

## 1:30-1:55 - Timeline and market

The timeline connects score actions to their impact. The market panel shows the latest normalized outcomes and clearly labels them as context, not financial advice.

## 1:55-2:25 - TxLINE integration

MatchLens uses fixture snapshots, score snapshots, historical score sequences, and odds snapshots. A serverless adapter sends the guest JWT and activated API token from environment variables, so secrets are never exposed to the browser.

## 2:25-2:45 - Resilience and close

When live access is unavailable, the same interface runs a deterministic replay for demos and product exploration. MatchLens makes a verified sports feed understandable, not just available.
