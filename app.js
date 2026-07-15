(function () {
  "use strict";

  const state = { matches: window.MATCHLENS_DEMO, index: 0, playing: true, timer: null, source: "demo" };
  const $ = (id) => document.getElementById(id);

  function pathFor(values, width, height, pad) {
    const max = 100;
    const step = (width - pad * 2) / Math.max(values.length - 1, 1);
    return values.map((value, i) => {
      const x = pad + i * step;
      const y = height - pad - (value / max) * (height - pad * 2);
      return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  }

  function renderTabs() {
    $("matchTabs").innerHTML = state.matches.map((match, index) => `
      <button class="match-tab" role="tab" aria-selected="${index === state.index}" data-index="${index}" type="button">
        <span class="tab-meta"><span>${match.state}</span><span>${match.minute}'</span></span>
        <span class="tab-teams">${match.home.code} ${match.home.score} · ${match.away.score} ${match.away.code}</span>
      </button>`).join("");
    $("matchTabs").querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => selectMatch(Number(button.dataset.index)));
    });
  }

  function renderChart(match) {
    const width = 680, height = 190, pad = 14;
    const line = pathFor(match.probability, width, height, pad);
    $("probabilityLine").setAttribute("d", line);
    $("probabilityArea").setAttribute("d", `${line} L${width - pad},${height - pad} L${pad},${height - pad} Z`);
    $("probabilityValue").textContent = `${match.probability.at(-1)}%`;
    $("probabilityDesc").textContent = `${match.home.name}'s implied win probability moved from ${match.probability[0]}% to ${match.probability.at(-1)}%.`;
    $("probabilitySvg").querySelector(".chart-grid").innerHTML = [25, 50, 75].map(value => {
      const y = height - pad - (value / 100) * (height - pad * 2);
      return `<line x1="${pad}" y1="${y}" x2="${width - pad}" y2="${y}"></line>`;
    }).join("");
    const eventIndexes = [Math.floor(match.probability.length / 2), match.probability.length - 1];
    $("chartEvents").innerHTML = eventIndexes.map((valueIndex, index) => {
      const x = pad + valueIndex * ((width - pad * 2) / Math.max(match.probability.length - 1, 1));
      const y = height - pad - match.probability[valueIndex] / 100 * (height - pad * 2);
      return `<g class="chart-event"><circle cx="${x}" cy="${y}" r="5"></circle><text x="${x}" y="${Math.max(12, y - 14)}" text-anchor="middle">${index ? "Now" : "Shift"}</text></g>`;
    }).join("");
  }

  function renderMatch() {
    const match = state.matches[state.index];
    $("competition").textContent = match.competition;
    $("matchState").textContent = match.state === "LIVE" ? `LIVE · ${match.minute}'` : match.state;
    $("homeCode").textContent = match.home.code;
    $("homeName").textContent = match.home.name;
    $("awayCode").textContent = match.away.code;
    $("awayName").textContent = match.away.name;
    $("score").innerHTML = `${match.home.score}<span>:</span>${match.away.score}`;
    $("fixtureTitle").textContent = match.venue;
    $("pulseHeadline").textContent = match.headline;
    $("pulseExplanation").textContent = match.explanation;
    $("minuteLabel").textContent = `${match.minute}'`;
    $("fixtureId").textContent = match.id;
    $("lastUpdate").textContent = state.source === "live" ? "Live" : "Demo replay";
    $("matchPosition").textContent = `${state.index + 1} of ${state.matches.length}`;
    $("timeline").innerHTML = [...match.events].reverse().map(event => `
      <li>
        <span class="event-minute">${event.minute}'</span>
        <div><div class="event-title">${event.title}</div><div class="event-detail">${event.detail}</div></div>
        <span class="event-impact">${event.impact}</span>
      </li>`).join("");
    $("marketOptions").innerHTML = match.market.map((option, index) => `
      <div class="market-row ${index === 0 ? "leading" : ""}">
        <span class="market-name">${option.name}</span>
        <span class="market-odds">${option.odds.toFixed(2)}</span>
        <span class="market-probability" aria-label="${option.probability}% implied probability"><span style="width:${option.probability}%"></span></span>
      </div>`).join("");
    renderChart(match);
    renderTabs();
  }

  function selectMatch(index) {
    state.index = (index + state.matches.length) % state.matches.length;
    renderMatch();
  }

  function setPlaying(playing) {
    state.playing = playing;
    $("playButton").textContent = playing ? "Pause replay" : "Play replay";
    $("playButton").setAttribute("aria-pressed", String(playing));
    clearInterval(state.timer);
    if (playing) state.timer = setInterval(() => selectMatch(state.index + 1), 8000);
  }

  function decimalOddsToMarket(rows) {
    const candidates = rows.find(row => Array.isArray(row.PriceNames) && row.PriceNames.length >= 2);
    if (!candidates) return null;
    const prices = candidates.Prices.map(Number);
    if (prices.some(price => !Number.isFinite(price) || price <= 1)) return null;
    const raw = prices.map(price => 1 / price);
    const total = raw.reduce((sum, value) => sum + value, 0);
    return candidates.PriceNames.map((name, index) => ({
      name,
      odds: prices[index],
      probability: Math.round(raw[index] / total * 100)
    }));
  }

  function latestScore(rows) {
    const latest = [...rows].sort((a, b) => Number(a.seq || a.ts || 0) - Number(b.seq || b.ts || 0)).at(-1) || {};
    const readNumber = (...keys) => {
      for (const key of keys) if (Number.isFinite(Number(latest[key]))) return Number(latest[key]);
      return 0;
    };
    return {
      home: readNumber("participant1Score", "Participant1Score", "homeScore", "HomeScore"),
      away: readNumber("participant2Score", "Participant2Score", "awayScore", "AwayScore"),
      state: latest.gameState || latest.GameState || "SCHEDULED"
    };
  }

  function fixtureToMatch(fixture, scoreRows, oddsRows) {
    const score = latestScore(scoreRows);
    const market = decimalOddsToMarket(oddsRows);
    const homeFirst = fixture.Participant1IsHome !== false;
    const first = { name: fixture.Participant1, code: fixture.Participant1.slice(0, 3).toUpperCase(), score: score.home };
    const second = { name: fixture.Participant2, code: fixture.Participant2.slice(0, 3).toUpperCase(), score: score.away };
    return {
      id: fixture.FixtureId,
      competition: fixture.Competition,
      venue: "TxLINE live fixture",
      minute: score.state === "FINISHED" ? 90 : 0,
      state: score.state,
      home: homeFirst ? first : second,
      away: homeFirst ? second : first,
      headline: "Live TxLINE data connected",
      explanation: "This fixture, score state and consensus market were loaded through the secure TxLINE server adapter.",
      probability: market ? [50, market[0].probability] : [50, 50],
      events: [{ minute: 0, title: "Live feed active", detail: "Score actions will appear as TxLINE publishes them.", impact: "Verified" }],
      market: market || [{ name: first.name, odds: 2, probability: 50 }, { name: second.name, odds: 2, probability: 50 }]
    };
  }

  async function loadLiveData() {
    try {
      const response = await fetch("/api/txline?resource=fixtures", { headers: { Accept: "application/json" } });
      if (!response.ok) return;
      const payload = await response.json();
      if (!Array.isArray(payload) || !payload.length) return;
      const liveFixtures = payload.slice(0, 3);
      const hydrated = await Promise.all(liveFixtures.map(async fixture => {
        const fixtureId = encodeURIComponent(fixture.FixtureId);
        const [scoresResponse, oddsResponse] = await Promise.all([
          fetch(`/api/txline?resource=scores&fixtureId=${fixtureId}`),
          fetch(`/api/txline?resource=odds&fixtureId=${fixtureId}`)
        ]);
        const scores = scoresResponse.ok ? await scoresResponse.json() : [];
        const odds = oddsResponse.ok ? await oddsResponse.json() : [];
        return fixtureToMatch(fixture, Array.isArray(scores) ? scores : [], Array.isArray(odds) ? odds : []);
      }));
      state.matches = hydrated;
      state.index = 0;
      state.source = "live";
      $("sourceStatus").innerHTML = '<span class="status-dot"></span> TxLINE live';
      renderMatch();
    } catch (_) {
      // The static demo is the offline and pre-activation fallback.
    }
  }

  $("previousButton").addEventListener("click", () => selectMatch(state.index - 1));
  $("nextButton").addEventListener("click", () => selectMatch(state.index + 1));
  $("playButton").addEventListener("click", () => setPlaying(!state.playing));
  $("themeButton").addEventListener("click", () => {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  });
  renderMatch();
  setPlaying(true);
  loadLiveData();
})();
