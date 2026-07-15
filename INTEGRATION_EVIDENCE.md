# TxLINE integration evidence

Validated on July 15, 2026 against the TxLINE Devnet free tier.

## Public chain evidence

- Network: Solana Devnet
- Integration wallet: `ALMpoj9rW5Tsfv61rQMmTr1PLVraaNgdgbsRn9b7LiU5`
- Successful subscription transaction: `31reS5HQNCMPvC3npDATxHoZkx84FGfVzcLNhhmJ5QTCpdj1nqqpGoKuEKVTBncajtKigLNnQCVPU5baofZusvES`
- TxLINE program: `6pW64gN1s2uqjHkn1unFeEjAwJkPGHoppGvS715wyP2J`
- Free-tier service level: `1`
- Subscription duration: 4 weeks

## API validation

- Guest JWT acquisition succeeded.
- Subscription activation succeeded.
- API token was stored outside the repository.
- `GET /api/fixtures/snapshot` returned 6 fixtures.
- MatchLens loaded three fixtures through its server-side proxy.
- Browser status changed from `Demo replay` to `TxLINE live`.
- Verified fixture displayed: Vietnam vs Myanmar, fixture ID `18143850`.
- Browser console errors: 0.

## Security boundary

The browser only calls `/api/txline`. The guest JWT and activated API token remain in server environment variables and are never embedded in frontend JavaScript or committed files.
