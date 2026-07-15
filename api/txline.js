const ROUTES = {
  fixtures: () => "/api/fixtures/snapshot",
  odds: (fixtureId) => `/api/odds/snapshot/${fixtureId}`,
  scores: (fixtureId) => `/api/scores/snapshot/${fixtureId}`,
  history: (fixtureId) => `/api/scores/historical/${fixtureId}`
};

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { resource = "fixtures", fixtureId, startEpochDay, competitionId } = request.query;
  const route = ROUTES[resource];
  if (!route) return response.status(400).json({ error: "Unsupported resource" });
  if (resource !== "fixtures" && !/^\d+$/.test(String(fixtureId || ""))) {
    return response.status(400).json({ error: "A numeric fixtureId is required" });
  }

  const jwt = process.env.TXLINE_JWT;
  const apiToken = process.env.TXLINE_API_TOKEN;
  const origin = process.env.TXLINE_API_ORIGIN || "https://txline.txodds.com";
  if (!jwt || !apiToken) return response.status(503).json({ error: "TxLINE access is not activated" });

  const url = new URL(route(String(fixtureId || "")), origin);
  if (resource === "fixtures") {
    if (/^\d+$/.test(String(startEpochDay || ""))) url.searchParams.set("startEpochDay", startEpochDay);
    if (/^\d+$/.test(String(competitionId || ""))) url.searchParams.set("competitionId", competitionId);
  }

  try {
    const upstream = await fetch(url, {
      headers: { Authorization: `Bearer ${jwt}`, "X-Api-Token": apiToken, Accept: "application/json" }
    });
    const body = await upstream.text();
    response.setHeader("Cache-Control", resource === "fixtures" ? "s-maxage=30, stale-while-revalidate=60" : "no-store");
    response.setHeader("Content-Type", upstream.headers.get("content-type") || "application/json");
    return response.status(upstream.status).send(body);
  } catch (error) {
    return response.status(502).json({ error: "TxLINE upstream unavailable" });
  }
};
