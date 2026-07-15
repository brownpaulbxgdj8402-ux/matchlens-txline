window.MATCHLENS_DEMO = [
  {
    id: 90012001,
    competition: "World Cup · Group C",
    venue: "Lusail Stadium",
    minute: 67,
    state: "LIVE",
    home: { name: "Argentina", code: "ARG", score: 2 },
    away: { name: "Mexico", code: "MEX", score: 1 },
    headline: "Argentina have taken control",
    explanation: "Their implied win probability has climbed 18 points since the second goal. Mexico need the next five minutes to interrupt the trend.",
    probability: [47, 49, 46, 51, 55, 54, 62, 68, 72],
    events: [
      { minute: 12, type: "Chance", title: "Mexico force the first save", detail: "A quick transition creates the first clear opening.", impact: "ARG −3 pts" },
      { minute: 28, type: "Goal", title: "Argentina 1–0", detail: "A low finish turns territorial control into a lead.", impact: "ARG +9 pts" },
      { minute: 43, type: "Goal", title: "Mexico level", detail: "A set piece punishes Argentina before the break.", impact: "ARG −8 pts" },
      { minute: 58, type: "Goal", title: "Argentina 2–1", detail: "Three passes break the press and restore the lead.", impact: "ARG +14 pts" },
      { minute: 65, type: "Pressure", title: "Argentina pin Mexico back", detail: "Two corners and a blocked shot keep the ball in the final third.", impact: "ARG +4 pts" }
    ],
    market: [
      { name: "Argentina", odds: 1.39, probability: 72 },
      { name: "Draw", odds: 4.55, probability: 22 },
      { name: "Mexico", odds: 16.7, probability: 6 }
    ]
  },
  {
    id: 90012002,
    competition: "World Cup · Group D",
    venue: "Education City Stadium",
    minute: 52,
    state: "LIVE",
    home: { name: "Japan", code: "JPN", score: 1 },
    away: { name: "Denmark", code: "DEN", score: 1 },
    headline: "The match has reset",
    explanation: "Japan's equaliser erased Denmark's early advantage. The market now sees a balanced final half-hour with neither side above 40%.",
    probability: [38, 35, 31, 29, 27, 33, 38, 39],
    events: [
      { minute: 8, type: "Goal", title: "Denmark strike early", detail: "A second-phase cross finds space behind the full-back.", impact: "JPN −7 pts" },
      { minute: 22, type: "Save", title: "Japan stay alive", detail: "A close-range stop prevents Denmark pulling away.", impact: "JPN +2 pts" },
      { minute: 37, type: "Tactical", title: "Japan switch shape", detail: "An extra midfielder improves access through the centre.", impact: "JPN +5 pts" },
      { minute: 49, type: "Goal", title: "Japan 1–1", detail: "The press wins possession ten metres outside the box.", impact: "JPN +10 pts" }
    ],
    market: [
      { name: "Japan", odds: 2.56, probability: 39 },
      { name: "Draw", odds: 2.44, probability: 41 },
      { name: "Denmark", odds: 5.0, probability: 20 }
    ]
  },
  {
    id: 90012003,
    competition: "World Cup · Group F",
    venue: "Al Bayt Stadium",
    minute: 90,
    state: "FULL TIME",
    home: { name: "Morocco", code: "MAR", score: 1 },
    away: { name: "Croatia", code: "CRO", score: 0 },
    headline: "Morocco close the door",
    explanation: "The late defensive block held. Croatia generated possession but not enough high-quality chances to reverse the outcome.",
    probability: [33, 35, 38, 43, 51, 59, 68, 79, 94, 100],
    events: [
      { minute: 31, type: "Chance", title: "Croatia hit the post", detail: "The biggest first-half chance comes from distance.", impact: "MAR −5 pts" },
      { minute: 54, type: "Goal", title: "Morocco 1–0", detail: "A near-post run meets a cut-back from the right.", impact: "MAR +17 pts" },
      { minute: 72, type: "Save", title: "Morocco protect the lead", detail: "The goalkeeper reacts low through a crowded box.", impact: "MAR +8 pts" },
      { minute: 88, type: "Block", title: "Last line holds", detail: "Two shots are blocked during Croatia's final attack.", impact: "MAR +11 pts" }
    ],
    market: [
      { name: "Morocco", odds: 1.01, probability: 100 },
      { name: "Draw", odds: 100.0, probability: 0 },
      { name: "Croatia", odds: 100.0, probability: 0 }
    ]
  }
];
