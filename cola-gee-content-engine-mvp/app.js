const TODAY = new Date("2026-05-12T09:00:00+08:00");
const STORE_KEY = "colaGeeContentEngineMvp";

const defaults = {
  brand: {
    name: "可樂吉健康研究所",
    author: "崇銘老師",
    tone: "專業、自然、有對話感、不硬銷、不醫療診斷、不恐嚇、不誇大療效、讓受眾覺得被理解",
    servicePath: "內容曝光 → 留言或私訊「測驗」 → 減脂能量測驗 → 視訊解析 → 1499 元三天減脂體驗 → 續購正式方案"
  },
  audiences: ["30 歲以上上班族", "常外食族", "久坐族", "沒時間運動的人", "反覆減重失敗者", "容易復胖的人", "壓力大會亂吃的人", "晚上容易暴食的人", "忙碌媽媽", "中年後覺得代謝變差的人"],
  topics: ["熱量赤字", "蛋白質", "外食減脂", "壓力與減脂", "情緒性進食", "睡眠與減脂", "喝水與代謝", "減重停滯期", "復胖", "不運動減重", "上班族減重", "40 歲後減重", "宵夜與嘴饞", "早餐與血糖穩定", "減重迷思", "客戶案例", "減脂測驗 CTA", "1499 三天體驗", "賀寶芙產品應用", "減重心態與執行力"],
  goals: ["流量型", "共鳴型", "專業型", "互動型", "轉換型"],
  formats: ["短影音", "連播圖文", "Threads", "IG 貼文文案", "限動互動", "廣告文案", "私訊開場話術"],
  ctas: ["留言「測驗」", "私訊我「測驗」", "預約 10 到 15 分鐘減脂解析", "做減脂卡點檢測", "找出自己減不下來的根源"],
  hookTypes: ["打臉迷思", "自我檢查", "故事案例", "情境共鳴", "二選一互動", "專業解析"],
  statuses: ["靈感", "已產出", "待製作", "已發布", "已追蹤成效"],
  templates: ["打臉迷思型", "自我檢查型", "故事型", "情境共鳴型", "客戶案例型", "二選一互動型", "專業口播"],
  cloud: {
    workspaceId: "cola-gee-main",
    syncToken: "",
    lastSyncedAt: "",
    status: "尚未同步"
  }
};

const sampleIdeas = [
  {
    id: "idea-pressure",
    title: "白天忍住，晚上爆吃，不一定是意志力差",
    topic: "壓力與減脂",
    audience: "壓力大會亂吃的人",
    content_goal: "共鳴型",
    content_format: "短影音",
    hook_type: "情境共鳴",
    cta: "留言「測驗」",
    status: "已產出",
    created_at: iso(),
    updated_at: iso()
  },
  {
    id: "idea-eating-out",
    title: "外食族減脂，不是只能吃水煮餐",
    topic: "外食減脂",
    audience: "常外食族",
    content_goal: "專業型",
    content_format: "連播圖文",
    hook_type: "打臉迷思",
    cta: "做減脂卡點檢測",
    status: "已產出",
    created_at: iso(),
    updated_at: iso()
  },
  {
    id: "idea-plateau",
    title: "減重停滯期先別再少吃，先看這 3 件事",
    topic: "減重停滯期",
    audience: "反覆減重失敗者",
    content_goal: "轉換型",
    content_format: "Threads",
    hook_type: "自我檢查",
    cta: "私訊我「測驗」",
    status: "已產出",
    created_at: iso(),
    updated_at: iso()
  }
];

const sampleMetrics = [
  metric("idea-pressure", "Instagram", "短影音", "共鳴型", "壓力與減脂", "壓力大會亂吃的人", "白天忍住，晚上爆吃？", "白天忍住，晚上爆吃，不一定是意志力差", "留言「測驗」", false, 0, 8200, 6100, 7900, 47, 212, 38, 51, 86, 71, 24, 18, 7, 2, 1),
  metric("idea-eating-out", "Instagram", "連播圖文", "專業型", "外食減脂", "常外食族", "外食不是減脂失敗主因", "外食族減脂，不是只能吃水煮餐", "做減脂卡點檢測", true, 900, 5200, 3900, 0, 0, 160, 22, 35, 74, 42, 14, 9, 4, 1, 0),
  metric("idea-plateau", "Threads", "Threads", "轉換型", "減重停滯期", "反覆減重失敗者", "停滯不代表你該更狠", "減重停滯期先別再少吃", "私訊我「測驗」", false, 0, 4300, 3600, 0, 0, 118, 44, 28, 31, 39, 19, 12, 6, 1, 0)
];

let state = loadState();
let currentPage = location.pathname === "/" ? "dashboard" : location.pathname.slice(1);

function iso(date = TODAY) {
  return date.toISOString();
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
}

function metric(contentId, platform, format, goal, topic, audience, title, hook, cta, ad, spend, impressions, reach, views, completion, likes, comments, shares, saves, profile, dm, quiz, booking, trial, renewal) {
  return {
    id: uid("metric"),
    content_id: contentId,
    publish_date: formatDate(TODAY),
    platform,
    content_format: format,
    content_goal: goal,
    topic,
    audience,
    title,
    hook,
    cta,
    is_ad: ad,
    ad_spend: spend,
    impressions,
    reach,
    views,
    completion_rate: completion,
    likes,
    comments,
    shares,
    saves,
    profile_clicks: profile,
    dm_count: dm,
    quiz_comment_count: quiz,
    booking_count: booking,
    trial_sales_count: trial,
    renewal_count: renewal,
    notes: "",
    created_at: iso(),
    updated_at: iso()
  };
}

function loadState() {
  const saved = localStorage.getItem(STORE_KEY);
  if (saved) return normalizeState(JSON.parse(saved));
  const initial = {
    settings: structuredClone(defaults),
    content_ideas: sampleIdeas,
    content_calendar: createWeeklySchedule({ goal: "增加自然流量", topics: ["壓力與減脂", "外食減脂", "減重停滯期"], cta: "留言「測驗」", avoid: "", count: 7 }, false),
    scripts: sampleIdeas.map((idea) => makeScript(idea.topic, idea.audience, idea.content_goal, "60 秒", idea.hook_type + "型", idea.cta, idea.id)),
    carousel_posts: sampleIdeas.map((idea) => makeCarousel(idea.topic, idea.content_goal, idea.audience, 7, "日式雜誌風", idea.cta, idea.id)),
    social_copy: sampleIdeas.map((idea) => makeSocialCopy(idea.topic, idea.audience, idea.content_goal, idea.cta, idea.id)),
    performance_metrics: sampleMetrics
  };
  localStorage.setItem(STORE_KEY, JSON.stringify(initial));
  return initial;
}

function normalizeState(saved) {
  const settings = saved.settings || {};
  saved.settings = {
    ...structuredClone(defaults),
    ...settings,
    brand: { ...defaults.brand, ...(settings.brand || {}) },
    cloud: { ...defaults.cloud, ...(settings.cloud || {}) }
  };
  return saved;
}

function save() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function render() {
  const pages = {
    dashboard: ["首頁儀表板", "追蹤本週內容與名單來源，快速看出值得加碼的素材。", renderDashboard],
    calendar: ["內容排程", "產生、編輯與匯出一週 7 天內容排程。", renderCalendar],
    "script-generator": ["腳本產生", "產出 Hook、口播、字幕、分鏡、封面與貼文文案。", renderScriptGenerator],
    "carousel-generator": ["連播圖文", "產出 6 到 8 頁連播圖文大綱與圖像提示詞。", renderCarouselGenerator],
    "copy-generator": ["社群文案", "產出 IG、Threads、限動互動與留言後私訊話術。", renderCopyGenerator],
    performance: ["成效追蹤", "手動輸入數據，分析主題、Hook、CTA 與內容形式。", renderPerformance],
    settings: ["設定", "管理品牌設定、CTA、受眾、主題與內容模板。", renderSettings]
  };
  const [title, desc, body] = pages[currentPage] || pages.dashboard;
  document.getElementById("app").innerHTML = `
    <div class="app">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">可</div>
          <h1>${state.settings.brand.name}</h1>
          <p>${state.settings.brand.author}｜內容引擎 MVP</p>
        </div>
        <nav class="nav">
          ${navButton("dashboard", "⌂", "首頁儀表板")}
          ${navButton("calendar", "□", "內容排程")}
          ${navButton("script-generator", "▶", "腳本產生")}
          ${navButton("carousel-generator", "▤", "連播圖文")}
          ${navButton("copy-generator", "✎", "社群文案")}
          ${navButton("performance", "↗", "成效追蹤")}
          ${navButton("settings", "⚙", "設定")}
        </nav>
      </aside>
      <main class="main">
        <header class="topbar">
          <div>
            <h2>${title}</h2>
            <p>${desc}</p>
          </div>
          <button class="btn secondary" onclick="resetDemo()">重置測試資料</button>
        </header>
        <section class="page">${body()}</section>
      </main>
    </div>
  `;
}

function navButton(id, icon, label) {
  return `<button class="${currentPage === id ? "active" : ""}" onclick="go('${id}')"><span>${icon}</span>${label}</button>`;
}

function go(page) {
  currentPage = page;
  history.pushState(null, "", page === "dashboard" ? "/" : `/${page}`);
  render();
}

window.onpopstate = () => {
  currentPage = location.pathname === "/" ? "dashboard" : location.pathname.slice(1);
  render();
};

function renderDashboard() {
  const week = currentWeekMetrics();
  const organicLeads = sum(week.filter((m) => !m.is_ad), "dm_count");
  const adLeads = sum(week.filter((m) => m.is_ad), "dm_count");
  const best = topBy(state.performance_metrics, "dm_count", 1)[0];
  const today = state.content_calendar.find((row) => row.date === formatDate(TODAY)) || state.content_calendar[0];
  return `
    <div class="grid four">
      ${metricCard("本週內容數", state.content_calendar.length)}
      ${metricCard("本週自然名單", organicLeads)}
      ${metricCard("本週廣告名單", adLeads)}
      ${metricCard("本週私訊數", sum(week, "dm_count"))}
      ${metricCard("本週預約數", sum(week, "booking_count"))}
      ${metricCard("本週成交數", sum(week, "trial_sales_count"))}
      ${metricCard("留言測驗數", sum(week, "quiz_comment_count"))}
      ${metricCard("自然觸及", sum(week.filter((m) => !m.is_ad), "reach"))}
    </div>
    <div class="grid two" style="margin-top:16px">
      <div class="panel">
        <h3>今日要製作的內容</h3>
        ${today ? contentPreview(today) : `<p class="muted">還沒有今日排程。</p>`}
      </div>
      <div class="panel soft">
        <h3>表現最好的內容</h3>
        ${best ? contentPreview(best) : `<p class="muted">還沒有成效資料。</p>`}
      </div>
    </div>
    <div class="grid two" style="margin-top:16px">
      <div class="panel">${rankingBlock("私訊最多前 5 篇", topBy(state.performance_metrics, "dm_count", 5), "dm_count")}</div>
      <div class="panel">${recommendations()}</div>
    </div>
  `;
}

function metricCard(label, value) {
  return `<div class="panel metric"><span>${label}</span><strong>${number(value)}</strong></div>`;
}

function contentPreview(item) {
  return `
    <div class="item">
      <strong>${item.title}</strong>
      <div>
        <span class="tag">${item.platform || item.content_format || "Instagram"}</span>
        <span class="tag">${item.content_goal}</span>
        <span class="tag">${item.topic}</span>
      </div>
      <p class="muted">${item.hook || item.notes || item.cta || ""}</p>
    </div>
  `;
}

function renderCalendar() {
  return `
    <div class="panel">
      <div class="split-title">
        <h3>產生本週內容排程</h3>
        <div class="actions">
          <button class="btn secondary" onclick="exportCalendarCsv()">匯出 CSV</button>
          <button class="btn secondary" onclick="copyMarkdown('calendar')">複製 Markdown</button>
        </div>
      </div>
      <div class="form">
        ${selectField("weekGoal", "本週主要目標", ["增加自然流量", "增加留言測驗", "增加私訊", "增加預約解析", "增加 1499 體驗成交"], "增加自然流量", "span-3")}
        ${multiTextField("weekTopics", "本週主打主題，逗號分隔", "壓力與減脂, 外食減脂, 減重停滯期", "span-4")}
        ${selectField("weekCta", "想推廣的 CTA", state.settings.ctas, "留言「測驗」", "span-3")}
        ${inputField("weekCount", "內容數量", "number", 7, "span-2")}
        ${inputField("weekAvoid", "想避開的主題", "text", "", "span-8")}
        <div class="field span-4"><button class="btn" onclick="generateCalendar()">產生 7 天排程</button></div>
      </div>
    </div>
    <div class="panel" style="margin-top:16px">
      <div class="split-title">
        <h3>一週內容排程表</h3>
        <button class="btn ghost" onclick="addCalendarRow()">新增內容</button>
      </div>
      ${calendarTable()}
    </div>
  `;
}

function calendarTable() {
  const rows = state.content_calendar.map((row, index) => `
    <tr>
      <td><input value="${row.date}" onchange="editCalendar(${index}, 'date', this.value)"></td>
      <td>${selectInline(defaults.formats, row.content_format, `editCalendar(${index}, 'content_format', this.value)`)}</td>
      <td>${selectInline(defaults.goals, row.content_goal, `editCalendar(${index}, 'content_goal', this.value)`)}</td>
      <td><input value="${row.audience}" onchange="editCalendar(${index}, 'audience', this.value)"></td>
      <td><input value="${row.topic}" onchange="editCalendar(${index}, 'topic', this.value)"></td>
      <td><input value="${row.title}" onchange="editCalendar(${index}, 'title', this.value)"></td>
      <td><textarea onchange="editCalendar(${index}, 'hook', this.value)">${row.hook || ""}</textarea></td>
      <td><textarea onchange="editCalendar(${index}, 'angle', this.value)">${row.angle || ""}</textarea></td>
      <td><input value="${row.cta || ""}" onchange="editCalendar(${index}, 'cta', this.value)"></td>
      <td><input value="${row.platform || ""}" onchange="editCalendar(${index}, 'platform', this.value)"></td>
      <td>${selectInline(["否", "是"], row.ad_suitable ? "是" : "否", `editCalendar(${index}, 'ad_suitable', this.value === '是')`)}</td>
      <td>${selectInline(state.settings.statuses, row.status, `editCalendar(${index}, 'status', this.value)`)}</td>
    </tr>
  `).join("");
  return `<div class="table-wrap"><table>
    <thead><tr><th>日期</th><th>形式</th><th>目標</th><th>受眾</th><th>主題</th><th>標題</th><th>Hook</th><th>核心角度</th><th>CTA</th><th>平台</th><th>廣告</th><th>狀態</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

function generateCalendar() {
  const topics = val("weekTopics").split(",").map((s) => s.trim()).filter(Boolean);
  state.content_calendar = createWeeklySchedule({
    goal: val("weekGoal"),
    topics,
    cta: val("weekCta"),
    avoid: val("weekAvoid"),
    count: Number(val("weekCount") || 7)
  }, true);
  save();
  render();
}

function createWeeklySchedule(input, persistIdeas) {
  const goalPlan = ["流量型", "流量型", "流量型", "共鳴型", "共鳴型", "專業型", "轉換型"];
  const formats = ["短影音", "連播圖文", "短影音", "Threads", "連播圖文", "IG 貼文文案", "短影音"];
  const platforms = ["Instagram Reels, TikTok, YouTube Shorts", "Instagram", "Instagram Reels", "Threads", "Instagram", "Instagram", "Instagram Reels, Facebook"];
  const rows = [];
  for (let i = 0; i < input.count; i++) {
    const topic = (input.topics[i % input.topics.length] || defaults.topics[i % defaults.topics.length]);
    if (input.avoid && topic.includes(input.avoid)) continue;
    const goal = goalPlan[i % goalPlan.length];
    const audience = pickAudience(topic, i);
    const format = formats[i % formats.length];
    const title = titleFor(topic, goal, audience);
    const hook = hookFor(topic, audience, goal);
    const row = {
      id: uid("cal"),
      date: formatDate(addDays(TODAY, i)),
      platform: platforms[i % platforms.length],
      content_id: uid("idea"),
      title,
      content_format: format,
      content_goal: goal,
      topic,
      audience,
      hook,
      angle: angleFor(topic, goal, audience),
      cta: input.cta,
      ad_suitable: goal === "流量型" || goal === "轉換型",
      status: "待製作",
      notes: `本週目標：${input.goal}。避免醫療診斷與誇大承諾。`
    };
    rows.push(row);
    if (persistIdeas) {
      state.content_ideas.push({
        id: row.content_id,
        title,
        topic,
        audience,
        content_goal: goal,
        content_format: format,
        hook_type: hookTypeFromGoal(goal),
        cta: input.cta,
        status: "靈感",
        created_at: iso(),
        updated_at: iso()
      });
    }
  }
  return rows;
}

function renderScriptGenerator() {
  return generatorShell("script", `
    ${inputField("scriptTopic", "主題", "text", "壓力與減脂", "span-4")}
    ${selectField("scriptAudience", "目標受眾", state.settings.audiences, "壓力大會亂吃的人", "span-4")}
    ${selectField("scriptGoal", "內容目標", state.settings.goals, "共鳴型", "span-2")}
    ${selectField("scriptLength", "影片長度", ["30 秒", "45 秒", "60 秒", "90 秒"], "60 秒", "span-2")}
    ${selectField("scriptStyle", "風格 / 模板", state.settings.templates, "情境共鳴型", "span-4")}
    ${selectField("scriptCta", "CTA", state.settings.ctas, "留言「測驗」", "span-4")}
    <div class="field span-4"><button class="btn" onclick="generateScript()">產生短影音腳本</button></div>
  `);
}

function generateScript() {
  const script = makeScript(val("scriptTopic"), val("scriptAudience"), val("scriptGoal"), val("scriptLength"), val("scriptStyle"), val("scriptCta"), uid("idea"));
  state.scripts.unshift(script);
  state.content_ideas.unshift({
    id: script.content_id,
    title: `${script.topic}短影音：${script.selected_hook}`,
    topic: script.topic,
    audience: script.audience,
    content_goal: script.content_goal,
    content_format: "短影音",
    hook_type: normalizeHookType(val("scriptStyle")),
    cta: script.cta,
    status: "已產出",
    created_at: iso(),
    updated_at: iso()
  });
  save();
  renderOutput(formatScript(script), "短影音腳本已產出");
}

function makeScript(topic, audience, goal, length, style, cta, contentId) {
  const profile = scriptTopicProfile(topic, audience);
  const seconds = parseDuration(length);
  const hooks = hookOptionsFor(topic, audience, goal, style, profile);
  const segments = scriptSegments(topic, audience, goal, seconds, style, cta, profile, hooks[0]);
  const spoken = segments.map((segment) => segment.text).join("\n\n");
  const subtitles = subtitleLinesFromSegments(segments);
  const storyboard = storyboardFor(topic, audience, segments, cta, style, profile);
  return {
    id: uid("script"),
    content_id: contentId,
    topic,
    audience,
    content_goal: goal,
    length,
    style,
    cta,
    segments,
    hook_options: hooks,
    selected_hook: hooks[0],
    spoken_script: spoken,
    subtitle_script: subtitles,
    storyboard,
    cover_titles: [
      trimText(`${topic}卡住了？`, 16),
      trimText(`不是你不努力`, 16),
      trimText(`${audience}先看這篇`, 16),
      trimText(`減脂真正卡點`, 16),
      trimText(`別再只怪意志力`, 16)
    ],
    image_prompts: storyboard.map((s) => s.prompt),
    ig_caption: igCaption(topic, audience, cta),
    comment_guides: [
      `柔和版：如果你也想先了解自己卡在哪，可以留言「測驗」，我會把檢測方式傳給你。`,
      `直接版：想找出減不下來的根源，留言「測驗」，我傳減脂能量測驗給你。`,
      `互動版：你比較像外食型、壓力型，還是停滯型？留言「測驗」我幫你從測驗開始看。`
    ],
    quality: qualityCheck(hooks[0], cta, audience, spoken, seconds, segments),
    created_at: iso(),
    updated_at: iso()
  };
}

function renderCarouselGenerator() {
  return generatorShell("carousel", `
    ${inputField("carouselTopic", "主題", "text", "外食減脂", "span-4")}
    ${selectField("carouselGoal", "內容目標", state.settings.goals, "專業型", "span-3")}
    ${selectField("carouselAudience", "目標受眾", state.settings.audiences, "常外食族", "span-3")}
    ${selectField("carouselPages", "頁數", [6, 7, 8], 7, "span-2")}
    ${selectField("carouselStyle", "風格", ["日式雜誌風", "專業簡潔", "溫暖共鳴", "反差吸睛"], "日式雜誌風", "span-4")}
    ${selectField("carouselCta", "CTA", state.settings.ctas, "留言「測驗」", "span-4")}
    <div class="field span-4"><button class="btn" onclick="generateCarousel()">產生連播圖文</button></div>
  `);
}

function generateCarousel() {
  const carousel = makeCarousel(val("carouselTopic"), val("carouselGoal"), val("carouselAudience"), Number(val("carouselPages")), val("carouselStyle"), val("carouselCta"), uid("idea"));
  state.carousel_posts.unshift(carousel);
  state.content_ideas.unshift({
    id: carousel.content_id,
    title: carousel.pages[0].title,
    topic: carousel.topic,
    audience: carousel.audience,
    content_goal: carousel.content_goal,
    content_format: "連播圖文",
    hook_type: "打臉迷思",
    cta: carousel.cta,
    status: "已產出",
    created_at: iso(),
    updated_at: iso()
  });
  save();
  renderOutput(formatCarousel(carousel), "連播圖文已產出");
}

function makeCarousel(topic, goal, audience, pageCount, style, cta, contentId) {
  const structures = ["強 Hook 封面", "痛點共鳴", "打破錯誤認知", "解釋真正原因", "生活化例子", "簡單行動建議", "CTA", "補充檢查清單"];
  const brand = defaults.brand;
  const pages = Array.from({ length: pageCount }, (_, i) => {
    const role = structures[i] || "補充延伸";
    const isCta = i === pageCount - 1;
    return {
      page: i + 1,
      role,
      title: isCta ? "想找到問題的根源嗎？" : carouselTitle(topic, role, audience),
      subtitle: isCta ? cta : carouselSubtitle(topic, role),
      body: isCta ? `我提供減脂能量測驗，幫你找出最深的原因。\n${brand.name} ${brand.author}` : carouselBody(topic, role, audience),
      visual: `${style}，乾淨留白，手機閱讀友善，人物情緒被理解但不負面。`,
      prompt: `4:5, ${style}, professional healthy lifestyle, Asian office worker, ${topic}, clean layout, large blank space for Traditional Chinese text, warm natural light, mobile-friendly composition, no misspelled text, no excessive text in image`,
      layout: "上方主標，下方 2 到 3 行重點，保留頁尾署名。",
      footer: `${brand.name} ${brand.author}`
    };
  });
  return {
    id: uid("carousel"),
    content_id: contentId,
    topic,
    content_goal: goal,
    audience,
    pages,
    caption: igCaption(topic, audience, cta),
    image_prompts: pages.map((p) => p.prompt),
    cta,
    style,
    quality: qualityCheck(pages[0].title, cta, audience, pages.map((p) => p.body).join("\n")),
    created_at: iso(),
    updated_at: iso()
  };
}

function renderCopyGenerator() {
  return generatorShell("copy", `
    ${inputField("copyTopic", "主題", "text", "減重停滯期", "span-4")}
    ${selectField("copyAudience", "目標受眾", state.settings.audiences, "反覆減重失敗者", "span-4")}
    ${selectField("copyGoal", "內容目標", state.settings.goals, "轉換型", "span-2")}
    ${selectField("copyCta", "CTA", state.settings.ctas, "私訊我「測驗」", "span-2")}
    ${selectField("dmType", "私訊情境", ["留言「測驗」", "留言「我也瘦不下來」", "留言「外食很難控制」", "留言「壓力大就亂吃」", "留言「我都復胖」", "留言「想了解」", "看完限動投票後私訊"], "留言「測驗」", "span-4")}
    <div class="field span-4"><button class="btn" onclick="generateCopy()">產生社群文案</button></div>
  `);
}

function generateCopy() {
  const copy = makeSocialCopy(val("copyTopic"), val("copyAudience"), val("copyGoal"), val("copyCta"), uid("idea"), val("dmType"));
  state.social_copy.unshift(copy);
  save();
  renderOutput(formatSocialCopy(copy), "社群文案已產出");
}

function makeSocialCopy(topic, audience, goal, cta, contentId, dmType = "留言「測驗」") {
  const threads = [
    `共鳴版\n${hookFor(topic, audience, "共鳴型")}\n\n很多人不是不知道要控制，而是生活節奏一亂，就很難穩定執行。\n\n先不用急著怪自己。先看見自己卡在哪，策略才有機會調整。\n\n你最常卡在白天、晚上，還是假日？`,
    `觀點版\n減重最怕的不是吃錯一餐，而是一直用不適合自己的方法硬撐。\n\n${topic}常常不是單一問題，而是飲食、壓力、睡眠和外食選擇一起影響。\n\n把問題拆小，通常比再逼自己更有效。`,
    `CTA 版\n如果你一直覺得${topic}很卡，先別急著換更激烈的方法。\n\n可以先做一次減脂能量測驗，看你比較像外食型、壓力型、停滯型，還是作息型。\n\n${cta}，我把測驗方式傳給你。`
  ];
  return {
    id: uid("copy"),
    content_id: contentId,
    topic,
    audience,
    content_goal: goal,
    cta,
    instagram_caption: igCaption(topic, audience, cta),
    threads_copy: threads,
    story_poll: [`你最近有覺得${topic}卡住嗎？｜有 / 還好`, "白天可以忍，晚上容易失控？｜會 / 不會", "你比較想先調整哪個？｜外食 / 作息"],
    story_question: [`你減重最常卡在哪裡？`, `如果用一句話形容你的${topic}，會是什麼？`, `你最想先改善外食、嘴饞還是壓力？`],
    story_either: ["外食型 / 壓力型", "白天忍住 / 晚上破功", "想瘦快一點 / 想穩定不復胖"],
    story_quiz: [`${topic}只要少吃就會改善？ A 對 B 不一定`, "減脂停滯時一定要再少吃？ A 對 B 不一定", "睡眠和壓力會影響執行穩定度？ A 會 B 不會"],
    story_dm: [`想知道自己是哪一型，可以回我「測驗」。`, `如果你也卡在${topic}，回我「測驗」先做檢測。`, `不用先買方案，先找出卡點。想測就回「測驗」。`],
    dm_script: dmScript(dmType, topic),
    created_at: iso(),
    updated_at: iso()
  };
}

function renderPerformance() {
  return `
    <div class="panel">
      <div class="split-title">
        <h3>新增成效紀錄</h3>
        <button class="btn secondary" onclick="exportMetricsCsv()">匯出 CSV</button>
      </div>
      <div class="form">
        ${inputField("mTitle", "標題", "text", "新的內容標題", "span-4")}
        ${selectField("mPlatform", "平台", ["Instagram", "Threads", "TikTok", "YouTube Shorts", "Facebook"], "Instagram", "span-2")}
        ${selectField("mFormat", "內容形式", ["短影音", "連播圖文", "Threads", "限動", "廣告"], "短影音", "span-2")}
        ${selectField("mGoal", "內容目標", state.settings.goals, "流量型", "span-2")}
        ${inputField("mDate", "發布日期", "date", formatDate(TODAY), "span-2")}
        ${selectField("mTopic", "主題分類", state.settings.topics, "壓力與減脂", "span-3")}
        ${selectField("mAudience", "目標受眾", state.settings.audiences, "30 歲以上上班族", "span-3")}
        ${inputField("mHook", "Hook", "text", "白天忍住，晚上爆吃？", "span-4")}
        ${selectField("mCta", "CTA", state.settings.ctas, "留言「測驗」", "span-2")}
        ${inputField("mReach", "觸及數", "number", 0, "span-2")}
        ${inputField("mImpressions", "曝光數", "number", 0, "span-2")}
        ${inputField("mViews", "播放數", "number", 0, "span-2")}
        ${inputField("mCompletion", "完播率", "number", 0, "span-2")}
        ${inputField("mLikes", "按讚", "number", 0, "span-2")}
        ${inputField("mComments", "留言", "number", 0, "span-2")}
        ${inputField("mShares", "分享", "number", 0, "span-2")}
        ${inputField("mSaves", "收藏", "number", 0, "span-2")}
        ${inputField("mProfile", "個人檔案點擊", "number", 0, "span-2")}
        ${inputField("mDm", "私訊數", "number", 0, "span-2")}
        ${inputField("mQuiz", "留言測驗人數", "number", 0, "span-2")}
        ${inputField("mBooking", "預約解析", "number", 0, "span-2")}
        ${inputField("mTrial", "1499 成交", "number", 0, "span-2")}
        ${inputField("mRenewal", "續購", "number", 0, "span-2")}
        ${inputField("mSpend", "廣告花費", "number", 0, "span-2")}
        <div class="field span-4"><button class="btn" onclick="addMetric()">儲存成效</button></div>
      </div>
    </div>
    <div class="grid two" style="margin-top:16px">
      <div class="panel">${rankingBlock("觸及最高前 5 篇", topBy(state.performance_metrics, "reach", 5), "reach")}</div>
      <div class="panel">${rankingBlock("私訊最多前 5 篇", topBy(state.performance_metrics, "dm_count", 5), "dm_count")}</div>
      <div class="panel">${rankingBlock("留言最多前 5 篇", topBy(state.performance_metrics, "comments", 5), "comments")}</div>
      <div class="panel">${rankingBlock("收藏最多前 5 篇", topBy(state.performance_metrics, "saves", 5), "saves")}</div>
      <div class="panel">${rankingBlock("成交最多前 5 篇", topBy(state.performance_metrics, "trial_sales_count", 5), "trial_sales_count")}</div>
      <div class="panel">${recommendations()}</div>
    </div>
    <div class="grid two" style="margin-top:16px">
      <div class="panel">${analysisTable("主題分析", "topic")}</div>
      <div class="panel">${hookAnalysis()}</div>
    </div>
    <div class="panel" style="margin-top:16px">
      <h3>成效紀錄表</h3>
      ${metricsTable()}
    </div>
  `;
}

function addMetric() {
  state.performance_metrics.unshift({
    id: uid("metric"),
    content_id: uid("idea"),
    publish_date: val("mDate"),
    platform: val("mPlatform"),
    content_format: val("mFormat"),
    content_goal: val("mGoal"),
    topic: val("mTopic"),
    audience: val("mAudience"),
    title: val("mTitle"),
    hook: val("mHook"),
    cta: val("mCta"),
    is_ad: Number(val("mSpend")) > 0,
    ad_spend: numVal("mSpend"),
    impressions: numVal("mImpressions"),
    reach: numVal("mReach"),
    views: numVal("mViews"),
    completion_rate: numVal("mCompletion"),
    likes: numVal("mLikes"),
    comments: numVal("mComments"),
    shares: numVal("mShares"),
    saves: numVal("mSaves"),
    profile_clicks: numVal("mProfile"),
    dm_count: numVal("mDm"),
    quiz_comment_count: numVal("mQuiz"),
    booking_count: numVal("mBooking"),
    trial_sales_count: numVal("mTrial"),
    renewal_count: numVal("mRenewal"),
    notes: "",
    created_at: iso(),
    updated_at: iso()
  });
  save();
  render();
}

function metricsTable() {
  const rows = state.performance_metrics.map((m) => {
    const c = calc(m);
    return `<tr>
      <td>${m.publish_date}</td><td>${m.platform}</td><td>${m.content_format}</td><td>${m.content_goal}</td><td>${m.topic}</td><td>${m.title}</td><td>${m.hook}</td><td>${m.cta}</td>
      <td>${number(m.reach)}</td><td>${number(m.dm_count)}</td><td>${number(m.quiz_comment_count)}</td><td>${number(m.booking_count)}</td><td>${number(m.trial_sales_count)}</td>
      <td>${pct(c.engagementRate)}</td><td>${pct(c.dmRate)}</td><td>${pct(c.bookingRate)}</td><td>${pct(c.salesRate)}</td><td>${money(c.leadCost)}</td><td>${money(c.salesCost)}</td>
    </tr>`;
  }).join("");
  return `<div class="table-wrap"><table>
    <thead><tr><th>日期</th><th>平台</th><th>形式</th><th>目標</th><th>主題</th><th>標題</th><th>Hook</th><th>CTA</th><th>觸及</th><th>私訊</th><th>測驗</th><th>預約</th><th>成交</th><th>互動率</th><th>私訊率</th><th>預約率</th><th>成交率</th><th>名單成本</th><th>成交成本</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

function renderSettings() {
  return `
    <div class="grid two">
      <div class="panel">
        <h3>品牌設定</h3>
        <div class="form">
          ${inputField("brandName", "品牌名稱", "text", state.settings.brand.name, "span-6")}
          ${inputField("brandAuthor", "作者署名", "text", state.settings.brand.author, "span-6")}
          ${textareaField("brandTone", "品牌語氣", state.settings.brand.tone, "span-12")}
          ${textareaField("servicePath", "服務路徑", state.settings.brand.servicePath, "span-12")}
          <div class="field span-12"><button class="btn" onclick="saveBrandSettings()">儲存品牌設定</button></div>
        </div>
      </div>
      <div class="panel">
        <h3>分類設定</h3>
        ${settingsTextarea("ctas", "CTA 設定")}
        ${settingsTextarea("audiences", "目標受眾")}
        ${settingsTextarea("topics", "主題分類")}
        ${settingsTextarea("templates", "內容模板")}
        <button class="btn" onclick="saveListSettings()">儲存分類</button>
      </div>
    </div>
    <div class="panel" style="margin-top:16px">
      <div class="split-title">
        <h3>雲端同步</h3>
        <span class="tag">${state.settings.cloud.status || "尚未同步"}</span>
      </div>
      <div class="notice" style="margin-bottom:12px">
        部署到 Vercel 並接上 Supabase 後，手機和電腦會讀寫同一份資料。同步金鑰只存在你的瀏覽器，不會上傳到資料庫。
      </div>
      <div class="form">
        ${inputField("cloudWorkspaceId", "工作區 ID", "text", state.settings.cloud.workspaceId, "span-4")}
        ${inputField("cloudSyncToken", "同步金鑰", "password", state.settings.cloud.syncToken, "span-4")}
        <div class="field span-4">
          <label>最後同步時間</label>
          <input value="${state.settings.cloud.lastSyncedAt || "尚未同步"}" readonly>
        </div>
        <div class="field span-12">
          <div class="actions">
            <button class="btn" onclick="saveCloudSettings()">儲存同步設定</button>
            <button class="btn secondary" onclick="pushCloudState()">上傳到雲端</button>
            <button class="btn secondary" onclick="pullCloudState()">從雲端下載</button>
          </div>
        </div>
      </div>
    </div>
    <div class="panel" style="margin-top:16px">
      <h3>內容資料庫</h3>
      ${ideasTable()}
    </div>
  `;
}

function saveBrandSettings() {
  state.settings.brand.name = val("brandName");
  state.settings.brand.author = val("brandAuthor");
  state.settings.brand.tone = val("brandTone");
  state.settings.brand.servicePath = val("servicePath");
  save();
  render();
}

function saveListSettings() {
  ["ctas", "audiences", "topics", "templates"].forEach((key) => {
    state.settings[key] = val(`set-${key}`).split("\n").map((s) => s.trim()).filter(Boolean);
  });
  save();
  render();
}

function saveCloudSettings() {
  state.settings.cloud.workspaceId = val("cloudWorkspaceId").trim() || defaults.cloud.workspaceId;
  state.settings.cloud.syncToken = val("cloudSyncToken").trim();
  state.settings.cloud.status = "同步設定已儲存";
  save();
  render();
}

async function pushCloudState() {
  saveCloudSettings();
  try {
    const response = await fetch(`/api/state?workspace_id=${encodeURIComponent(state.settings.cloud.workspaceId)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sync-token": state.settings.cloud.syncToken
      },
      body: JSON.stringify({ payload: sanitizeForCloud(state) })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "雲端上傳失敗");
    state.settings.cloud.lastSyncedAt = new Date().toISOString();
    state.settings.cloud.status = "已上傳到雲端";
    save();
    render();
  } catch (error) {
    state.settings.cloud.status = `同步失敗：${error.message}`;
    save();
    render();
  }
}

async function pullCloudState() {
  saveCloudSettings();
  try {
    const response = await fetch(`/api/state?workspace_id=${encodeURIComponent(state.settings.cloud.workspaceId)}`, {
      headers: { "x-sync-token": state.settings.cloud.syncToken }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "雲端下載失敗");
    if (!data.payload) throw new Error("雲端目前沒有資料，請先從其中一台裝置上傳");
    const localCloud = { ...state.settings.cloud };
    state = normalizeState(data.payload);
    state.settings.cloud = {
      ...localCloud,
      lastSyncedAt: data.updated_at || new Date().toISOString(),
      status: "已從雲端下載"
    };
    save();
    render();
  } catch (error) {
    state.settings.cloud.status = `同步失敗：${error.message}`;
    save();
    render();
  }
}

function sanitizeForCloud(currentState) {
  const copy = structuredClone(currentState);
  if (copy.settings?.cloud) {
    copy.settings.cloud.syncToken = "";
    copy.settings.cloud.status = "雲端資料";
  }
  return copy;
}

function settingsTextarea(key, label) {
  return `<div class="field" style="margin-bottom:10px"><label>${label}</label><textarea id="set-${key}">${state.settings[key].join("\n")}</textarea></div>`;
}

function ideasTable() {
  const rows = state.content_ideas.map((i) => `<tr><td>${i.title}</td><td>${i.topic}</td><td>${i.audience}</td><td>${i.content_goal}</td><td>${i.content_format}</td><td>${i.hook_type}</td><td>${i.cta}</td><td><span class="tag status">${i.status}</span></td></tr>`).join("");
  return `<div class="table-wrap"><table><thead><tr><th>標題</th><th>主題</th><th>受眾</th><th>目標</th><th>形式</th><th>Hook 類型</th><th>CTA</th><th>狀態</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function generatorShell(type, formHtml) {
  const latest = {
    script: state.scripts[0] ? formatScript(state.scripts[0]) : "",
    carousel: state.carousel_posts[0] ? formatCarousel(state.carousel_posts[0]) : "",
    copy: state.social_copy[0] ? formatSocialCopy(state.social_copy[0]) : ""
  }[type];
  return `
    <div class="panel">
      <div class="form">${formHtml}</div>
    </div>
    <div class="panel" style="margin-top:16px">
      <div class="copy-row">
        <h3 style="margin:0">產出結果</h3>
        <button class="btn secondary" onclick="copyCurrentOutput()">複製結果</button>
      </div>
      <div id="resultTitle" class="muted small">顯示最近一次產出，也可以重新產生。</div>
      <pre id="generatorOutput" class="output">${escapeHtml(latest)}</pre>
    </div>
  `;
}

function renderOutput(text, title) {
  document.getElementById("generatorOutput").textContent = text;
  document.getElementById("resultTitle").textContent = title;
}

function formatScript(s) {
  return `# 短影音腳本｜${s.topic}

內容目標：${s.content_goal}
目標受眾：${s.audience}
影片長度：${s.length}
風格：${s.style}
CTA：${s.cta}

## A. Hook 選項
${s.hook_options.map((h, i) => `${i + 1}. ${h}`).join("\n")}

## B. 完整短影音腳本
${(s.segments || legacySegments(s)).map((segment) => `${segment.label} ${segment.time}：${segment.text}`).join("\n")}

## C. 字幕版腳本
${s.subtitle_script.map((line) => `- ${line}`).join("\n")}

## D. 口播版腳本
${s.spoken_script}

## E. 分鏡表
| 時間 | 畫面描述 | 口播 | 字卡 | B-roll | 圖像生成提示詞 |
|---|---|---|---|---|---|
${s.storyboard.map((row) => `| ${row.time} | ${row.visual} | ${row.voice} | ${row.card} | ${row.broll} | ${row.prompt} |`).join("\n")}

## F. 封面標題
${s.cover_titles.map((t) => `- ${t}`).join("\n")}

## G. IG 貼文文案
${s.ig_caption}

## H. 留言引導
${s.comment_guides.map((g) => `- ${g}`).join("\n")}

## 優化建議
${s.quality.join("\n")}`;
}

function formatCarousel(c) {
  return `# 連播圖文｜${c.topic}

內容目標：${c.content_goal}
目標受眾：${c.audience}
風格：${c.style}
CTA：${c.cta}

${c.pages.map((p) => `## 第 ${p.page} 頁｜${p.role}
主標題：${p.title}
副標題：${p.subtitle}
內文：${p.body}
視覺建議：${p.visual}
圖像提示詞：${p.prompt}
字幕或版面建議：${p.layout}
頁尾文字：${p.footer}`).join("\n\n")}

## IG 貼文文案
${c.caption}

## 優化建議
${c.quality.join("\n")}`;
}

function formatSocialCopy(c) {
  return `# 社群文案｜${c.topic}

目標受眾：${c.audience}
內容目標：${c.content_goal}
CTA：${c.cta}

## IG 文案
${c.instagram_caption}

## Threads 文案
${c.threads_copy.join("\n\n---\n\n")}

## 限動互動題
投票題：
${c.story_poll.map((x) => `- ${x}`).join("\n")}

問答箱：
${c.story_question.map((x) => `- ${x}`).join("\n")}

二選一互動：
${c.story_either.map((x) => `- ${x}`).join("\n")}

測驗題：
${c.story_quiz.map((x) => `- ${x}`).join("\n")}

引導私訊：
${c.story_dm.map((x) => `- ${x}`).join("\n")}

## 留言後私訊話術
${c.dm_script}`;
}

function parseDuration(length) {
  const matched = String(length).match(/\d+/);
  return matched ? Number(matched[0]) : 60;
}

function scriptTopicProfile(topic, audience) {
  const profile = {
    pain: "努力控制飲食，卻還是很難穩定下降",
    scene: "忙碌上班族在下班後看著手機外送畫面",
    misconception: "只要再少吃、再忍耐就會變好",
    root: "飲食安排、壓力、睡眠和飽足感沒有配合生活節奏",
    example: "中午只吃澱粉和青菜，下午靠咖啡撐，晚上回家就很想吃高熱量食物",
    action: "先記錄三天的用餐時間、蛋白質、壓力和嘴饞時間",
    broll: "外送 APP、辦公桌、便當、手機備忘錄",
    firstStep: "先找出最常破功的那一餐或那個時段"
  };
  if (topic.includes("壓力") || topic.includes("情緒")) {
    return {
      ...profile,
      pain: "白天忍得住，晚上或壓力大時就想用吃來放鬆",
      scene: "上班族晚上回家坐在餐桌前，一邊滑手機一邊想點外送",
      misconception: "壓力大亂吃就是意志力太差",
      root: "壓力累積、白天吃得不穩和情緒補償同時出現",
      example: "早餐趕時間、午餐隨便吃，下午累到想喝甜的，晚上就很難停在剛好的份量",
      action: "先把下午到晚上的壓力和飢餓程度記下來，不要一開始就硬戒",
      broll: "加班畫面、外送 APP、冰箱、疲憊表情、手機備忘錄",
      firstStep: "先處理最容易爆食前的那個壓力時段"
    };
  }
  if (topic.includes("外食")) {
    return {
      ...profile,
      pain: "每天外食，不知道怎麼選才不會越吃越卡",
      scene: "上班族站在便當店或超商前，猶豫要選哪一餐",
      misconception: "外食族減脂只能吃水煮餐或完全不碰澱粉",
      root: "餐點選擇不是只有熱量，還要看蛋白質、蔬菜、醬料和晚餐飢餓感",
      example: "午餐吃乾麵加手搖，晚上再吃便當，很容易蛋白質不足但總熱量偏高",
      action: "先用一個順序選餐：蛋白質先到位，再補蔬菜，最後調整澱粉和醬料",
      broll: "便當店、超商餐盒、蛋白質食物、醬料分開、餐盤特寫",
      firstStep: "先把每餐的蛋白質補到比較穩"
    };
  }
  if (topic.includes("停滯")) {
    return {
      ...profile,
      pain: "明明有控制，體重卻卡住好幾週",
      scene: "上班族早上站上體重計，看著數字沒有變化",
      misconception: "停滯期一定要吃更少或運動更多",
      root: "身體壓力、睡眠、活動量下降和飲食紀錄落差都可能讓進度變慢",
      example: "平日吃很少，週末補回來；或工作忙到步數下降，自己卻沒有發現",
      action: "先檢查七天平均，不只看單日體重，也看步數、睡眠和週末飲食",
      broll: "體重計、行事曆、步數畫面、餐點紀錄、睡眠紀錄",
      firstStep: "先看七天趨勢，不要只看今天的體重"
    };
  }
  if (topic.includes("復胖")) {
    return {
      ...profile,
      pain: "瘦下來後沒多久又回到原本的生活",
      scene: "衣櫃前試穿以前的褲子，表情有點挫折",
      misconception: "復胖代表之前努力都失敗了",
      root: "方法太靠短期限制，沒有變成可以長期維持的生活策略",
      example: "體驗期很認真，但一回到聚餐、外食、加班，就沒有可執行的替代方案",
      action: "先找出復胖前最先鬆掉的是早餐、外食、睡眠還是壓力",
      broll: "衣櫃、聚餐、加班、行事曆、餐點選擇",
      firstStep: "把最容易鬆掉的生活環節先補起來"
    };
  }
  return profile;
}

function hookOptionsFor(topic, audience, goal, style, profile) {
  const styleHooks = {
    "打臉迷思型": [
      `${topic}卡住，不一定是你不夠努力`,
      `先別再怪意志力，${topic}可能卡在這裡`,
      `${profile.misconception}，這句話可能讓你更卡`
    ],
    "自我檢查型": [
      `有這 3 個狀況，難怪${topic}很卡`,
      `${audience}先檢查這 3 件事`,
      `你不是沒努力，可能是卡點看錯了`
    ],
    "情境共鳴型": [
      `你是不是也有這種減重的一天？`,
      `白天很努力，晚上卻又破功？`,
      `${audience}最常不是輸在方法，是輸在生活節奏`
    ],
    "客戶案例型": [
      `有位客人一直以為自己吃太多`,
      `他卡住 2 個月，問題不是晚餐`,
      `一個${audience}的減脂卡點案例`
    ],
    "故事型": [
      `減重最累的，常常不是食物本身`,
      `你以為是一餐吃錯，其實是一整天累積`,
      `這是很多${audience}的真實日常`
    ],
    "二選一互動型": [
      `你是白天忍住型，還是晚上破功型？`,
      `你比較像外食卡住，還是壓力卡住？`,
      `留言 1 或 2，我猜你卡在哪`
    ],
    "專業口播": [
      `${topic}先看一個關鍵觀念`,
      `${audience}減脂要先懂這件事`,
      `不是少吃就好，重點是策略能不能穩定`
    ]
  };
  const hooks = styleHooks[style] || styleHooks["專業口播"];
  if (goal === "轉換型") hooks[2] = `想找出${topic}真正卡點，先做這個檢查`;
  return hooks.map((h) => trimText(h, 30));
}

function scriptSegments(topic, audience, goal, seconds, style, cta, profile, selectedHook) {
  const timings = segmentTimings(seconds);
  const builders = templateBuilders(topic, audience, profile, cta);
  const key = builders[style] ? style : "專業口播";
  return timings.map((timing, index) => {
    const part = builders[key][index] || builders["專業口播"][index];
    return {
      ...timing,
      text: adaptSegmentText(part(timing, selectedHook, goal), timing.label, seconds, profile, topic, audience)
    };
  });
}

function adaptSegmentText(text, label, seconds, profile, topic, audience) {
  if (seconds === 30) {
    const concise = {
      "痛點": `${profile.pain}，通常不是你不努力，而是前面幾個環節已經累積到很難控制。`,
      "核心觀念": `${topic}要看的不是單一食物，而是${profile.root}。`,
      "生活例子": `像${profile.example}，最後破功只是結果。`,
      "行動建議": `先做一件事：${profile.firstStep}。`,
      "CTA": text
    };
    return concise[label] || text;
  }
  if (seconds === 45) {
    if (label === "生活例子") return `${text} 你不用一次改全部，先抓最常重複的那個模式就好。`;
    if (label === "行動建議") return `${text} 重點不是記得很完美，而是看出哪個時間點最容易失控。`;
    return text;
  }
  if (seconds === 90) {
    const expanded = {
      "痛點": `${text} 這種狀況很常見，尤其是${audience}，不是沒有想改，而是每天的選擇太多、恢復時間太少。`,
      "核心觀念": `${text} 所以真正有效的做法，通常不是再加一條更嚴格的規則，而是先找出哪個環節最容易讓你失去穩定度。`,
      "生活例子": `${text} 如果你只檢討最後那一餐，可能會覺得自己很糟；但如果往前看，會發現身體其實已經餓、累、緊繃一整天。`,
      "行動建議": `${text} 你也可以順手標記 1 到 5 分：當天壓力幾分、飢餓幾分、睡眠幾分。三天後通常會看出一個很明顯的規律。`,
      "CTA": `${text} 如果你有疾病、懷孕、用藥或飲食疾患狀況，請先和專業醫療人員確認適合的方式。`
    };
    return expanded[label] || text;
  }
  return text;
}

function segmentTimings(seconds) {
  const maps = {
    30: [
      ["開頭", "0-3秒"],
      ["痛點", "3-8秒"],
      ["核心觀念", "8-17秒"],
      ["生活例子", "17-24秒"],
      ["行動建議", "24-28秒"],
      ["CTA", "28-30秒"]
    ],
    45: [
      ["開頭", "0-3秒"],
      ["痛點", "3-10秒"],
      ["核心觀念", "10-23秒"],
      ["生活例子", "23-34秒"],
      ["行動建議", "34-41秒"],
      ["CTA", "41-45秒"]
    ],
    60: [
      ["開頭", "0-3秒"],
      ["痛點", "3-10秒"],
      ["核心觀念", "10-25秒"],
      ["生活例子", "25-40秒"],
      ["行動建議", "40-55秒"],
      ["CTA", "55-60秒"]
    ],
    90: [
      ["開頭", "0-3秒"],
      ["痛點", "3-14秒"],
      ["核心觀念", "14-34秒"],
      ["生活例子", "34-56秒"],
      ["行動建議", "56-78秒"],
      ["CTA", "78-90秒"]
    ]
  };
  return (maps[seconds] || maps[60]).map(([label, time]) => ({ label, time }));
}

function templateBuilders(topic, audience, profile, cta) {
  const ctaLine = `${cta}，我會把減脂能量測驗傳給你，先找出你現在比較像哪一種卡點。`;
  return {
    "打臉迷思型": [
      () => `${profile.misconception}，這可能是${audience}最容易被卡住的一句話。`,
      () => `很多人遇到${profile.pain}，第一個反應就是更少吃、再忍一下，但這樣常常只會讓下一次破功更大。`,
      () => `真正要看的不是某一餐完不完美，而是你的方法能不能放進生活。${profile.root}，才是${topic}常見的核心。`,
      () => `例如：${profile.example}。表面看起來是晚上吃太多，其實前面幾個小環節已經把你推到很難控制。`,
      () => `你可以先做一件事：${profile.action}。先看見模式，再調整策略，不需要一開始就把自己逼到很緊。`,
      () => ctaLine
    ],
    "自我檢查型": [
      () => `如果你有這 3 個狀況，${topic}卡住可能不是單一飲食問題。`,
      () => `第一，${profile.pain}；第二，明明知道該控制，忙起來還是很難執行；第三，一卡住就想把方法變得更極端。`,
      () => `這通常代表你需要看的不是意志力，而是${profile.root}。卡點不同，調整順序也會不同。`,
      () => `像${audience}常見狀況是：${profile.example}。如果只看最後一餐，就會誤判真正原因。`,
      () => `第一步先做自我檢查：最近三天最常破功的時間、當時壓力、上一餐內容，以及睡眠狀態。`,
      () => ctaLine
    ],
    "情境共鳴型": [
      () => `你是不是也有這種一天？`,
      () => `${profile.scene}。你其實不是不想變好，只是那一刻真的很累，很想用吃的讓自己放鬆一下。`,
      () => `所以${topic}不要只用「我不夠自律」解釋。很多時候，是${profile.root}一起影響，讓你越到晚上越難穩。`,
      () => `例如：${profile.example}。這不是一個壞習慣而已，而是一整天累積後的結果。`,
      () => `先不用急著戒掉全部。你可以從「${profile.firstStep}」開始，讓下一次比較容易停下來。`,
      () => ctaLine
    ],
    "客戶案例型": [
      () => `之前有一位客人，也覺得自己${topic}很嚴重。`,
      () => `他原本以為問題是自己太愛吃，尤其看到${profile.scene}這種情境，就覺得一定是意志力不好。`,
      () => `但解析後發現，真正卡住的是${profile.root}。他不是沒有努力，而是努力的地方沒有打到核心。`,
      () => `他的狀況很像這樣：${profile.example}。所以我們不是叫他硬忍，而是先調整最容易失控前的安排。`,
      () => `後來方向變成：${profile.action}。先讓生活穩一點，減脂才比較能接得住。`,
      () => ctaLine
    ],
    "故事型": [
      () => `減重最累的，常常不是食物本身。`,
      () => `對${audience}來說，真正困難的是每天都很忙，還要一直做選擇。遇到${profile.pain}，很容易覺得自己又失敗了。`,
      () => `但如果把一天攤開來看，你會發現${topic}常常不是單點問題，而是${profile.root}一路累積。`,
      () => `像這種情境：${profile.example}。最後爆掉的那一刻，只是結果，不一定是真正原因。`,
      () => `所以今天先不要追求完美，先抓一個最容易調整的地方：「${profile.firstStep}」。`,
      () => ctaLine
    ],
    "二選一互動型": [
      () => `你比較像 1，白天忍住晚上破功；還是 2，平日控制週末失控？`,
      () => `如果你是 1，常見卡點是壓力和飽足感；如果你是 2，可能是平日限制太緊，週末身心都想補回來。`,
      () => `兩種都不是單純不自律，而是${topic}背後的原因不同。${profile.root}，都會影響你能不能穩定。`,
      () => `例如：${profile.example}。同樣是吃多，但前面的觸發點不一樣，解法也不一樣。`,
      () => `你可以留言 1 或 2，也可以先記錄三天，看自己是哪一種模式比較常出現。`,
      () => ctaLine
    ],
    "專業口播": [
      () => `${topic}先記住一個觀念：減脂不是只看一餐，而是看整體策略能不能穩定。`,
      () => `${audience}常見的困難是${profile.pain}。這時候如果只靠忍耐，通常會越來越累。`,
      () => `比較好的做法是拆解原因：${profile.root}。你要先知道哪一個最影響你，才知道從哪裡調整。`,
      () => `例如：${profile.example}。這時候如果只怪晚餐，可能會忽略白天其實沒有吃穩。`,
      () => `建議先做：${profile.action}。資料不用完美，但要能幫你看出重複模式。`,
      () => ctaLine
    ]
  };
}

function subtitleLinesFromSegments(segments) {
  return segments.flatMap((segment) => splitSubtitle(segment.text));
}

function splitSubtitle(text) {
  return text
    .split(/[。！？；]/)
    .map((s) => s.trim().replace(/^例如：/, "例如："))
    .filter(Boolean)
    .flatMap((sentence) => {
      if (sentence.length <= 18) return [sentence];
      const chunks = [];
      for (let i = 0; i < sentence.length; i += 18) {
        chunks.push(sentence.slice(i, i + 18));
      }
      return chunks;
    });
}

function storyboardFor(topic, audience, segments, cta, style, profile) {
  const visuals = [
    [profile.scene, "近景，人物表情自然疲憊但不負面", trimText(segments[0]?.text || topic, 14), profile.broll],
    ["教練對鏡頭口播，背景乾淨，有生活化小道具", "中近景，語氣像聊天", trimText(segments[1]?.text || "不是不自律", 14), "辦公桌、便當、咖啡"],
    ["白板或平板顯示三個卡點：飲食、壓力、睡眠", "固定鏡頭，搭配手勢指向重點", "先找真正卡點", "簡單流程圖、便條紙"],
    ["生活化 B-roll 呈現一天飲食與壓力累積", "快切但不急躁", "一整天累積", profile.broll],
    ["手機備忘錄記錄三天觀察項目", "俯拍，畫面留白", "先記錄三天", "手機、日曆、筆記"],
    ["教練微笑收尾，旁邊留 CTA 字卡空間", "正面中景，語速放慢", trimText(cta, 14), "乾淨背景、品牌色字卡"]
  ];
  return segments.map((segment, index) => {
    const [visual, camera, card, broll] = visuals[index] || visuals.at(-1);
    return {
      time: segment.time,
      visual,
      voice: segment.text,
      card,
      broll,
      rhythm: index === 0 ? "開頭停頓半秒，第一句直接丟痛點。" : index === segments.length - 1 ? "CTA 前留一個短停頓，語氣放柔。" : "自然口語，句子之間保留換氣點。",
      prompt: `9:16, realistic Asian office worker and health coach, scene: ${visual}, audience: ${audience}, topic: ${topic}, emotion: understood and calm, camera: ${camera}, clean composition, warm natural light, soft green and orange health brand palette, professional lifestyle video still, no misspelled text, no excessive text in image`
    };
  });
}

function legacySegments(s) {
  return [
    { label: "開頭", time: "0-3秒", text: s.hook_options?.[0] || "" },
    { label: "痛點", time: "3-10秒", text: "你可能白天都很努力控制，但一到晚上或壓力大，就開始想補償自己。" },
    { label: "核心觀念", time: "10-25秒", text: "減脂卡住常常不是單一食物造成，而是生活節奏、壓力、外食選擇和飽足感沒有配合。" },
    { label: "生活例子", time: "25-40秒", text: "像常外食的人，如果午餐蛋白質太少，下午靠咖啡撐，晚上就更容易嘴饞。" },
    { label: "行動建議", time: "40-55秒", text: "先不要急著更少吃，先記錄三天：外食、壓力、睡眠、嘴饞時間。" },
    { label: "CTA", time: "55-60秒", text: `${s.cta}，我提供減脂能量測驗，幫你找出最深的原因。` }
  ];
}

function igCaption(topic, audience, cta) {
  return `${audience}減脂最容易卡住的地方，常常不是「知道太少」，而是生活太忙、壓力太大，方法很難穩定執行。\n\n以${topic}來說，與其一開始就更少吃，不如先看自己是哪個環節最容易破功：外食選擇、蛋白質不足、晚上嘴饞、睡眠不足，還是壓力補償。\n\n先找出根源，策略才會比較適合你。\n\n${cta}，我提供減脂能量測驗，幫你先看卡點在哪。`;
}

function dmScript(type, topic) {
  const map = {
    "留言「測驗」": `嗨，我看到你留言「測驗」了。\n\n我先傳你減脂能量測驗，這個不是要判斷你做得好不好，而是幫你看現在比較像外食型、壓力型、停滯型，還是作息型。\n\n你最近最卡的是外食、晚上嘴饞，還是體重停住？`,
    "留言「我也瘦不下來」": `我懂，那種明明有努力但看不到變化，真的會很挫折。\n\n先不用急著再少吃，我會比較想先知道你是卡在外食、壓力、睡眠，還是方法太難持續。\n\n你願意先說說最近最困擾你的狀況嗎？`,
    "留言「外食很難控制」": `真的，外食族最難的不是不知道要健康，而是每天能選的東西就那些。\n\n我可以先用測驗幫你看，你比較需要調整份量、蛋白質，還是點餐順序。\n\n你通常午餐比較常吃便當、麵類，還是超商？`,
    "留言「壓力大就亂吃」": `我懂，壓力大的時候，吃東西常常像是在讓自己喘一口氣。\n\n這不代表你不自律，很多時候是身體和情緒都在找補償。\n\n你比較常在下午想吃甜，還是晚上回家後停不下來？`,
    "留言「我都復胖」": `復胖很常見，不代表你之前都白做了。\n\n通常要看的不是只看體重，而是那套方法有沒有辦法放進你的生活。\n\n你上一次復胖，比較像是工作變忙、壓力變大，還是停止控制後反彈？`,
    "留言「想了解」": `可以，我先簡單跟你說明。\n\n我通常會先用減脂能量測驗看你的卡點，再安排 10 到 15 分鐘解析，確認適合從哪裡開始。\n\n你現在比較想先了解測驗，還是想知道三天體驗怎麼進行？`,
    "看完限動投票後私訊": `我看到你剛剛有回限動。\n\n你選的狀況其實很常見，尤其是${topic}卡住時，很容易以為只能靠意志力撐。\n\n你要不要先做個小測驗？我可以幫你看比較像哪一型。`
  };
  return map[type] || map["留言「測驗」"];
}

function qualityCheck(hook, cta, audience, body, seconds = 60, segments = []) {
  const issues = [];
  const bodyLength = body.replace(/\s/g, "").length;
  const minLength = seconds === 30 ? 85 : seconds === 45 ? 130 : seconds === 90 ? 230 : 175;
  const maxLength = seconds === 30 ? 210 : seconds === 45 ? 300 : seconds === 90 ? 620 : 430;
  issues.push(hook.length <= 24 ? "Hook 長度 OK，適合 3 秒內丟出。" : "Hook 偏長，建議壓到 24 字內。");
  issues.push(cta ? "CTA 明確，可引導留言或私訊。" : "缺少 CTA，建議補上留言「測驗」或私訊引導。");
  issues.push(audience ? "有具體受眾，內容較容易被對號入座。" : "受眾不明，建議指定外食族、久坐族或壓力型受眾。");
  issues.push(/保證|一定瘦|治療|診斷|神奇|快速瘦/.test(body) ? "偵測到可能過度承諾或醫療化字眼，建議改成較保守說法。" : "未偵測到保證療效、醫療診斷或身材羞辱語氣。");
  issues.push(bodyLength < minLength ? `口播偏短，${seconds} 秒版本建議再補一個具體情境或例子。` : bodyLength > maxLength ? `口播偏長，${seconds} 秒版本建議刪掉一個解釋句。` : `口播長度符合 ${seconds} 秒版本。`);
  issues.push(segments.length >= 6 ? "結構完整：開頭、痛點、核心觀念、例子、行動建議、CTA 都有出現。" : "段落不足，建議補齊完整短影音結構。");
  issues.push(/核心|策略|節奏|卡點/.test(body) && /例如|像/.test(body) ? "有觀念也有生活例子，不會太像教科書。" : "建議加入更生活化例子，避免只講觀念。");
  issues.push(body.length > 900 ? "內容較長，手機閱讀時可拆成更短句。" : "文字長度適合手機閱讀。");
  issues.push("遇到疾病、懷孕、用藥或飲食疾患，請在實際溝通中建議尋求專業醫療人員協助。");
  return issues;
}

function recommendations() {
  const byTopic = groupedStats("topic");
  const sorted = Object.entries(byTopic).sort((a, b) => b[1].dm - a[1].dm);
  const best = sorted[0]?.[0] || "壓力與減脂";
  const weak = sorted.at(-1)?.[0] || "尚無足夠資料";
  const adPick = topBy(state.performance_metrics.filter((m) => !m.is_ad && m.dm_count >= 10), "dm_count", 1)[0];
  return `
    <h3>內容建議</h3>
    <div class="list">
      <div class="notice">下週建議加強：${best}。這類內容目前較容易帶來私訊或測驗留言。</div>
      <div class="item"><strong>建議減少或重寫</strong><span class="muted">${weak} 的成效較弱，建議換 Hook 或改成更具體情境。</span></div>
      <div class="item"><strong>表現好的 Hook 類型</strong><span class="muted">優先測試自我檢查、情境共鳴、打臉迷思。</span></div>
      <div class="item"><strong>CTA 檢查</strong><span class="muted">若私訊低但收藏高，可把 CTA 從預約解析改成留言「測驗」。</span></div>
      <div class="item"><strong>適合投放廣告</strong><span class="muted">${adPick ? adPick.title : "目前建議先累積 3 到 5 篇自然高互動內容再投放。"}</span></div>
    </div>
  `;
}

function rankingBlock(title, rows, key) {
  return `<h3>${title}</h3><div class="list">${rows.map((r, i) => `<div class="item"><strong>${i + 1}. ${r.title}</strong><span class="muted">${r.topic}｜${r.content_format}｜${key}：${number(r[key])}</span></div>`).join("") || `<p class="muted">尚無資料。</p>`}</div>`;
}

function analysisTable(title, key) {
  const data = groupedStats(key);
  const rows = Object.entries(data).map(([name, s]) => `<tr><td>${name}</td><td>${number(Math.round(s.reach / s.count))}</td><td>${number(Math.round(s.engagement / s.count))}</td><td>${number(Math.round(s.dm / s.count))}</td><td>${number(Math.round(s.booking / s.count))}</td><td>${number(Math.round(s.sales / s.count))}</td></tr>`).join("");
  return `<h3>${title}</h3><div class="table-wrap"><table><thead><tr><th>分類</th><th>平均觸及</th><th>平均互動</th><th>平均私訊</th><th>平均預約</th><th>平均成交</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function hookAnalysis() {
  const rows = state.settings.hookTypes.map((type) => {
    const items = state.performance_metrics.filter((m) => hookGuess(m.hook) === type);
    const reach = avg(items, "reach");
    const dm = avg(items, "dm_count");
    return `<tr><td>${type}</td><td>${number(Math.round(reach))}</td><td>${number(Math.round(dm))}</td><td>${items.length}</td></tr>`;
  }).join("");
  return `<h3>Hook 分析</h3><div class="table-wrap"><table><thead><tr><th>Hook 類型</th><th>平均觸及</th><th>平均私訊</th><th>樣本數</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function groupedStats(key) {
  return state.performance_metrics.reduce((acc, m) => {
    const name = m[key] || "未分類";
    if (!acc[name]) acc[name] = { count: 0, reach: 0, engagement: 0, dm: 0, booking: 0, sales: 0 };
    acc[name].count++;
    acc[name].reach += Number(m.reach || 0);
    acc[name].engagement += Number(m.likes || 0) + Number(m.comments || 0) + Number(m.shares || 0) + Number(m.saves || 0);
    acc[name].dm += Number(m.dm_count || 0);
    acc[name].booking += Number(m.booking_count || 0);
    acc[name].sales += Number(m.trial_sales_count || 0);
    return acc;
  }, {});
}

function calc(m) {
  const engagement = Number(m.likes || 0) + Number(m.comments || 0) + Number(m.shares || 0) + Number(m.saves || 0);
  return {
    engagementRate: safeDiv(engagement, m.reach),
    dmRate: safeDiv(m.dm_count, m.reach),
    bookingRate: safeDiv(m.booking_count, m.dm_count),
    salesRate: safeDiv(m.trial_sales_count, m.booking_count),
    leadCost: safeDiv(m.ad_spend, m.dm_count),
    bookingCost: safeDiv(m.ad_spend, m.booking_count),
    salesCost: safeDiv(m.ad_spend, m.trial_sales_count)
  };
}

function addCalendarRow() {
  state.content_calendar.push({
    id: uid("cal"),
    date: formatDate(addDays(TODAY, state.content_calendar.length)),
    platform: "Instagram",
    content_id: uid("idea"),
    title: "新的內容",
    content_format: "短影音",
    content_goal: "流量型",
    topic: "減重迷思",
    audience: "30 歲以上上班族",
    hook: "你以為減不下來是因為不夠努力？",
    angle: "用生活情境拆解減脂卡點。",
    cta: "留言「測驗」",
    ad_suitable: false,
    status: "靈感",
    notes: ""
  });
  save();
  render();
}

function editCalendar(index, key, value) {
  state.content_calendar[index][key] = value;
  save();
}

function exportCalendarCsv() {
  download("content-calendar.csv", toCsv(state.content_calendar));
}

function exportMetricsCsv() {
  const rows = state.performance_metrics.map((m) => ({ ...m, ...calc(m) }));
  download("performance-metrics.csv", toCsv(rows));
}

function copyMarkdown(type) {
  if (type === "calendar") {
    const md = `# 一週內容排程\n\n| 日期 | 形式 | 目標 | 受眾 | 主題 | 標題 | Hook | CTA | 平台 | 廣告 |\n|---|---|---|---|---|---|---|---|---|---|\n${state.content_calendar.map((r) => `| ${r.date} | ${r.content_format} | ${r.content_goal} | ${r.audience} | ${r.topic} | ${r.title} | ${r.hook} | ${r.cta} | ${r.platform} | ${r.ad_suitable ? "是" : "否"} |`).join("\n")}`;
    navigator.clipboard.writeText(md);
  }
}

function copyCurrentOutput() {
  navigator.clipboard.writeText(document.getElementById("generatorOutput").textContent);
}

function resetDemo() {
  localStorage.removeItem(STORE_KEY);
  state = loadState();
  render();
}

function toCsv(rows) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  return [headers.join(","), ...rows.map((row) => headers.map((h) => `"${String(row[h] ?? "").replaceAll('"', '""')}"`).join(","))].join("\n");
}

function download(name, text) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function selectField(id, label, options, selected, cls) {
  return `<div class="field ${cls}"><label for="${id}">${label}</label><select id="${id}">${options.map((o) => `<option ${String(o) === String(selected) ? "selected" : ""}>${o}</option>`).join("")}</select></div>`;
}

function inputField(id, label, type, value, cls) {
  return `<div class="field ${cls}"><label for="${id}">${label}</label><input id="${id}" type="${type}" value="${escapeHtml(String(value))}"></div>`;
}

function textareaField(id, label, value, cls) {
  return `<div class="field ${cls}"><label for="${id}">${label}</label><textarea id="${id}">${escapeHtml(String(value))}</textarea></div>`;
}

function multiTextField(id, label, value, cls) {
  return inputField(id, label, "text", value, cls);
}

function selectInline(options, selected, onchange) {
  return `<select onchange="${onchange}">${options.map((o) => `<option ${String(o) === String(selected) ? "selected" : ""}>${o}</option>`).join("")}</select>`;
}

function val(id) {
  return document.getElementById(id)?.value || "";
}

function numVal(id) {
  return Number(val(id) || 0);
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function sum(rows, key) {
  return rows.reduce((acc, row) => acc + Number(row[key] || 0), 0);
}

function avg(rows, key) {
  return rows.length ? sum(rows, key) / rows.length : 0;
}

function safeDiv(a, b) {
  return Number(b || 0) === 0 ? 0 : Number(a || 0) / Number(b || 0);
}

function topBy(rows, key, count) {
  return [...rows].sort((a, b) => Number(b[key] || 0) - Number(a[key] || 0)).slice(0, count);
}

function number(value) {
  return Number(value || 0).toLocaleString("zh-TW");
}

function money(value) {
  return value ? `$${Math.round(value).toLocaleString("zh-TW")}` : "$0";
}

function pct(value) {
  return `${Math.round(Number(value || 0) * 1000) / 10}%`;
}

function currentWeekMetrics() {
  const start = formatDate(TODAY);
  const end = formatDate(addDays(TODAY, 7));
  return state.performance_metrics.filter((m) => m.publish_date >= start && m.publish_date < end);
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]));
}

function trimText(text, max) {
  return text.length > max ? text.slice(0, max - 1) : text;
}

function pickAudience(topic, i) {
  if (topic.includes("外食")) return "常外食族";
  if (topic.includes("壓力") || topic.includes("情緒")) return "壓力大會亂吃的人";
  if (topic.includes("停滯")) return "反覆減重失敗者";
  if (topic.includes("復胖")) return "容易復胖的人";
  if (topic.includes("40")) return "中年後覺得代謝變差的人";
  return defaults.audiences[i % defaults.audiences.length];
}

function hookFor(topic, audience, goal) {
  if (goal === "流量型") return `${topic}卡住，可能不是你不夠努力`;
  if (goal === "共鳴型") return `你是不是也覺得${topic}越努力越累？`;
  if (goal === "專業型") return `${topic}先看這 3 個關鍵`;
  if (goal === "互動型") return `你是外食型，還是壓力型？`;
  return `想找出${topic}的真正卡點嗎？`;
}

function titleFor(topic, goal, audience) {
  const map = {
    "流量型": `${topic}最常見的 3 個誤會`,
    "共鳴型": `${audience}減脂卡住的一天`,
    "專業型": `${topic}不是少吃就好，先看這 3 點`,
    "互動型": `你是哪一種減脂卡點？`,
    "轉換型": `找出你${topic}卡住的根源`
  };
  return map[goal] || `${topic}內容`;
}

function angleFor(topic, goal, audience) {
  return `從${audience}的真實生活情境切入，用簡單語言說明${topic}，最後引導做測驗找卡點。`;
}

function hookTypeFromGoal(goal) {
  return { "流量型": "打臉迷思", "共鳴型": "情境共鳴", "專業型": "專業解析", "互動型": "二選一互動", "轉換型": "自我檢查" }[goal] || "情境共鳴";
}

function normalizeHookType(style) {
  if (style.includes("打臉")) return "打臉迷思";
  if (style.includes("檢查")) return "自我檢查";
  if (style.includes("案例") || style.includes("故事")) return "故事案例";
  if (style.includes("情境")) return "情境共鳴";
  if (style.includes("二選一")) return "二選一互動";
  return "專業解析";
}

function hookGuess(hook) {
  if (/不是|誤會|以為/.test(hook)) return "打臉迷思";
  if (/3|三|檢查|狀況/.test(hook)) return "自我檢查";
  if (/客人|案例|之前/.test(hook)) return "故事案例";
  if (/你是不是|一天|白天|晚上/.test(hook)) return "情境共鳴";
  if (/還是|1|2|哪一種/.test(hook)) return "二選一互動";
  return "專業解析";
}

function carouselTitle(topic, role, audience) {
  const map = {
    "強 Hook 封面": `${topic}卡住，不一定是你不努力`,
    "痛點共鳴": `${audience}最常遇到的狀況`,
    "打破錯誤認知": `先別只怪意志力`,
    "解釋真正原因": `真正要看的是生活節奏`,
    "生活化例子": `用一天的選擇來看`,
    "簡單行動建議": `先做一個小調整`,
    "補充檢查清單": `你可以檢查這 3 件事`
  };
  return map[role] || `${topic}延伸`;
}

function carouselSubtitle(topic, role) {
  const map = {
    "強 Hook 封面": `很多人卡住，不是因為不努力，而是卡在錯的問題上。`,
    "痛點共鳴": `如果你總是白天控制、晚上破功，先別急著怪自己。`,
    "打破錯誤認知": `${topic}不是靠更硬撐就會變穩。`,
    "解釋真正原因": `壓力、外食、睡眠和飽足感常常一起影響。`,
    "生活化例子": `把一天拆開看，才知道破功點在哪。`,
    "簡單行動建議": `先找出最常失控的時間點。`,
    "補充檢查清單": `越具體，越容易調整。`
  };
  return map[role] || "";
}

function carouselBody(topic, role, audience) {
  const map = {
    "強 Hook 封面": `如果你一直覺得${topic}很卡，先不用急著把方法變得更極端。真正該看的，是目前策略有沒有符合你的生活。`,
    "痛點共鳴": `${audience}常常不是不知道怎麼吃，而是忙起來只能快速選擇，壓力一大就更難穩定。`,
    "打破錯誤認知": `減脂不是每天都完美，而是大多數日子能回到穩定節奏。一直靠忍耐，很容易反彈。`,
    "解釋真正原因": `${topic}通常跟一整天的安排有關：早餐、午餐蛋白質、下午疲勞、晚上壓力釋放。`,
    "生活化例子": `午餐只吃澱粉，下午靠咖啡撐，晚上回家很餓，就容易把外送點多。這不是單一餐的問題。`,
    "簡單行動建議": `先記錄三天：哪一餐最不穩、哪個時間最想吃、睡眠和壓力如何。先看見，再調整。`,
    "補充檢查清單": `1. 蛋白質夠不夠\n2. 晚上是否太餓\n3. 壓力是否靠吃補償`
  };
  return map[role] || `${topic}可以從更適合你的方法開始。`;
}

render();
