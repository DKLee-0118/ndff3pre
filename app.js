
/* NDFF3PRE — GitHub Pages용 (로컬 에셋 + Apps Script 설문 API) */
const DOC = {
  meta: {
    title: "무구의 초대장을 완성하라!",
    subtitle: "남도영화제 시즌3 장흥 프레 · 홍보부스",
    centralQuestion: "무구가 만든 초대장의 빈칸 — 시즌3는 어디서, 언제, 어디에서 열릴까?",
    stakes: "빈칸이 비면 영화제 소식이 제대로 전달되지 않는다. 완성해야 굿즈를 받을 수 있다."
  },
  npc: { name: "무구" },
  runtimeContract: {
    enforceRequires: true,
    autoAdvanceOnSuccess: false,
    requiredCriticalInfo: [
      "info:host_jangheung",
      "info:date_pre",
      "info:place_papillon",
      "info:invite_complete"
    ]
  },
  knowledgeGraph: {
    nodes: [
      { id: "info:start", nodeType: "fact", summary: "홍보부스에 도착. 무구가 초대장 빈칸을 채우자고 한다." },
      { id: "info:ndff_tour", nodeType: "fact", summary: "남도영화제는 전라남도 순회 영화제. 시즌1 순천 · 시즌2 광양 · 시즌3 장흥." },
      { id: "info:host_jangheung", nodeType: "fact", summary: "시즌3 개최지 = 장흥(장흥군)." },
      { id: "info:date_pre", nodeType: "fact", summary: "프레 날짜 = 2026.10.16(금)–17(토)." },
      { id: "info:place_papillon", nodeType: "fact", summary: "프레 장소 = 빠삐용Zip(옛장흥교도소)." },
      { id: "info:guest_profile", nodeType: "evidence", summary: "초대장 주인공 설문이 기록되었다." },
      { id: "info:invite_complete", nodeType: "unlock", summary: "초대장 완성. 부스에서 굿즈 수령 가능." }
    ]
  },
  missions: [
    {
      id: "m1",
      gateType: "observation",
      type: "dialogue",
      title: "인트로 — 무구를 만나다",
      knowledgeRefs: { requires: ["info:start"], outputs: ["info:ndff_tour"] },
      storyBridge: {
        before: "어? 너 왔구나!! 잘 왔어 진짜!!",
        after: "근데 아직… 빈칸이 몇 개 남았어. 나 좀 도와줄래?"
      },
      content: {
        factTieIn: "시즌1 순천 · 시즌2 광양 · 시즌3 장흥. 2026.10.16–17 프레, 2027 본행사.",
        dialogue: {
          steps: {
            start: {
              moogu: "03",
              lines: [
                "어? 너 왔구나!! 잘 왔어 진짜!!",
                "나 무구야, 남도영화제 완전 좋아하는 파란 비둘기! 무비의 ‘무’랑 구구구 소리 ‘구’를 따왔어!"
              ],
              choices: [
                { id: "what", label: "앵? 남도영화제가 뭔데?", goto: "explain" },
                { id: "next", label: "다음", goto: "jangheung" }
              ]
            },
            explain: {
              moogu: "14",
              lines: [
                "남도영화제 몰라?? 완전 유명한데!! 전라남도 이곳저곳을 돌아다니는 영화제야, 어딜가도 아름다운 남도와 그곳에서 보는 영화가 너~~무 좋아서 나도 같이 따라다니고 있어!",
                "시즌1은 순천, 시즌2는 광양, 시즌3는 바로 여기 장흥에서 열려! 2026년 10월 16-17일 빠삐용Zip(옛장흥교도소)에서 프레 행사, 2027년에는 장흥군 일대에서 본행사가 열린다구!! 지금부터 기대돼!!"
              ],
              choices: [{ id: "back", label: "돌아가기", goto: "jangheung" }]
            },
            jangheung: {
              moogu: "04",
              lines: [
                "짠, 여기가 장흥이야!",
                "시즌3가 여기서 열린다는 소식 듣자마자 완전 신나서 날아왔잖아!",
                "근데 와… 탐진강 봤어? 완전 반짝반짝해!",
                "여기저기 다 초록초록하고, 건물들도 신기하게 생겼고… 뭔가 장흥 자체가 그냥 빛나는 동네 같지 않아?",
                "근데 나 사실 여기 온 이유가 있어…",
                "이 영화제가 너무 좋아서, 나만 알고 있기 너무 아깝더라고!",
                "그래서 사람들한테 나눠줄 초대장을 만들고 있었거든."
              ],
              choices: [{ id: "help", label: "도와줄게!", done: true }]
            }
          }
        }
      }
    },
    {
      id: "m2",
      gateType: "verification",
      type: "quiz",
      title: "미션 1 — 개최지",
      knowledgeRefs: { requires: ["info:ndff_tour"], outputs: ["info:host_jangheung"] },
      storyBridge: {
        before: "아! 근데 나 까먹었나…? 돌아서면 잊어버리는 이 기억력!! 나 좀 도와줘, 시즌3 어디였지?? 개최지가 기억이 안 나!",
        after: "아 맞다 맞다!! 바로 여기 장흥이지 알려줘서 고마워!"
      },
      content: {
        factTieIn: "남도영화제 시즌3 개최지 = 장흥(장흥군).",
        mooguAsk: "06",
        mooguOk: "07",
        mooguWrong: "09",
        prompt: "남도영화제 시즌3 □□??",
        answerAccept: ["장흥", "장흥군", "전라남도 장흥"],
        wrongReaction: "거긴 아닌 것같아!",
        hintLadder: [
          "지금 여기가 어디지?",
          "전남광주통합특별시 □□군!",
          "시즌3는 바로 여기서 열려."
        ]
      }
    },
    {
      id: "m3",
      gateType: "verification",
      type: "quiz",
      title: "미션 2 — 날짜",
      knowledgeRefs: { requires: ["info:host_jangheung"], outputs: ["info:date_pre"] },
      storyBridge: {
        before: "이제 날짜! 이게 제일 중요한 부분이야! 2026년에는 프레 행사를 한다구 들었어. 난 이날만을 기다렸단 말이야! 근데 정확히 며칠부터였는지 갑자기 기억이 안 나네?",
        after: "그래그래! 10월 16일, 17일이었어. 다행이다 이제 좀 맘이 놓여."
      },
      content: {
        factTieIn: "2026년 프레 행사 = 10월 16일(금)–17일(토).",
        mooguAsk: "09",
        mooguOk: "11",
        mooguWrong: "06",
        prompt: "2026.10.□□(금) - □□(토)",
        mode: "dual_day",
        answerAccept: { d1: ["16"], d2: ["17"] },
        wrongReaction: "음… 금요일이랑 토요일이었는데!",
        hintLadder: [
          "금요일에서 토요일로 이어져.",
          "10월 중순이야.",
          "로고에 2026.10.16.–17.이 있어."
        ]
      }
    },
    {
      id: "m4",
      gateType: "verification",
      type: "quiz",
      title: "미션 3 — 장소",
      knowledgeRefs: { requires: ["info:date_pre"], outputs: ["info:place_papillon"] },
      storyBridge: {
        before: "마지막 빈칸! 프레 행사가 열리는 곳… 옛장흥교도소인데, 지금 이름이 뭐였지??",
        after: "맞아맞아! 빠삐용Zip!! 초대장에 장소도 썼어!"
      },
      content: {
        factTieIn: "프레 장소 = 빠삐용Zip(옛장흥교도소).",
        mooguAsk: "13",
        mooguOk: "10",
        mooguWrong: "06",
        prompt: "프레 행사 장소는? (옛장흥교도소)",
        mode: "choice",
        choices: ["장흥문화예술회관", "탐진강 수변공원", "빠삐용Zip", "동학농민혁명기념관"],
        answerAccept: ["빠삐용Zip"],
        wrongReaction: "거긴 아닌 것같아! 이름이 좀 특이한 그곳…",
        hintLadder: [
          "옛장흥교도소가 바뀐 이름이야.",
          "‘빠삐용’이 들어가.",
          "빠삐용 + Zip."
        ]
      }
    },
    {
      id: "m5",
      gateType: "meta",
      type: "narrative",
      title: "초대장의 주인공? (설문)",
      knowledgeRefs: {
        requires: ["info:host_jangheung", "info:date_pre", "info:place_papillon"],
        outputs: ["info:guest_profile", "info:invite_complete"]
      },
      storyBridge: {
        before: "이 초대장 너한테 주고 싶은데, 너에 대해 조금만 알려줄 수 있겠어?",
        after: "짜잔! 초대장 완성!! 네 덕분이야 정말 고마워, 너무 고마워서 선물을 준비했어!"
      },
      content: {
        factTieIn: "초대장 주인공 기록 완료 → 굿즈 수령.",
        mooguAsk: "08",
        mooguOk: "10",
        survey: {
          fields: [
            { id: "name", label: "이름", required: true },
            { id: "email", label: "이메일 (전화번호와 둘 중 하나 필수)", required: false, type: "email" },
            { id: "phone", label: "전화번호 (이메일과 둘 중 하나 필수)", required: false, type: "tel" },
            { id: "home", label: "사는 곳 (OO시, OO군까지만)", required: true },
            { id: "wantFilm", label: "남도영화제에서 보고 싶은 영화", required: false },
            {
              id: "expect",
              label: "영화제에서 제일 기대되는 건?",
              required: true,
              type: "choice",
              options: ["야외 영화 상영", "배우와의 만남", "버스킹 공연", "플리마켓 & 먹거리", "체험 프로그램"]
            }
          ]
        }
      }
    }
  ]
};

const kMap = Object.fromEntries(DOC.knowledgeGraph.nodes.map((n) => [n.id, n]));

/** 게임에 쓰는 파일 (github-pages/assets/ 기준) */
const GAME_ASSET_PATHS = [
  "fi/logo-fullname-h.png",
  "fi/logo-date-h.png",
  "ndff-bgm.mp3",
  "moogu/moogu-03.png",
  "moogu/moogu-04.png",
  "moogu/moogu-05.png",
  "moogu/moogu-06.png",
  "moogu/moogu-07.png",
  "moogu/moogu-08.png",
  "moogu/moogu-09.png",
  "moogu/moogu-10.png",
  "moogu/moogu-11.png",
  "moogu/moogu-13.png",
  "moogu/moogu-14.png"
];

const ASSET_BASE = String(window.ASSET_BASE || "assets/").replace(/\/?$/, "/");
const SURVEY_WEBAPP_URL = String(window.SURVEY_WEBAPP_URL || "").trim();
const assetDataCache = {};

const state = {
  knowledge: new Set(["info:start"]),
  completed: new Set(),
  hintLevel: {},
  survey: null,
  currentMissionId: null,
  dialogueStep: "start",
  dialogueChunkIdx: 0,
  dialogueTimers: [],
  bgmOn: false,
  submitting: false
};

const DIALOGUE_CHUNK = 3;
const DIALOGUE_STAGGER_MS = 420;

const $main = document.getElementById("main");
const $fill = document.getElementById("progress-fill");
const $label = document.getElementById("progress-label");
const $btnJournal = document.getElementById("btn-journal");
const $btnBgm = document.getElementById("btn-bgm");
const $btnHome = document.getElementById("btn-home");
const $bgm = document.getElementById("bgm");
const $mooguStage = document.getElementById("moogu-stage");
const $mooguImg = document.getElementById("moogu-img");

function assetUrl(path) {
  const bare = String(path || "").replace(/^assets\//, "");
  return ASSET_BASE + bare;
}

function loadAssetDataUrl(pathOrId, done) {
  const raw = String(pathOrId || "");
  if (!raw) {
    done("");
    return;
  }
  if (raw.indexOf("data:") === 0 || raw.indexOf("http") === 0 || raw.indexOf("/") === 0) {
    done(raw);
    return;
  }
  const path = raw.replace(/^assets\//, "");
  const url = assetDataCache[path] || assetUrl(path);
  done(url);
}

function setMoogu(id) {
  if (!id) {
    hideMoogu();
    return;
  }
  $mooguStage.hidden = false;
  if ($mooguImg.dataset.pose === String(id)) return;
  $mooguImg.dataset.pose = String(id);
  $mooguImg.classList.remove("is-pop");
  void $mooguImg.offsetWidth;

  const path = "moogu/moogu-" + id + ".png";
  const url = assetDataCache[path] || assetUrl(path);
  $mooguImg.src = url;
  $mooguImg.classList.add("is-pop");
}

function hideMoogu() {
  $mooguStage.hidden = true;
  $mooguImg.dataset.pose = "";
  $mooguImg.removeAttribute("src");
  $mooguImg.classList.remove("is-pop");
}

function has(id) {
  return state.knowledge.has(id);
}
function outs(m) {
  return m.knowledgeRefs?.outputs ?? [];
}
function reqs(m) {
  return m.knowledgeRefs?.requires ?? [];
}
function done(m) {
  return outs(m).every(has);
}
function canEnter(m) {
  return reqs(m).every(has);
}
function missionById(id) {
  return DOC.missions.find((m) => m.id === id);
}

function grant(ids) {
  ids.forEach((id) => {
    if (!state.knowledge.has(id)) state.knowledge.add(id);
  });
  updateProgress();
}

function updateProgress() {
  const crit = DOC.runtimeContract.requiredCriticalInfo;
  const n = crit.filter(has).length;
  $fill.style.width = `${(n / crit.length) * 100}%`;
  $label.textContent = `초대장 ${n}/${crit.length}`;
  $btnJournal.hidden = state.knowledge.size <= 1;
}

function voice(text, opts = {}) {
  const showWho = opts.showWho !== false;
  const cls = opts.stagger ? "voice-line" : "voice-line is-shown";
  return `<div class="${cls}">
    ${showWho ? `<p class="voice-line__who">${DOC.npc.name}</p>` : ""}
    <p class="voice-line__text">${text}</p>
  </div>`;
}

function clearDialogueTimers() {
  (state.dialogueTimers || []).forEach(clearTimeout);
  state.dialogueTimers = [];
}

function factBox(text) {
  return text ? `<p class="fact-line">${text}</p>` : "";
}

function normalize(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
}

function acceptText(input, acceptList) {
  const n = normalize(input);
  if (!n) return false; // 빈 입력 불가
  return acceptList.some((a) => {
    const an = normalize(a);
    if (!an) return false;
    // 완전 일치
    if (n === an) return true;
    // 정답 전체가 입력에 포함된 경우만 허용 (예: "전라남도장흥")
    // 한 글자만 쳐도 맞는 an.includes(n) 은 제거
    if (an.length >= 2 && n.includes(an)) return true;
    return false;
  });
}

function nextOpenMission() {
  return DOC.missions.find((m) => canEnter(m) && !done(m)) || null;
}

function probeAsset(path) {
  return new Promise((resolve) => {
    const url = assetDataCache[path] || assetUrl(path);
    if (/\.mp4$/i.test(path)) {
      const v = document.createElement("video");
      let settled = false;
      const done = (ok) => {
        if (settled) return;
        settled = true;
        resolve(ok ? url : "");
      };
      v.onloadeddata = () => done(true);
      v.onerror = () => done(false);
      setTimeout(() => done(false), 1200);
      v.preload = "metadata";
      v.src = url;
      v.load();
      return;
    }
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve("");
    img.src = url;
  });
}

function runTypewriter(el, text, msPerChar) {
  if (!el) return;
  const speed = msPerChar || 42;
  el.textContent = "";
  el.classList.add("is-typing");
  let i = 0;
  const tick = () => {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i += 1;
      setTimeout(tick, speed);
    } else {
      el.classList.remove("is-typing");
    }
  };
  tick();
}

function bindStartButton() {
  const btn = document.getElementById("btn-start");
  if (!btn) return;
  btn.onclick = () => {
    tryPlayBgm();
    startMission(missionById("m1"));
  };
}

function startTitleTypewriters() {
  runTypewriter(document.getElementById("title-main"), DOC.meta.title, 48);
  setTimeout(() => {
    runTypewriter(document.getElementById("title-sub"), DOC.meta.subtitle, 28);
  }, DOC.meta.title.length * 48 + 120);
  setTimeout(() => {
    runTypewriter(document.getElementById("title-body"), DOC.meta.centralQuestion, 24);
  }, DOC.meta.title.length * 48 + DOC.meta.subtitle.length * 28 + 280);
}

function showTitleMedia(mediaHtml) {
  $main.innerHTML = `
    <section class="title-hero">
      <div class="title-hero__media">${mediaHtml}</div>
      <div class="title-hero__cta block" style="padding-top:16px">
        <h1 class="display-xl typewriter-target" id="title-main"></h1>
        <p class="display-sub typewriter-target" id="title-sub"></p>
        <p class="body-text typewriter-target" id="title-body"></p>
        <div class="btn-row">
          <button type="button" class="btn btn--primary" id="btn-start">시작하기</button>
        </div>
      </div>
    </section>`;
  startTitleTypewriters();
  bindStartButton();
}

function showTitleText() {
  const logoUrl = assetDataCache["fi/logo-fullname-h.png"] || assetUrl("fi/logo-fullname-h.png");
  $main.innerHTML = `
    <section class="hero-logo">
      <img id="hero-logo-img" alt="남도영화제 시즌3 장흥 프레" src="${logoUrl}">
    </section>
    <section class="block">
      <h1 class="display-xl typewriter-target" id="title-main"></h1>
      <p class="display-sub typewriter-target" id="title-sub"></p>
      <p class="body-text typewriter-target" id="title-body"></p>
      <div class="btn-row">
        <button type="button" class="btn btn--primary" id="btn-start">시작하기</button>
      </div>
    </section>`;

  startTitleTypewriters();
  bindStartButton();
}

async function showTitle() {
  state.currentMissionId = null;
  hideMoogu();

  const videoUrl = await probeAsset("fi/hero-intro.mp4");
  if (videoUrl) {
    showTitleMedia(`
      <video id="hero-video" autoplay muted playsinline loop preload="auto" aria-label="남도영화제 시즌3 장흥 프레">
        <source src="${videoUrl}" type="video/mp4">
      </video>`);
    return;
  }
  const posterUrl =
    (await probeAsset("fi/hero-poster.jpg")) || (await probeAsset("fi/hero-poster.png"));
  if (posterUrl) {
    showTitleMedia(
      `<img id="hero-poster-img" alt="남도영화제 시즌3 장흥 프레" src="${posterUrl}">`
    );
    return;
  }

  showTitleText();
}

/** 로딩 UI — 퍼센트 네모 박스가 채워짐 */
function showBootLoading(pct, statusText) {
  hideMoogu();
  const p = Math.max(0, Math.min(100, Math.round(pct || 0)));
  $label.textContent = "불러오는 중";
  $fill.style.width = "0%";
  $main.innerHTML = `
    <section class="boot-loading" id="boot-loading">
      <div class="boot-loading__spin" aria-hidden="true"></div>
      <h1 class="display-xl">무구가 준비하는 중</h1>
      <p class="display-sub" id="boot-status">${statusText || "이미지·BGM을 불러오고 있어요"}</p>
      <div class="boot-pct-box" id="boot-pct-box" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}">
        <div class="boot-pct-box__fill" id="boot-pct-fill" style="width:${p}%"></div>
        <div class="boot-pct-box__label" id="boot-pct">${p}%</div>
      </div>
      <p class="feedback" id="boot-detail" style="margin-top:10px">0 / 0</p>
    </section>`;
}

function setBootProgress(pct, statusText, detailText) {
  const p = Math.max(0, Math.min(100, Math.round(pct || 0)));
  $label.textContent = "불러오는 중";
  $fill.style.width = "0%";
  const pctEl = document.getElementById("boot-pct");
  const fillEl = document.getElementById("boot-pct-fill");
  const boxEl = document.getElementById("boot-pct-box");
  const statusEl = document.getElementById("boot-status");
  const detailEl = document.getElementById("boot-detail");
  if (pctEl) pctEl.textContent = p + "%";
  if (fillEl) fillEl.style.width = p + "%";
  if (boxEl) boxEl.setAttribute("aria-valuenow", String(p));
  if (statusEl && statusText) statusEl.textContent = statusText;
  if (detailEl && detailText != null) detailEl.textContent = detailText;
}

function warmAssetsInBackground() {
  GAME_ASSET_PATHS.forEach((path) => {
    if (assetDataCache[path]) return;
    const url = assetUrl(path);
    assetDataCache[path] = url;
    if (/\.mp3$/i.test(path)) {
      const a = new Audio();
      a.preload = "auto";
      a.src = url;
      return;
    }
    const img = new Image();
    img.src = url;
  });
  // optional hero assets
  ["fi/hero-poster.png", "fi/hero-poster.jpg", "fi/hero-intro.mp4"].forEach((path) => {
    const url = assetUrl(path);
    if (/\.mp4$/i.test(path)) {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.src = url;
      return;
    }
    const img = new Image();
    img.src = url;
  });
}

function bootPreloadThenStart() {
  showBootLoading(8, "거의 다 됐어요…");

  // 경로만 먼저 캐시 (실제 파일은 필요할 때/백그라운드에서)
  GAME_ASSET_PATHS.forEach((path) => {
    assetDataCache[path] = assetUrl(path);
  });
  $bgm.src = assetUrl("ndff-bgm.mp3");

  // 첫 화면에 꼭 필요한 것만 기다림 → 로딩 대폭 단축
  const critical = ["fi/logo-fullname-h.png", "moogu/moogu-03.png"];
  let doneCount = 0;
  const total = critical.length;
  setBootProgress(10, "거의 다 됐어요…", "0 / " + total);

  const finish = () => {
    setBootProgress(100, "준비 완료!", total + " / " + total);
    warmAssetsInBackground();
    $fill.style.width = "0%";
    updateProgress();
    setTimeout(() => {
      if (applyAdminJump_()) return;
      showTitle();
    }, 120);
  };

  critical.forEach((path) => {
    const img = new Image();
    const onOne = () => {
      doneCount++;
      const pct = 10 + Math.round((doneCount / total) * 90);
      setBootProgress(pct, doneCount >= total ? "준비 완료!" : "거의 다 됐어요…", doneCount + " / " + total);
      if (doneCount >= total) finish();
    };
    img.onload = onOne;
    img.onerror = onOne;
    img.src = assetUrl(path);
  });
}

function applyAdminJump_() {
  let jump = "";
  try {
    jump = String(sessionStorage.getItem("ndff3pre-admin-jump") || "").trim();
    if (jump) sessionStorage.removeItem("ndff3pre-admin-jump");
  } catch (_) {
    return false;
  }
  if (!jump) return false;

  // 테스트용 기본 설문
  const demoSurvey = {
    name: "테스트",
    email: "test@ndff.local",
    phone: "010-1234-5678",
    home: "장흥군",
    wantFilm: "남도의 풍경",
    expect: "야외 영화 상영",
    privacyAgree: true,
    submittedAt: new Date().toLocaleString("sv-SE", { timeZone: "Asia/Seoul" })
  };

  const unlockUntil = {
    title: [],
    m1: ["info:start"],
    m2: ["info:start", "info:ndff_tour"],
    m3: ["info:start", "info:ndff_tour", "info:host_jangheung"],
    m4: ["info:start", "info:ndff_tour", "info:host_jangheung", "info:date_pre"],
    survey: [
      "info:start",
      "info:ndff_tour",
      "info:host_jangheung",
      "info:date_pre",
      "info:place_papillon"
    ],
    ending: [
      "info:start",
      "info:ndff_tour",
      "info:host_jangheung",
      "info:date_pre",
      "info:place_papillon",
      "info:guest_profile",
      "info:invite_complete"
    ]
  };

  const know = unlockUntil[jump];
  if (!know) return false;

  state.knowledge = new Set(know.length ? know : ["info:start"]);
  state.completed = new Set();
  state.hintLevel = {};
  state.survey = null;
  state.currentMissionId = null;
  state.submitting = false;
  updateProgress();

  if (jump === "title") {
    showTitle();
    return true;
  }
  if (jump === "m1") {
    startMission(missionById("m1"));
    return true;
  }
  if (jump === "m2") {
    startMission(missionById("m2"));
    return true;
  }
  if (jump === "m3") {
    startMission(missionById("m3"));
    return true;
  }
  if (jump === "m4") {
    startMission(missionById("m4"));
    return true;
  }
  if (jump === "survey") {
    startMission(missionById("m5"));
    return true;
  }
  if (jump === "ending") {
    state.survey = demoSurvey;
    state.completed.add("m5");
    showEnding();
    return true;
  }
  return false;
}

function startMission(m) {
  if (!m) {
    showEnding();
    return;
  }
  if (!canEnter(m)) return;
  state.currentMissionId = m.id;
  state.hintLevel[m.id] = 0;
  if (m.type === "dialogue") {
    clearDialogueTimers();
    state.dialogueStep = "start";
    state.dialogueChunkIdx = 0;
    renderDialogue(m);
    return;
  }
  if (m.type === "quiz") {
    renderQuizBridge(m);
    return;
  }
  if (m.id === "m5") {
    renderSurvey(m);
    return;
  }
}

function renderDialogue(m) {
  clearDialogueTimers();
  const steps = m.content.dialogue.steps;
  const step = steps[state.dialogueStep];
  const chunkIdx = state.dialogueChunkIdx || 0;
  const start = chunkIdx * DIALOGUE_CHUNK;
  const chunk = step.lines.slice(start, start + DIALOGUE_CHUNK);
  const hasMore = start + DIALOGUE_CHUNK < step.lines.length;

  setMoogu(step.moogu);
  $main.innerHTML = `
    <section class="block">
      <p class="display-sub">${m.title}</p>
      <div class="voice-stack" id="voice-stack"></div>
      <div class="btn-row" id="dlg-actions" hidden></div>
    </section>`;

  const stack = document.getElementById("voice-stack");
  const actions = document.getElementById("dlg-actions");

  function revealActions() {
    actions.hidden = false;
    if (hasMore) {
      actions.innerHTML = `<button type="button" class="btn btn--primary" id="btn-line">다음</button>`;
      document.getElementById("btn-line").onclick = () => {
        state.dialogueChunkIdx = chunkIdx + 1;
        renderDialogue(m);
      };
      return;
    }

    actions.innerHTML = step.choices
      .map(
        (c) =>
          `<button type="button" class="btn ${c.done ? "btn--primary" : "btn--ghost"}" data-choice="${c.id}">${c.label}</button>`
      )
      .join("");

    actions.querySelectorAll("[data-choice]").forEach((btn) => {
      btn.onclick = () => {
        const choice = step.choices.find((c) => c.id === btn.dataset.choice);
        if (choice.done) {
          clearDialogueTimers();
          completeMission(m);
          return;
        }
        clearDialogueTimers();
        state.dialogueStep = choice.goto;
        state.dialogueChunkIdx = 0;
        renderDialogue(m);
      };
    });
  }

  chunk.forEach((text, i) => {
    const wrap = document.createElement("div");
    wrap.innerHTML = voice(text, { showWho: i === 0, stagger: true });
    const el = wrap.firstElementChild;
    el.style.animationDelay = `${i * DIALOGUE_STAGGER_MS}ms`;
    stack.appendChild(el);
    const tShow = setTimeout(() => {
      el.classList.add("is-enter");
    }, 16);
    state.dialogueTimers.push(tShow);
  });

  const afterMs = (chunk.length - 1) * DIALOGUE_STAGGER_MS + 480;
  const tAct = setTimeout(revealActions, Math.max(afterMs, 320));
  state.dialogueTimers.push(tAct);
}

function renderQuizBridge(m) {
  const c = m.content;
  setMoogu(c.mooguAsk);
  $main.innerHTML = `
    <section class="block">
      <p class="display-sub">${m.title}</p>
      ${voice(m.storyBridge.before)}
      <div class="btn-row">
        <button type="button" class="btn btn--primary" id="btn-play">빈칸 채우기</button>
      </div>
    </section>`;
  document.getElementById("btn-play").onclick = () => renderQuiz(m);
}

function renderQuiz(m) {
  const c = m.content;
  const dual = c.mode === "dual_day";
  const choice = c.mode === "choice";
  setMoogu(c.mooguAsk);
  $main.innerHTML = `
    <section class="block">
      <p class="display-sub">${m.title}</p>
      <div class="prompt-box">${c.prompt}</div>
      ${
        dual
          ? `<div class="dual-row">
              <div class="field"><label>금</label><input id="ans1" inputmode="numeric" maxlength="2" placeholder="□□"></div>
              <span class="sep">–</span>
              <div class="field"><label>토</label><input id="ans2" inputmode="numeric" maxlength="2" placeholder="□□"></div>
            </div>`
          : choice
            ? `<div class="btn-row" id="choice-answers" style="margin-top:12px">
                ${(c.choices || [])
                  .map(
                    (opt, i) =>
                      `<button type="button" class="btn btn--choice" data-choice="${i}">${opt}</button>`
                  )
                  .join("")}
              </div>`
            : `<div class="field"><label>답</label><input id="ans" autocomplete="off" placeholder="여기에 입력"></div>`
      }
      <p class="feedback" id="fb"></p>
      <div class="btn-row">
        ${choice ? "" : `<button type="button" class="btn btn--primary" id="btn-submit">확인</button>`}
        <button type="button" class="btn btn--ghost" id="btn-hint">힌트</button>
      </div>
    </section>`;

  const fb = document.getElementById("fb");
  document.getElementById("btn-hint").onclick = () => {
    const ladder = c.hintLadder || [];
    if (!ladder.length) {
      fb.className = "feedback";
      fb.textContent = "조금 더 생각해 봐!";
      return;
    }
    const lvl = state.hintLevel[m.id] || 0;
    fb.className = "feedback";
    fb.textContent = ladder[lvl % ladder.length];
    state.hintLevel[m.id] = (lvl + 1) % ladder.length;
  };

  const judge = (ok) => {
    if (ok) {
      fb.className = "feedback ok";
      fb.textContent = "맞았어!";
      showMissionResult(m, true);
    } else {
      fb.className = "feedback fail";
      fb.textContent = c.wrongReaction;
      setMoogu(c.mooguWrong);
    }
  };

  if (choice) {
    document.querySelectorAll("#choice-answers [data-choice]").forEach((btn) => {
      btn.onclick = () => {
        document.querySelectorAll("#choice-answers [data-choice]").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const picked = (c.choices || [])[Number(btn.dataset.choice)] || "";
        judge(acceptText(picked, c.answerAccept));
      };
    });
    return;
  }

  document.getElementById("btn-submit").onclick = () => {
    let ok = false;
    if (dual) {
      const d1 = document.getElementById("ans1").value.trim();
      const d2 = document.getElementById("ans2").value.trim();
      ok =
        c.answerAccept.d1.map(String).includes(d1) &&
        c.answerAccept.d2.map(String).includes(d2);
    } else {
      ok = acceptText(document.getElementById("ans").value, c.answerAccept);
    }
    judge(ok);
  };

  const focusEl = document.getElementById(dual ? "ans1" : "ans");
  if (focusEl) focusEl.focus();
}

function showMissionResult(m, success) {
  if (!success) return;
  const c = m.content;
  setMoogu(c.mooguOk);
  $main.innerHTML = `
    <section class="block">
      ${voice(m.storyBridge.after)}
      ${factBox(c.factTieIn)}
      <div class="btn-row">
        <button type="button" class="btn btn--primary" id="btn-next">다음</button>
      </div>
    </section>`;
  document.getElementById("btn-next").onclick = () => completeMission(m);
}

function formatPhoneNumber_(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";

  // 서울 02
  if (digits.startsWith("02")) {
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return digits.slice(0, 2) + "-" + digits.slice(2);
    if (digits.length <= 9) {
      return digits.slice(0, 2) + "-" + digits.slice(2, digits.length - 4) + "-" + digits.slice(-4);
    }
    return digits.slice(0, 2) + "-" + digits.slice(2, 6) + "-" + digits.slice(6, 10);
  }

  // 휴대폰/지역번호 (0xx)
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return digits.slice(0, 3) + "-" + digits.slice(3);
  return digits.slice(0, 3) + "-" + digits.slice(3, 7) + "-" + digits.slice(7, 11);
}

function renderSurvey(m) {
  const fields = m.content.survey.fields;
  setMoogu(m.content.mooguAsk);
  $main.innerHTML = `
    <section class="block">
      <p class="display-sub">${m.title}</p>
      ${voice(m.storyBridge.before)}
      <form id="survey-form">
        ${fields
          .map((f) => {
            if (f.type === "choice") {
              return `<div class="field">
                <label>${f.label}</label>
                <div class="btn-row" id="choice-${f.id}">
                  ${f.options
                    .map(
                      (o) =>
                        `<button type="button" class="btn btn--choice" data-field="${f.id}" data-value="${o}">${o}</button>`
                    )
                    .join("")}
                </div>
                <input type="hidden" name="${f.id}" id="field-${f.id}" ${f.required ? "required" : ""}>
              </div>`;
            }
            const tag = f.id === "wantFilm" ? "textarea" : "input";
            const type =
              f.type === "email"
                ? 'type="email"'
                : f.type === "tel"
                  ? 'type="tel" inputmode="numeric" autocomplete="tel"'
                  : 'type="text"';
            const ph =
              f.id === "phone"
                ? 'placeholder="010-1234-5678"'
                : "";
            return `<div class="field">
              <label for="field-${f.id}">${f.label}</label>
              <${tag} id="field-${f.id}" name="${f.id}" ${type} ${ph} ${f.required ? "required" : ""}></${tag}>
            </div>`;
          })
          .join("")}
        <div class="privacy-box">
          <p class="privacy-box__title">개인정보 수집 및 이용 동의</p>
          <p class="privacy-box__note">동의하지 않을 경우, 설문 참여가 어려운 점 양해 부탁드립니다.</p>
          <dl class="privacy-box__dl">
            <div>
              <dt>수집·이용 항목</dt>
              <dd>이름, 이메일, 전화번호, 사는 곳</dd>
            </div>
            <div>
              <dt>수집·이용 목적</dt>
              <dd>이벤트 진행 및 남도영화제 소식 전달</dd>
            </div>
            <div>
              <dt>보유·이용기간</dt>
              <dd>남도영화제 이벤트 진행 및 10월 프레 행사 이후 1개월</dd>
            </div>
          </dl>
          <label class="privacy-check">
            <input type="checkbox" id="privacy-agree" name="privacyAgree">
            <span>위 개인정보 수집 및 이용에 동의합니다. (필수)</span>
          </label>
        </div>
        <p class="feedback" id="fb"></p>
        <div class="btn-row">
          <button type="submit" class="btn btn--primary" id="btn-survey-submit">초대장 완성하기</button>
        </div>
      </form>
    </section>`;

  document.querySelectorAll(".btn--choice").forEach((btn) => {
    btn.onclick = () => {
      const field = btn.dataset.field;
      document.querySelectorAll(`[data-field="${field}"]`).forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      document.getElementById(`field-${field}`).value = btn.dataset.value;
    };
  });

  const phoneEl = document.getElementById("field-phone");
  if (phoneEl) {
    phoneEl.addEventListener("input", () => {
      phoneEl.value = formatPhoneNumber_(phoneEl.value);
    });
  }

  document.getElementById("survey-form").onsubmit = (e) => {
    e.preventDefault();
    if (state.submitting) return;

    const agree = document.getElementById("privacy-agree");
    if (!agree || !agree.checked) {
      const fb = document.getElementById("fb");
      fb.className = "feedback fail";
      fb.textContent = "개인정보 수집 및 이용에 동의해 주세요!";
      return;
    }

    const data = {};
    for (const f of fields) {
      const el = document.getElementById(`field-${f.id}`);
      const val = (el.value || "").trim();
      if (f.required && !val) {
        const fb = document.getElementById("fb");
        fb.className = "feedback fail";
        fb.textContent = `${f.label}을(를) 남겨 줘!`;
        return;
      }
      data[f.id] = val;
    }

    const email = String(data.email || "").trim();
    const phone = String(data.phone || "").trim();
    if (!email && !phone) {
      const fb = document.getElementById("fb");
      fb.className = "feedback fail";
      fb.textContent = "이메일 또는 전화번호 중 하나는 남겨 줘!";
      return;
    }
    if (phone) {
      const digits = phone.replace(/\D/g, "");
      if (phone.length < 10 || digits.length < 10) {
        const fb = document.getElementById("fb");
        fb.className = "feedback fail";
        fb.textContent = "전화번호는 숫자 기준 10자 이상 입력해 줘!";
        return;
      }
    }

    data.privacyAgree = true;
    // 한국 시간 (클라이언트) — 서버에서도 재확인
    data.submittedAt = new Date().toLocaleString("sv-SE", { timeZone: "Asia/Seoul" });

    const fb = document.getElementById("fb");
    const submitBtn = document.getElementById("btn-survey-submit");
    state.submitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "저장 중…";
    fb.className = "feedback";
    fb.textContent = "초대장을 만들고 있어요…";

    const finishLocal = () => {
      state.survey = data;
      try {
        localStorage.setItem("ndff3pre-survey", JSON.stringify(data));
      } catch (_) {}
      state.submitting = false;
      completeMission(m, true);
    };

    const fail = (msg) => {
      state.submitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "초대장 완성하기";
      fb.className = "feedback fail";
      fb.textContent = "저장에 실패했어요. 다시 눌러 줘! (" + msg + ")";
    };

    if (!SURVEY_WEBAPP_URL || SURVEY_WEBAPP_URL.indexOf("PASTE_") === 0) {
      fail("config.js에 Apps Script 웹앱 URL이 아직 없어요");
      return;
    }

    // text/plain → CORS preflight 회피 (Apps Script 관용 패턴)
    fetch(SURVEY_WEBAPP_URL, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    })
      .then((res) => res.text())
      .then((text) => {
        let parsed = null;
        try {
          parsed = JSON.parse(text);
        } catch (_) {}
        if (parsed && parsed.ok === false) {
          fail(parsed.error || "서버 오류");
          return;
        }
        finishLocal();
      })
      .catch((err) => fail(err && err.message ? err.message : String(err)));
  };
}

function completeMission(m, fromSurvey) {
  grant(outs(m));
  state.completed.add(m.id);

  if (fromSurvey || m.id === "m5") {
    showEnding();
    return;
  }

  if (m.type === "dialogue") {
    setMoogu("05");
    $main.innerHTML = `
      <section class="block">
        ${voice(m.storyBridge.after)}
        ${factBox(m.content.factTieIn)}
        <div class="btn-row">
          <button type="button" class="btn btn--primary" id="btn-next">미션 시작</button>
        </div>
      </section>`;
    document.getElementById("btn-next").onclick = () => startMission(nextOpenMission());
    return;
  }

  startMission(nextOpenMission());
}

function showEnding() {
  const s = state.survey || {};
  try {
    localStorage.setItem(
      "ndff3pre-ending",
      JSON.stringify({ survey: s, at: Date.now() })
    );
  } catch (_) {}

  setMoogu("10");
  $main.innerHTML = `
    <section class="block">
      <h2 class="display-xl">짜잔! 초대장 완성!!</h2>
      ${voice(DOC.missions.find((x) => x.id === "m5").storyBridge.after)}
      <div class="invite-card" id="invite-card">
        <img class="invite-card__logo" id="invite-logo" alt="남도영화제 날짜" hidden>
        <p class="invite-card__title">남도영화제 시즌3 장흥 프레</p>
        <p class="invite-card__line">개최지 · 장흥</p>
        <p class="invite-card__line">날짜 · 2026.10.16(금) – 17(토)</p>
        <p class="invite-card__line">장소 · 빠삐용Zip (옛장흥교도소)</p>
        <p class="invite-card__guest">${s.name ? `${s.name} 님께` : "당신께"}</p>
        ${s.expect ? `<p class="invite-card__line">기대 · ${s.expect}</p>` : ""}
      </div>
      <div class="btn-row" style="margin-top:12px">
        <button type="button" class="btn btn--ghost" id="btn-save-invite">초대장 이미지로 저장</button>
      </div>

      <div class="follow-guide">
        <p class="follow-guide__title">굿즈 받는 방법</p>
        <ol class="follow-guide__steps">
          <li>아래 버튼에서 SNS 중 <strong>아무거나 하나 팔로우</strong>해요.</li>
          <li><strong>팔로우한 화면</strong>을 부스 직원에게 보여 주세요.</li>
          <li>확인되면 굿즈를 받을 수 있어요!</li>
        </ol>
        <div class="btn-row" style="margin-top:14px">
          <button type="button" class="btn btn--primary" id="btn-follow">팔로우하러 가기</button>
        </div>
        <p class="follow-guide__hint">SNS를 고른 뒤 팔로우 화면을 직원에게 보여 주세요.</p>
      </div>

      <div class="goods-banner">직원에게 팔로우 화면을 보여 주세요</div>
      <div class="btn-row">
        <button type="button" class="btn btn--ghost" id="btn-restart">다시 하기</button>
      </div>
    </section>`;
  const inviteLogo = document.getElementById("invite-logo");
  loadAssetDataUrl("fi/logo-date-h.png", (url) => {
    if (url && inviteLogo) {
      inviteLogo.src = url;
      inviteLogo.hidden = false;
    }
  });
  document.getElementById("btn-save-invite").onclick = () => saveInviteCardImage();
  document.getElementById("btn-follow").onclick = () => openFollowSheet();
  document.getElementById("btn-restart").onclick = resetToTitle;
}

function getFollowLinks_() {
  const links = window.FOLLOW_LINKS;
  if (Array.isArray(links) && links.length) return links;
  return [
    { id: "instagram", label: "Instagram", url: "https://www.instagram.com/ndff_official/" },
    { id: "facebook", label: "Facebook", url: "https://www.facebook.com/share/1DaUhNE8ci/?mibextid=wwXIfr" },
    { id: "youtube", label: "YouTube", url: "https://youtube.com/@ndff_official?si=onH7CEjHVGrEv2xq" },
    { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@ndff_official?is_from_webapp=1&sender_device=pc" }
  ];
}

function snsIconSvg_(id) {
  if (id === "instagram") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 7.7A2.9 2.9 0 1 1 14.9 12 2.9 2.9 0 0 1 12 14.9zm5.95-8.85a1.15 1.15 0 1 0 1.15 1.15 1.15 1.15 0 0 0-1.15-1.15z"/></svg>`;
  }
  if (id === "facebook") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z"/></svg>`;
  }
  if (id === "youtube") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23 12.2s0-3.1-.4-4.5c-.2-.9-.9-1.6-1.8-1.8C19.4 5.5 12 5.5 12 5.5s-7.4 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9.1 1 12.2 1 12.2s0 3.1.4 4.5c.2.9.9 1.6 1.8 1.8 1.4.4 8.8.4 8.8.4s7.4 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.5.4-4.5zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.5 3.2c.8 1.4 1.9 2.6 3.3 3.4v2.6a7.4 7.4 0 0 1-3.3-1v6.5a5.5 5.5 0 1 1-4.7-5.4v2.7a2.8 2.8 0 1 0 2 2.7V3.2h2.7z"/></svg>`;
}

function openFollowSheet() {
  document.getElementById("follow-sheet")?.remove();

  const links = getFollowLinks_();
  const overlay = document.createElement("div");
  overlay.className = "follow-sheet";
  overlay.id = "follow-sheet";
  overlay.innerHTML = `
    <div class="follow-sheet__panel" role="dialog" aria-modal="true" aria-labelledby="follow-sheet-title">
      <div class="follow-sheet__head">
        <strong id="follow-sheet-title">SNS 골라 팔로우</strong>
        <button type="button" class="icon-btn" id="btn-close-follow">닫기</button>
      </div>
      <p class="follow-sheet__desc">아래 중 <strong>아무거나 하나</strong> 들어가서 팔로우한 뒤,<br>그 화면을 직원에게 보여 주세요.</p>
      <div class="follow-sheet__grid">
        ${links
          .map(
            (link) => `
          <a class="follow-sns follow-sns--${link.id}" href="${link.url}" target="_blank" rel="noopener noreferrer">
            <span class="follow-sns__icon">${snsIconSvg_(link.id)}</span>
            <span class="follow-sns__label">${link.label}</span>
          </a>`
          )
          .join("")}
      </div>
    </div>`;

  document.body.appendChild(overlay);
  overlay.querySelector("#btn-close-follow").onclick = () => overlay.remove();
  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.remove();
  };
}

function loadHtml2Canvas_(done) {
  if (window.html2canvas) {
    done(window.html2canvas);
    return;
  }
  const existing = document.getElementById("html2canvas-cdn");
  if (existing) {
    existing.addEventListener("load", () => done(window.html2canvas));
    existing.addEventListener("error", () => done(null));
    return;
  }
  const script = document.createElement("script");
  script.id = "html2canvas-cdn";
  script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
  script.onload = () => done(window.html2canvas || null);
  script.onerror = () => done(null);
  document.head.appendChild(script);
}

function saveInviteCardImage() {
  const card = document.getElementById("invite-card");
  const btn = document.getElementById("btn-save-invite");
  if (!card || !btn) return;

  const prev = btn.textContent;
  btn.disabled = true;
  btn.textContent = "이미지 만드는 중…";

  const finishBtn = () => {
    btn.disabled = false;
    btn.textContent = prev;
  };

  loadHtml2Canvas_((html2canvas) => {
    if (!html2canvas) {
      alert("이미지 저장 기능을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.");
      finishBtn();
      return;
    }

    html2canvas(card, {
      backgroundColor: "#F4FAFA",
      scale: Math.min(3, window.devicePixelRatio || 2),
      useCORS: true,
      logging: false
    })
      .then((canvas) =>
        new Promise((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (!blob) reject(new Error("blob 생성 실패"));
            else resolve(blob);
          }, "image/png");
        })
      )
      .then(async (blob) => {
        const fileName = "남도영화제-초대장.png";
        const file = new File([blob], fileName, { type: "image/png" });

        // 모바일: 공유 시트로 저장/공유가 더 안정적
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: "남도영화제 초대장",
              text: "무구의 초대장"
            });
            finishBtn();
            return;
          } catch (err) {
            if (err && err.name === "AbortError") {
              finishBtn();
              return;
            }
          }
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1500);
        finishBtn();
      })
      .catch((err) => {
        console.error(err);
        alert("초대장 이미지 저장에 실패했어요. 다시 눌러 주세요.");
        finishBtn();
      });
  });
}

function openJournal() {
  const items = [...state.knowledge]
    .filter((id) => id !== "info:start")
    .map((id) => kMap[id])
    .filter(Boolean);
  const overlay = document.createElement("div");
  overlay.className = "journal-overlay";
  overlay.innerHTML = `
    <div class="journal-sheet">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:var(--brand)">초대장 기록</strong>
        <button type="button" class="icon-btn" id="btn-close-j">닫기</button>
      </div>
      ${
        items.length
          ? items.map((n) => `<div class="journal-item">${n.summary}</div>`).join("")
          : `<p class="body-text">아직 채워진 칸이 없어요.</p>`
      }
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector("#btn-close-j").onclick = () => overlay.remove();
  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.remove();
  };
}

function tryPlayBgm() {
  if (state.bgmOn) return;

  const play = () => {
    $bgm.volume = 0.35;
    $bgm
      .play()
      .then(() => {
        state.bgmOn = true;
        $btnBgm.textContent = "BGM ON";
      })
      .catch(() => {
        state.bgmOn = false;
        $btnBgm.textContent = "BGM";
      });
  };

  if (!$bgm.getAttribute("src")) {
    $bgm.src = assetDataCache["ndff-bgm.mp3"] || assetUrl("ndff-bgm.mp3");
  }
  play();
}

function resetToTitle() {
  clearDialogueTimers();
  state.knowledge = new Set(["info:start"]);
  state.completed = new Set();
  state.hintLevel = {};
  state.survey = null;
  state.currentMissionId = null;
  state.dialogueStep = "start";
  state.dialogueChunkIdx = 0;
  state.submitting = false;
  updateProgress();
  showTitle();
}

$btnHome.onclick = resetToTitle;

$btnBgm.onclick = () => {
  if (state.bgmOn) {
    $bgm.pause();
    state.bgmOn = false;
    $btnBgm.textContent = "BGM";
  } else {
    tryPlayBgm();
  }
};

$btnJournal.onclick = openJournal;

updateProgress();
bootPreloadThenStart();
