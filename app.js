const STORAGE_KEY = "eng12week-state-v1";
const DAY_MS = 24 * 60 * 60 * 1000;
const SRS_INTERVALS = [0, 1, 3, 7, 14, 30];

const icons = {
  copy: '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path></svg>',
  upload: '<svg viewBox="0 0 24 24"><path d="M12 21V9"></path><path d="m17 14-5-5-5 5"></path><path d="M5 3h14"></path></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="m20 6-11 11-5-5"></path></svg>',
  save: '<svg viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"></path><path d="M17 21v-8H7v8"></path><path d="M7 3v5h8"></path></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>',
  spark: '<svg viewBox="0 0 24 24"><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"></path><path d="m19 15 .7 2.1L22 18l-2.3.9L19 21l-.9-2.1L16 18l2.1-.9Z"></path></svg>'
};

const routine = [
  ["srs", "Spaced Repetition", "이전 표현과 오류 문장 3초 회상", 5],
  ["listen", "Short Listening", "30초-2분 음성 듣고 핵심 2-3개 파악", 5],
  ["shadow", "Shadowing", "1초 이내 따라 말하며 강세 확인", 7],
  ["roleplay", "AI Role-play", "오늘 주제로 8분 영어 대화", 8],
  ["write", "Short Writing", "말한 내용을 2-5문장으로 작성", 3],
  ["log", "Error Log", "다음 복습 문장 3개 선정", 2]
];

const diagnostics = [
  ["fluency", "Speaking Fluency", "멈춤 없이 문장을 이어가는 힘"],
  ["listening", "Listening Comprehension", "짧은 음성의 핵심을 잡는 힘"],
  ["vocabulary", "Vocabulary Recall", "상황에 맞는 표현을 즉시 꺼내는 힘"],
  ["grammar", "Grammar Accuracy", "기본 시제와 의문문 정확도"],
  ["pronunciation", "Pronunciation", "이해 가능한 발음과 리듬"],
  ["speed", "Response Speed", "3초 이내 반응"],
  ["maintenance", "Conversation Maintenance", "질문과 이유로 대화 유지"]
];

const weeklyMetrics = [
  ["listening", "Listening 이해도", 0, 100, 70, "%"],
  ["recall", "표현 3초 회상률", 0, 100, 70, "%"],
  ["speed", "3초 이내 응답률", 0, 100, 60, "%"],
  ["errors", "같은 문법 오류", 0, 10, 3, "회"],
  ["minutes", "대화 유지 시간", 0, 10, 3, "분"],
  ["completion", "주간 수행률", 0, 100, 85, "%"]
];

const weeks = [
  {
    week: 1,
    phase: "Phase 1",
    title: "자기소개와 하루 루틴",
    focus: "기초 회화 자동화",
    pattern: "I usually..., I work as..., I need to...",
    scenario: "You meet a friendly colleague. Introduce yourself, explain your daily routine, and say why you are relearning English.",
    questions: [
      "What do you usually do in the morning?",
      "What part of English feels difficult for you?",
      "Can you add one more sentence about your work?"
    ],
    expressions: [
      ["영어를 다시 배우는 중", "I'm currently relearning English."],
      ["클리닉에서 일함", "I work in a clinic."],
      ["주요 업무 설명", "My main task is helping patients."],
      ["하루 시작 말하기", "I usually start my day at 8."],
      ["말하기 연습 필요", "I need more speaking practice."]
    ]
  },
  {
    week: 2,
    phase: "Phase 1",
    title: "일상 질문과 요청",
    focus: "정중한 요청과 확인",
    pattern: "Can I..., Could you..., I would like to...",
    scenario: "You need to ask for help, change a time, and confirm what you should bring.",
    questions: [
      "Can I ask you a quick question?",
      "What time works for you?",
      "Could you repeat the last part?"
    ],
    expressions: [
      ["짧은 질문하기", "Can I ask you a quick question?"],
      ["도움 요청", "Could you help me with this?"],
      ["예약 요청", "I would like to make an appointment."],
      ["일정 확인", "What time works for you?"],
      ["다시 말해달라 요청", "Could you repeat the last part?"]
    ]
  },
  {
    week: 3,
    phase: "Phase 1",
    title: "업무와 습관 설명",
    focus: "절차를 순서대로 말하기",
    pattern: "First..., Then..., After that...",
    scenario: "Explain your clinic workflow to a visitor in simple English.",
    questions: [
      "What do you check first?",
      "What happens after the appointment is confirmed?",
      "How does automation help?"
    ],
    expressions: [
      ["예약 처리", "I handle patient appointments."],
      ["스케줄 확인", "I check the schedule every morning."],
      ["접수 업무", "I help patients at the front desk."],
      ["절차 시작", "First, we confirm the appointment."],
      ["시간 절약", "It saves time."]
    ]
  },
  {
    week: 4,
    phase: "Phase 2",
    title: "과거 경험과 미래 계획",
    focus: "경험과 계획 확장",
    pattern: "I went..., I have been..., I am going to...",
    scenario: "Talk about a past trip and make a simple travel plan for next month.",
    questions: [
      "Where did you go last time?",
      "What was difficult during the trip?",
      "What are you going to prepare next time?"
    ],
    expressions: [
      ["과거 여행", "I went to Japan last year."],
      ["기간 말하기", "I stayed there for three days."],
      ["문제 설명", "I had trouble ordering food."],
      ["미래 계획", "I am going to travel next month."],
      ["추천 요청", "What do you recommend?"]
    ]
  },
  {
    week: 5,
    phase: "Phase 2",
    title: "여행, 식당, 쇼핑",
    focus: "여행 상황 해결",
    pattern: "I have a reservation..., I'm looking for..., Could you show me...",
    scenario: "You are traveling abroad. Order food, ask for directions, and buy one item.",
    questions: [
      "Do you have a reservation?",
      "What would you like to order?",
      "Could you show me where it is on the map?"
    ],
    expressions: [
      ["예약자명", "I have a reservation under Kim."],
      ["메뉴 요청", "Could I see the menu, please?"],
      ["추천 요청", "What do you recommend?"],
      ["약국 찾기", "I'm looking for a pharmacy."],
      ["지도 요청", "Could you show me on the map?"]
    ]
  },
  {
    week: 6,
    phase: "Phase 2",
    title: "교통과 문제 해결",
    focus: "지연, 분실, 변경 대응",
    pattern: "My flight has been..., I need to..., Is there another...",
    scenario: "Your train or flight is delayed. Ask for options and explain your time constraint.",
    questions: [
      "What happened to your ticket?",
      "What time do you need to arrive?",
      "Is there another option?"
    ],
    expressions: [
      ["항공 지연", "My flight has been delayed."],
      ["기차 놓침", "I missed my train."],
      ["가방 분실", "I lost my bag."],
      ["옵션 확인", "Is there another option?"],
      ["도착 제한", "I need to arrive by 3 p.m."]
    ]
  },
  {
    week: 7,
    phase: "Phase 3",
    title: "의료기관 접수와 예약",
    focus: "안전한 행정 안내",
    pattern: "Do you have..., Please..., The doctor will...",
    scenario: "You are clinic front desk staff. Help a foreign patient reschedule an appointment and explain the waiting process.",
    questions: [
      "Do I have an appointment today?",
      "How long do I need to wait?",
      "Can you explain my test result?"
    ],
    expressions: [
      ["예약 확인", "Do you have an appointment today?"],
      ["양식 작성", "Please fill out this form."],
      ["대기 안내", "Please wait in the waiting area."],
      ["대기 시간", "You may need to wait about 20 minutes."],
      ["진료 경계", "The doctor will explain that."]
    ]
  },
  {
    week: 8,
    phase: "Phase 3",
    title: "증상, 검사, 대기 안내",
    focus: "일상적 절차 안내",
    pattern: "When did..., Please describe..., The test usually...",
    scenario: "Guide a patient through registration, a simple test process, and where to wait.",
    questions: [
      "When did the symptoms start?",
      "Where should I wait?",
      "How long does the test take?"
    ],
    expressions: [
      ["방문 이유", "What brings you in today?"],
      ["증상 시작", "When did the symptoms start?"],
      ["짧은 설명 요청", "Please describe your symptoms briefly."],
      ["검사 소요", "The test usually takes about 10 minutes."],
      ["의료진 확인", "Let me check with the medical staff."]
    ]
  },
  {
    week: 9,
    phase: "Phase 3",
    title: "Python, AI, 자동화",
    focus: "프로젝트 설명",
    pattern: "I am building..., It helps..., The goal is...",
    scenario: "Explain a small Python or AI automation prototype to a colleague.",
    questions: [
      "What problem does your tool solve?",
      "Who will use it?",
      "How do you protect sensitive data?"
    ],
    expressions: [
      ["도구 개발", "I am building a small automation tool."],
      ["반복 업무 감소", "It helps reduce repetitive work."],
      ["목표 설명", "The goal is to save time."],
      ["샘플 데이터", "I want to test it with sample data."],
      ["접근 리뷰", "Could you review my approach?"]
    ]
  },
  {
    week: 10,
    phase: "Phase 4",
    title: "혼합 상황 1",
    focus: "주제 전환 대응",
    pattern: "Let me check..., What I mean is..., Is that correct?",
    scenario: "A traveler visits a clinic and asks about directions, documents, and appointment changes.",
    questions: [
      "Can you summarize what I need?",
      "Where is the clinic from the station?",
      "Can I change my appointment?"
    ],
    expressions: [
      ["확인", "Let me check that for you."],
      ["의미 정정", "What I mean is this."],
      ["요약", "Let me summarize what I heard."],
      ["확인 질문", "Is that correct?"],
      ["중간 놓침", "I missed the middle part."]
    ]
  },
  {
    week: 11,
    phase: "Phase 4",
    title: "혼합 상황 2",
    focus: "의견과 이유",
    pattern: "In my opinion..., The reason is..., Compared with...",
    scenario: "Discuss a clinic workflow automation idea and explain benefits, risks, and the simplest version.",
    questions: [
      "What is the main benefit?",
      "What is the main privacy risk?",
      "What would be the simplest version?"
    ],
    expressions: [
      ["의견", "In my opinion, this workflow is too manual."],
      ["이유", "The reason is that staff repeat the same steps."],
      ["비교", "Compared with the old process, this is faster."],
      ["민감정보 회피", "We should avoid sensitive patient data."],
      ["최소 버전", "What would be the simplest version?"]
    ]
  },
  {
    week: 12,
    phase: "Phase 4",
    title: "최종 통합",
    focus: "5-10분 실전 대화",
    pattern: "There are three main points..., Could you rephrase..., Let me ask...",
    scenario: "Hold a mixed conversation across daily life, travel, clinic administration, and IT/AI.",
    questions: [
      "Can you give me the short version?",
      "Could you explain it from a clinic workflow perspective?",
      "What follow-up question would you ask?"
    ],
    expressions: [
      ["요약 시작", "Let me give you the short version."],
      ["세 가지 포인트", "There are three main points."],
      ["생각 시간", "Could you give me a moment to think?"],
      ["다시 표현 요청", "Could you rephrase that?"],
      ["후속 질문", "Let me ask a follow-up question."]
    ]
  }
];

function makeId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isoDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function addDays(dateString, days) {
  return isoDate(new Date(new Date(dateString).getTime() + days * DAY_MS));
}

function defaultCards() {
  return weeks.slice(0, 2).flatMap((week) =>
    week.expressions.map(([ko, en], index) => ({
      id: makeId(),
      ko,
      en,
      status: index < 2 ? "Review" : "Learning",
      intervalIndex: index < 2 ? 1 : 0,
      due: addDays(isoDate(), index < 2 ? 0 : 1),
      source: `Week ${week.week}`
    }))
  );
}

function defaultState() {
  return {
    currentWeek: 1,
    currentDay: 1,
    completedSteps: {},
    diagnostic: Object.fromEntries(diagnostics.map(([key]) => [key, 3])),
    weekly: {
      listening: 70,
      recall: 70,
      speed: 60,
      errors: 3,
      minutes: 3,
      completion: 85
    },
    srsCards: defaultCards(),
    weeklyHistory: [],
    lastDecision: null
  };
}

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return {
      ...defaultState(),
      ...parsed,
      diagnostic: { ...defaultState().diagnostic, ...parsed.diagnostic },
      weekly: { ...defaultState().weekly, ...parsed.weekly },
      srsCards: Array.isArray(parsed.srsCards) ? parsed.srsCards : defaultCards(),
      weeklyHistory: Array.isArray(parsed.weeklyHistory) ? parsed.weeklyHistory : []
    };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function currentWeekData() {
  return weeks.find((week) => week.week === state.currentWeek) || weeks[0];
}

function currentDayKey() {
  return `w${state.currentWeek}-d${state.currentDay}`;
}

function completedSet() {
  return new Set(state.completedSteps[currentDayKey()] || []);
}

function todayExpressions() {
  const week = currentWeekData();
  const start = ((state.currentDay - 1) % 4) * 1;
  return week.expressions.slice(start, start + 5);
}

function diagnosticAverage() {
  const values = diagnostics.map(([key]) => Number(state.diagnostic[key] || 0));
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function placement(avg = diagnosticAverage()) {
  if (avg < 2) {
    return {
      label: "Foundation A",
      title: "기초 자동화 트랙",
      text: "문장 길이를 줄이고 음성 속도를 낮춘 뒤, Pattern Drill과 Shadowing 비중을 늘립니다.",
      mix: [["Speaking/Listening", "22분"], ["신규 표현", "주 12-15개"], ["Role-play", "짧은 4-6턴"]]
    };
  }
  if (avg < 3.3) {
    return {
      label: "Core A2",
      title: "실전 기초 트랙",
      text: "현재 계획의 기본 난이도입니다. 짧은 문장을 빠르게 말하고 익숙한 주제에서 대화를 이어갑니다.",
      mix: [["Speaking/Listening", "20-25분"], ["신규 표현", "주 20개"], ["Role-play", "8분"]]
    };
  }
  if (avg < 4.1) {
    return {
      label: "B1 Expansion",
      title: "대화 확장 트랙",
      text: "답변 뒤 이유와 예시를 붙이고 1-3분 연속 발화를 늘립니다.",
      mix: [["Speaking/Listening", "22분"], ["신규 표현", "주 20-25개"], ["Role-play", "후속 질문 포함"]]
    };
  }
  return {
    label: "B1+ Challenge",
    title: "실전 통합 트랙",
    text: "자연 속도 일부를 사용하고 의료기관, 여행, IT/AI 주제 전환을 훈련합니다.",
    mix: [["Speaking/Listening", "23분"], ["신규 표현", "주 25-30개"], ["Role-play", "5-10분 대화"]]
  };
}

function evaluateWeekly() {
  const w = state.weekly;
  if (w.completion < 70) {
    return {
      type: "복습",
      title: "신규 분량 축소",
      reason: "주간 수행률이 70% 미만입니다. 다음 주는 새 표현을 줄이고 루틴 회복을 우선합니다."
    };
  }
  if (w.listening < 60 || w.recall < 60) {
    return {
      type: "복습",
      title: "난이도 하향",
      reason: "듣기 또는 표현 회상률이 60% 미만입니다. 음성 길이와 표현 수를 줄입니다."
    };
  }
  if (w.listening >= 80 && w.recall >= 85 && w.speed >= 70 && w.errors <= 2 && w.minutes >= 3) {
    return {
      type: "상향",
      title: "다음 주 난이도 상향",
      reason: "핵심 기준을 충족했습니다. 음성 길이를 30초 늘리고 후속 질문을 추가합니다."
    };
  }
  return {
    type: "유지",
    title: "난이도 유지",
    reason: "의사소통은 가능하지만 자동화가 더 필요합니다. Quick Response와 오류 문장 복습을 유지합니다."
  };
}

function renderIcons() {
  $all("[data-icon]").forEach((node) => {
    node.innerHTML = icons[node.dataset.icon] || "";
  });
}

function renderRoadmap() {
  $("#roadmapList").innerHTML = weeks
    .map((week) => `
      <button class="roadmap-item ${week.week === state.currentWeek ? "is-active" : ""}" type="button" data-week="${week.week}">
        <strong>Week ${week.week} · ${week.title}</strong>
        <span>${week.phase} · ${week.focus}</span>
      </button>
    `)
    .join("");
}

function renderHeader() {
  const week = currentWeekData();
  const done = completedSet().size;
  const percent = Math.round((done / routine.length) * 100);
  const track = placement();
  $("#currentTitle").textContent = `Week ${week.week} · Day ${state.currentDay}`;
  $("#routinePercent").textContent = `${percent}%`;
  $("#trackLabel").textContent = track.label;
  $("#routineRingText").textContent = `${percent}%`;
  $("#routineRing").style.strokeDashoffset = String(113 - (113 * percent) / 100);
}

function renderToday() {
  const week = currentWeekData();
  const done = completedSet();
  $("#sessionHeading").textContent = week.focus;
  $("#weekPhaseBadge").textContent = week.phase;
  $("#routineSteps").innerHTML = routine
    .map(([id, title, detail, minutes]) => `
      <label class="routine-step">
        <input type="checkbox" data-step="${id}" ${done.has(id) ? "checked" : ""} />
        <span>
          <strong>${title}</strong>
          <span>${detail}</span>
        </span>
        <span class="time-pill">${minutes}분</span>
      </label>
    `)
    .join("");

  $("#expressionList").innerHTML = todayExpressions()
    .map(([ko, en]) => `
      <div class="expression-row">
        <strong>${en}</strong>
        <span>${ko}</span>
      </div>
    `)
    .join("");

  $("#scenarioText").textContent = week.scenario;
  $("#quickQuestions").innerHTML = week.questions
    .map((question) => `<div class="question-row">${question}</div>`)
    .join("");
}

function renderDiagnostic() {
  $("#diagnosticSliders").innerHTML = diagnostics
    .map(([key, title, detail]) => `
      <label class="slider-row">
        <span>
          <strong>${title}</strong>
          <span>${detail}</span>
        </span>
        <input type="range" min="1" max="5" step="1" value="${state.diagnostic[key]}" data-diagnostic="${key}" />
        <strong>${state.diagnostic[key]}</strong>
      </label>
    `)
    .join("");

  const avg = diagnosticAverage();
  const place = placement(avg);
  $("#diagnosticAverage").textContent = avg.toFixed(1);
  $("#placementTitle").textContent = place.title;
  $("#placementText").textContent = place.text;
  $("#placementMix").innerHTML = place.mix
    .map(([label, value]) => `<div class="mix-row"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
}

function srsDueCards() {
  const today = isoDate();
  return state.srsCards.filter((card) => card.due <= today);
}

function renderSrs() {
  const due = srsDueCards();
  $("#dueCountBadge").textContent = `${due.length} due`;
  if (!state.srsCards.length) {
    $("#srsTableBody").innerHTML = `<tr><td colspan="5"><div class="empty-state">등록된 카드가 없습니다.</div></td></tr>`;
    return;
  }
  $("#srsTableBody").innerHTML = state.srsCards
    .slice()
    .sort((a, b) => a.due.localeCompare(b.due))
    .map((card) => `
      <tr>
        <td>${card.ko}</td>
        <td><strong>${card.en}</strong><br><span class="muted">${card.source || "Manual"}</span></td>
        <td><span class="state-pill ${card.status.toLowerCase()}">${card.status}</span></td>
        <td>${card.due}</td>
        <td>
          <div class="table-actions">
            <button class="mini-button success" data-card-success="${card.id}" type="button">성공</button>
            <button class="mini-button warn" data-card-relearn="${card.id}" type="button">재학습</button>
          </div>
        </td>
      </tr>
    `)
    .join("");
}

function renderWeekly() {
  $("#weeklyInputs").innerHTML = weeklyMetrics
    .map(([key, title, min, max, fallback, unit]) => {
      const value = state.weekly[key] ?? fallback;
      return `
        <label class="slider-row">
          <span>
            <strong>${title}</strong>
            <span>Day 7 평가값</span>
          </span>
          <input type="range" min="${min}" max="${max}" step="1" value="${value}" data-weekly="${key}" />
          <strong>${value}${unit}</strong>
        </label>
      `;
    })
    .join("");

  const decision = state.lastDecision || evaluateWeekly();
  $("#adaptiveDecision").textContent = decision.title;
  $("#adaptiveReason").textContent = decision.reason;
  $("#weeklyHistory").innerHTML = state.weeklyHistory.length
    ? state.weeklyHistory
        .slice(-5)
        .reverse()
        .map((item) => `
          <div class="history-item">
            <strong>Week ${item.week} · ${item.type}</strong>
            <span>${item.date} · 듣기 ${item.listening}% · 회상 ${item.recall}% · 응답 ${item.speed}%</span>
          </div>
        `)
        .join("")
    : `<div class="empty-state">아직 저장된 주간 평가가 없습니다.</div>`;
}

function conversationPrompt() {
  const week = currentWeekData();
  const expressions = todayExpressions().map(([, en]) => `- ${en}`).join("\n");
  return `You are my English conversation coach.
I am a Korean speaker who knows basic grammar but struggles with listening and speaking.
Please run an 8-minute speaking session in English.

Rules:
1. Speak mostly in English. Use Korean only for short explanations if I ask.
2. Do not interrupt me to correct every mistake.
3. Ask one question at a time.
4. Keep your questions at A2/B1 level unless I answer easily.
5. If I pause, give me a small hint, not a full answer.
6. After the conversation, summarize my top 5 corrections in Korean.

Today's week: Week ${week.week} - ${week.title}
Today's scenario: ${week.scenario}
Today's target expressions:
${expressions}

Start with a warm-up question.`;
}

function feedbackPrompt() {
  return `Please review my English speaking transcript.
Give feedback in Korean, but keep corrected example sentences in English.

Rules:
1. Do not correct every small mistake.
2. Select up to 5 corrections only.
3. Prioritize errors that block communication or repeat often.
4. Give me 3 sentences to review tomorrow.
5. Score fluency from 1 to 5.

Feedback format:
1. 잘 전달된 표현
2. 의미는 통했지만 어색한 표현
3. 반드시 고쳐야 할 문법 오류
4. 더 자연스러운 대체 표현
5. 발음 또는 리듬 개선점
6. 다음 날 복습할 문장 3개
7. 현재 유창성 점수`;
}

function renderPrompts() {
  $("#conversationPrompt").textContent = conversationPrompt();
  $("#feedbackPrompt").textContent = feedbackPrompt();
}

function renderAll() {
  renderRoadmap();
  renderHeader();
  renderToday();
  renderDiagnostic();
  renderSrs();
  renderWeekly();
  renderPrompts();
  renderIcons();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("클립보드에 복사했습니다.");
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = text;
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand("copy");
    fallback.remove();
    showToast("복사했습니다.");
  }
}

function addCard(ko, en, source = "Manual") {
  if (!ko.trim() || !en.trim()) {
    showToast("한국어 상황과 영어 표현을 모두 입력하세요.");
    return;
  }
  state.srsCards.push({
    id: makeId(),
    ko: ko.trim(),
    en: en.trim(),
    status: "New",
    intervalIndex: 0,
    due: isoDate(),
    source
  });
  saveState();
  renderAll();
  showToast("SRS 카드에 추가했습니다.");
}

function markCard(id, success) {
  const card = state.srsCards.find((item) => item.id === id);
  if (!card) return;
  if (success) {
    card.intervalIndex = Math.min(card.intervalIndex + 1, SRS_INTERVALS.length - 1);
    card.status = card.intervalIndex >= 4 ? "Mastered" : card.intervalIndex >= 2 ? "Review" : "Learning";
    card.due = addDays(isoDate(), SRS_INTERVALS[card.intervalIndex]);
  } else {
    card.intervalIndex = 0;
    card.status = "Relearn";
    card.due = addDays(isoDate(), 1);
  }
  saveState();
  renderAll();
}

function advanceDay() {
  if (state.currentDay < 7) {
    state.currentDay += 1;
  } else {
    state.currentDay = 1;
    state.currentWeek = Math.min(state.currentWeek + 1, 12);
  }
  saveState();
  renderAll();
  showToast(`Week ${state.currentWeek} Day ${state.currentDay}로 이동했습니다.`);
}

function exportState() {
  const payload = JSON.stringify({ exportedAt: new Date().toISOString(), state }, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `eng12week-backup-${isoDate()}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("백업 파일을 내보냈습니다.");
}

function importState(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(String(reader.result));
      state = payload.state ? { ...defaultState(), ...payload.state } : { ...defaultState(), ...payload };
      saveState();
      renderAll();
      showToast("백업을 불러왔습니다.");
    } catch {
      showToast("가져오기 파일을 읽지 못했습니다.");
    }
  };
  reader.readAsText(file);
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, label");
    if (!target) return;

    if (target.matches("[data-week]")) {
      state.currentWeek = Number(target.dataset.week);
      state.currentDay = 1;
      saveState();
      renderAll();
    }

    if (target.matches("[data-copy-target]")) {
      copyText($(`#${target.dataset.copyTarget}`).textContent);
    }

    if (target.id === "copyScenarioBtn") {
      copyText(currentWeekData().scenario);
    }

    if (target.id === "advanceDayBtn") {
      advanceDay();
    }

    if (target.id === "saveDiagnosticBtn") {
      saveState();
      showToast("진단 결과를 저장했습니다.");
      renderAll();
    }

    if (target.id === "addErrorToSrsBtn") {
      addCard($("#errorSentence").value, $("#fixedSentence").value, "Error correction");
      $("#errorSentence").value = "";
      $("#fixedSentence").value = "";
    }

    if (target.id === "manualCardBtn") {
      addCard($("#cardKorean").value, $("#cardEnglish").value, "Manual");
      $("#cardKorean").value = "";
      $("#cardEnglish").value = "";
    }

    if (target.id === "evaluateWeekBtn") {
      const decision = evaluateWeekly();
      state.lastDecision = decision;
      state.weeklyHistory.push({
        date: isoDate(),
        week: state.currentWeek,
        type: decision.type,
        ...state.weekly
      });
      saveState();
      renderAll();
      showToast("주간 평가를 저장했습니다.");
    }

    if (target.id === "exportBtn") {
      exportState();
    }

    if (target.matches("[data-card-success]")) {
      markCard(target.dataset.cardSuccess, true);
    }

    if (target.matches("[data-card-relearn]")) {
      markCard(target.dataset.cardRelearn, false);
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;

    if (target.matches("[data-step]")) {
      const set = completedSet();
      if (target.checked) set.add(target.dataset.step);
      else set.delete(target.dataset.step);
      state.completedSteps[currentDayKey()] = Array.from(set);
      saveState();
      renderHeader();
    }

    if (target.matches("[data-diagnostic]")) {
      state.diagnostic[target.dataset.diagnostic] = Number(target.value);
      saveState();
      renderAll();
    }

    if (target.matches("[data-weekly]")) {
      state.weekly[target.dataset.weekly] = Number(target.value);
      state.lastDecision = evaluateWeekly();
      saveState();
      renderAll();
    }

    if (target.id === "importInput" && target.files?.[0]) {
      importState(target.files[0]);
      target.value = "";
    }
  });

  $all(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $all(".tab").forEach((item) => item.classList.toggle("is-active", item === tab));
      $all(".tab-panel").forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.panel === tab.dataset.tab);
      });
    });
  });
}

bindEvents();
renderAll();
