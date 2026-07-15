const ROUTES = {
  fixtures: () => "/api/fixtures/snapshot",
  odds: (fixtureId) => `/api/odds/snapshot/${fixtureId}`,
  scores: (fixtureId) => `/api/scores/snapshot/${fixtureId}`,
  history: (fixtureId) => `/api/scores/historical/${fixtureId}`
};

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed" }, { Allow: "GET" });
  }

  const {
    resource = "fixtures",
    fixtureId,
    startEpochDay,
    competitionId
  } = event.queryStringParameters || {};
  const route = ROUTES[resource];
  if (!route) return json(400, { error: "Unsupported resource" });
  if (resource !== "fixtures" && !/^\d+$/.test(String(fixtureId || ""))) {
    return json(400, { error: "A numeric fixtureId is required" });
  }

  const jwt = process.env.TXLINE_JWT;
  const apiToken = process.env.TXLINE_API_TOKEN;
  const origin = process.env.TXLINE_API_ORIGIN || "https://txline.txodds.com";
  if (!jwt || !apiToken) return json(503, { error: "TxLINE access is not activated" });

  const url = new URL(route(String(fixtureId || "")), origin);
  if (resource === "fixtures") {
    if (/^\d+$/.test(String(startEpochDay || ""))) url.searchParams.set("startEpochDay", startEpochDay);
    if (/^\d+$/.test(String(competitionId || ""))) url.searchParams.set("competitionId", competitionId);
  }

  try {
    const upstream = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "X-Api-Token": apiToken,
        Accept: "application/json"
      }
    });
    const body = await upstream.text();
    return {
      statusCode: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/json",
        "Cache-Control": resource === "fixtures" ? "public, max-age=0, s-maxage=30" : "no-store"
      },
      body
    };
  } catch (error) {
    return json(502, { error: "TxLINE upstream unavailable" });
  }
};

function json(statusCode, body, headers = {}) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body)
  };
}
