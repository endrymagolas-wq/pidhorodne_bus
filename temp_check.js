
// в”Ђв”Ђ Route definitions в”Ђв”Ђ
const routes = {
  pidg: { code: 'РџС–РґРі', name: 'РџС–РґРіРѕСЂРѕРґРЅРµ', icon: 'рџџў', pill: 'pill-pidg' },
  drag: { code: 'Р”СЂР°Рі', name: 'Р”СЂР°РіР°РЅС–РІРєР°', icon: 'рџ”µ', pill: 'pill-drag' },
  zab:  { code: 'Р—Р°Р±',  name: 'Р—Р°Р±РѕР№РєРё',    icon: 'рџџЎ', pill: 'pill-zab' },
  dom:  { code: 'Р”РѕРј',  name: 'Р”РѕРјР°РјРѕСЂРёС‡',  icon: 'рџџЈ', pill: 'pill-dom' }
};

// в”Ђв”Ђ Stop configurations в”Ђв”Ђ
const stopsConfig = {
  'to-pidg': [
    { id: 'as2',         name: 'РђРЎ-2',         sub: 'РІСѓР». Р‘С–Р»РѕРіС–СЂСЃСЊРєР°',    offset: 0 },
    { id: 'zbruch',      name: 'Р—Р±СЂСѓС‡',         sub: 'РІСѓР». РўРѕСЂРіРѕРІРёС†СЏ',     offset: 2 },
    { id: 'halychyna',   name: 'Р“Р°Р»РёС‡РёРЅР°',      sub: 'Р”Р°РјР±Р° / РІСѓР». Р СѓСЃСЊРєР°', offset: 4, approx: true },
    { id: 'mcdonalds',   name: "McDonald's",    sub: 'РўР°РЅРє / РІСѓР». РњР°Р·РµРїРё', offset: 6 },
    { id: 'berezhanska', name: 'Р‘РµСЂРµР¶Р°РЅСЃСЊРєР°',   sub: 'Р—РЈРќРЈ / РІРёС—Р·Рґ',      offset: 8 },
    { id: 'verhnya',     name: 'Р’РµСЂС…РЅСЏ Р·СѓРї.',   sub: 'РџРѕРІРѕСЂРѕС‚ / E50',      offset: 13, approx: true },
    { id: 'nizhnya',     name: 'РќРёР¶РЅСЏ Р·СѓРї.',    sub: 'Р¦РµРЅС‚СЂ СЃРµР»Р°',         offset: 17 },
  ],
  'to-tern': [
    { id: 'nizhnya',     name: 'РќРёР¶РЅСЏ Р·СѓРї.',    sub: 'Р¦РµРЅС‚СЂ СЃРµР»Р°',         offset: 0 },
    { id: 'verhnya',     name: 'Р’РµСЂС…РЅСЏ Р·СѓРї.',   sub: 'РџРѕРІРѕСЂРѕС‚ / E50',      offset: 4, approx: true },
    { id: 'berezhanska', name: 'Р‘РµСЂРµР¶Р°РЅСЃСЊРєР°',   sub: 'Р—РЈРќРЈ',               offset: 9 },
    { id: 'mcdonalds',   name: "McDonald's",    sub: 'РўР°РЅРє / РІСѓР». РњР°Р·РµРїРё', offset: 11 },
    { id: 'halychyna',   name: 'Р“Р°Р»РёС‡РёРЅР°',      sub: 'Р”Р°РјР±Р° / РІСѓР». Р СѓСЃСЊРєР°', offset: 14, approx: true },
    { id: 'zbruch',      name: 'Р—Р±СЂСѓС‡',         sub: 'РІСѓР». РўРѕСЂРіРѕРІРёС†СЏ',     offset: 16 },
    { id: 'as2',         name: 'РђРЎ-2',          sub: 'РІСѓР». Р‘С–Р»РѕРіС–СЂСЃСЊРєР°',   offset: 20 },
  ]
};

const destOffset = { 'to-pidg': 17, 'to-tern': 20 };
const destName = { 'to-pidg': 'РќРёР¶РЅСЏ Р·СѓРї.', 'to-tern': 'РђРЎ-2' };

const scheduleToPidg = [
  {t:"06:30",r:"drag"},{t:"06:40",r:"pidg"},{t:"06:45",r:"zab"},
  {t:"07:10",r:"drag"},{t:"07:25",r:"dom"},{t:"07:45",r:"pidg"},
  {t:"07:50",r:"drag"},{t:"08:15",r:"zab"},{t:"08:40",r:"pidg"},
  {t:"08:40",r:"drag"},{t:"09:30",r:"drag"},{t:"09:40",r:"zab"},
  {t:"10:15",r:"pidg"},{t:"10:30",r:"drag"},{t:"11:30",r:"zab"},
  {t:"11:45",r:"drag"},{t:"11:55",r:"dom"},{t:"12:00",r:"pidg"},
  {t:"13:00",r:"drag"},{t:"13:45",r:"pidg"},{t:"14:00",r:"zab"},
  {t:"14:15",r:"drag"},{t:"14:55",r:"dom"},{t:"15:10",r:"pidg"},
  {t:"15:30",r:"drag"},{t:"15:45",r:"zab"},{t:"16:30",r:"drag"},
  {t:"16:40",r:"pidg"},{t:"17:30",r:"drag"},{t:"17:45",r:"zab"},
  {t:"17:55",r:"dom"},{t:"18:00",r:"pidg"},{t:"18:30",r:"drag"},
  {t:"19:20",r:"pidg"},{t:"19:30",r:"zab"},{t:"19:30",r:"drag"},
  {t:"20:15",r:"drag"}
];

const scheduleToTern = [
  {t:"07:00",r:"drag"},{t:"07:05",r:"pidg"},{t:"07:20",r:"zab"},
  {t:"07:40",r:"drag"},{t:"08:05",r:"dom"},{t:"08:10",r:"pidg"},
  {t:"08:20",r:"drag"},{t:"08:50",r:"zab"},{t:"09:10",r:"pidg"},
  {t:"09:10",r:"drag"},{t:"10:00",r:"drag"},{t:"10:15",r:"zab"},
  {t:"10:45",r:"pidg"},{t:"11:00",r:"drag"},{t:"12:05",r:"zab"},
  {t:"12:15",r:"drag"},{t:"12:30",r:"pidg"},{t:"12:35",r:"dom"},
  {t:"13:30",r:"drag"},{t:"14:15",r:"pidg"},{t:"14:35",r:"zab"},
  {t:"14:45",r:"drag"},{t:"15:35",r:"dom"},{t:"15:40",r:"pidg"},
  {t:"15:50",r:"drag"},{t:"16:20",r:"zab"},{t:"16:50",r:"drag"},
  {t:"17:10",r:"pidg"},{t:"17:50",r:"drag"},{t:"18:20",r:"zab"},
  {t:"18:30",r:"pidg"},{t:"18:35",r:"dom"},{t:"18:50",r:"drag"},
  {t:"19:45",r:"pidg"},{t:"19:50",r:"drag"},{t:"20:05",r:"zab"}
];

// в”Ђв”Ђ Telegram Haptic & State в”Ђв”Ђ
function tgHaptic(type = 'light') {
  try {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
      const hf = window.Telegram.WebApp.HapticFeedback;
      if (type === 'selection') hf.selectionChanged();
      else if (type === 'success' || type === 'warning' || type === 'error') hf.notificationOccurred(type);
      else hf.impactOccurred(type);
      return;
    }
  } catch(e) {}
  if (navigator.vibrate) {
    try {
      if (type === 'selection') navigator.vibrate(8);
      else if (type === 'success') navigator.vibrate([15, 30, 20]);
      else navigator.vibrate(15);
    } catch(e) {}
  }
}

let curDir = 'to-pidg';
let curFilter = 'all';
let selectedStops = { 'to-pidg': 'mcdonalds', 'to-tern': 'nizhnya' };
try {
  const savedStops = localStorage.getItem('selectedStops_v2');
  if (savedStops) {
    const parsed = JSON.parse(savedStops);
    if (parsed['to-pidg']) selectedStops['to-pidg'] = parsed['to-pidg'];
    if (parsed['to-tern']) selectedStops['to-tern'] = parsed['to-tern'];
  }
} catch(e) {}

let liveReports = [];
let isDriverMode = localStorage.getItem('isDriverMode') === 'true';
let driverPin = localStorage.getItem('driverPin') || '';
let myLastReportId = null;

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('driver') === '4400' || urlParams.get('driver') === '2026') {
  isDriverMode = true;
  driverPin = '4400';
  localStorage.setItem('isDriverMode', 'true');
  localStorage.setItem('driverPin', '4400');
}

// в”Ђв”Ђ Helpers в”Ђв”Ђ
function toMin(t) { const [h,m] = t.split(':').map(Number); return h*60+m; }
function toTime(n) { const mod = (n%1440+1440)%1440; return `${String(Math.floor(mod/60)).padStart(2,'0')}:${String(mod%60).padStart(2,'0')}`; }

function getStopOffset() {
  const stops = stopsConfig[curDir];
  const sel = selectedStops[curDir];
  const s = stops.find(s => s.id === sel);
  return s ? s.offset : 0;
}

function getStopInfo() {
  const stops = stopsConfig[curDir];
  return stops.find(s => s.id === selectedStops[curDir]) || stops[0];
}

function busTimeAtStop(bus) {
  return toTime(toMin(bus.t) + getStopOffset());
}

function busTimeAtDest(bus) {
  return toTime(toMin(bus.t) + destOffset[curDir]);
}

function busMinAtStop(bus) {
  return toMin(bus.t) + getStopOffset();
}

// в”Ђв”Ђ Open-Meteo Weather Fetcher в”Ђв”Ђ
async function fetchWeather() {
  try {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=49.55&longitude=25.59&current=temperature_2m,weather_code&timezone=Europe%2FKyiv');
    const data = await res.json();
    if (data && data.current) {
      const temp = Math.round(data.current.temperature_2m);
      const code = data.current.weather_code;
      let iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
      let desc = 'РЇСЃРЅРѕ';
      if (code >= 51 && code <= 67) {
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg>';
        desc = 'Р”РѕС‰';
      } else if (code >= 71 && code <= 77) {
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10 20-1.25-2.5-2.5 1.25"></path><path d="M14 20l1.25-2.5 2.5 1.25"></path><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>';
        desc = 'РЎРЅС–Рі';
      } else if (code >= 80 && code <= 82) {
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg>';
        desc = 'Р—Р»РёРІР°';
      } else if (code >= 95) {
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline></svg>';
        desc = 'Р“СЂРѕР·Р°';
      } else if (code === 1 || code === 2 || code === 3) {
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>';
        desc = 'РњС–РЅР»РёРІР° С…РјР°СЂРЅС–СЃС‚СЊ';
      } else if (code === 0) {
        desc = 'РЇСЃРЅРѕ';
      }

      document.getElementById('weather-icon').innerHTML = iconSvg;
      document.getElementById('weather-desc').textContent = `${desc} (РўРµСЂРЅРѕРїС–Р»СЊ)`;
      document.getElementById('weather-temp').textContent = `${temp > 0 ? '+' : ''}${temp}В°C`;
    }
  } catch(e) {
    document.getElementById('weather-desc').textContent = 'РџС–РґРіРѕСЂРѕРґРЅРµ / РўРµСЂРЅРѕРїС–Р»СЊ';
  }
}

// в”Ђв”Ђ Live Reports API в”Ђв”Ђ
async function fetchLiveReports() {
  try {
    const res = await fetch('/bus/api/status');
    const data = await res.json();
    if (data && data.ok) {
      liveReports = data.reports || [];
      updateHeroStatus();
      renderSchedule();
      if (isDriverMode && driverViewMode === 'cockpit') {
        renderDriverCockpit();
      }
    }
  } catch(e) {}
}

function getResolvedTripReport(dir, tripTime, routeType) {
  const matches = liveReports.filter(r => r.direction === dir && r.trip_time === tripTime && r.route_type === routeType);
  if (!matches.length) return null;

  const driverRep = matches.find(r => r.report_type === 'driver');
  if (driverRep) return driverRep;

  const seenRep = matches.find(r => r.report_type === 'passenger' && r.status === 'seen');
  if (seenRep) return seenRep;

  return matches[0];
}

function isTripCancelled(dir, tripTime, routeType) {
  const rep = getResolvedTripReport(dir, tripTime, routeType);
  return rep && rep.report_type === 'driver' && rep.status === 'cancelled';
}

// в”Ђв”Ђ Stop selector rendering в”Ђв”Ђ
function renderStops() {
  const row = document.getElementById('stop-row');
  const stops = stopsConfig[curDir];
  const sel = selectedStops[curDir];
  row.innerHTML = stops.map(s => {
    const isSel = s.id === sel;
    const offsetLabel = s.offset === 0 ? 'РїРѕС‡Р°С‚РѕРє' : `+${s.offset}С…РІ`;
    return `
      <button class="stop-chip ${isSel ? 'active' : ''}" onclick="selectStop('${s.id}')">
        <span class="stop-name">${s.approx ? '~' : ''}${s.name}</span>
        <span class="stop-sub">${s.sub} (${offsetLabel})</span>
      </button>
    `;
  }).join('');

  // Header stays clean вЂ” stop info shown in stop-row and hero card
  // if (!isDriverMode || driverViewMode === 'passenger') {
  //   const si = getStopInfo();
  //   const subEl = document.getElementById('header-sub');
  //   if (subEl) subEl.textContent = `РџРѕСЃР°РґРєР°: ${si.name} (${si.sub})`;
  // }
}

function selectStop(id) {
  selectedStops[curDir] = id;
  try {
    localStorage.setItem('selectedStops_v2', JSON.stringify(selectedStops));
  } catch(e) {}
  tgHaptic('selection');
  renderStops();
  updateAll();
}

function updateDirIndicator() {
  requestAnimationFrame(() => {
    const bar = document.querySelector('.dir-segmented-control');
    const ind = document.getElementById('dir-segment-indicator');
    const activeBtn = document.querySelector('.dir-seg-btn.active');
    if (!bar || !ind || !activeBtn) return;
    const barRect = bar.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const left = btnRect.left - barRect.left;
    const width = btnRect.width;
    ind.style.transform = `translateX(${left}px)`;
    ind.style.width = `${width}px`;
  });
}

function setDirection(dir) {
  curDir = dir;
  tgHaptic('selection');
  const bPidg = document.getElementById('btn-dir-to-pidg');
  const bTern = document.getElementById('btn-dir-to-tern');
  if (bPidg) bPidg.classList.toggle('active', dir === 'to-pidg');
  if (bTern) bTern.classList.toggle('active', dir === 'to-tern');
  updateDirIndicator();

  const origEl = document.getElementById('header-origin');
  const destEl = document.getElementById('header-dest');
  if (origEl && destEl) {
    if (dir === 'to-pidg') {
      origEl.textContent = 'РўРµСЂРЅРѕРїС–Р»СЊ';
      destEl.textContent = 'РџС–РґРіРѕСЂРѕРґРЅРµ';
    } else {
      origEl.textContent = 'РџС–РґРіРѕСЂРѕРґРЅРµ';
      destEl.textContent = 'РўРµСЂРЅРѕРїС–Р»СЊ';
    }
  }

  renderStops();
  updateAll();
}

function setFilter(f, el) {
  curFilter = f;
  tgHaptic('selection');
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  renderSchedule();
}

// в”Ђв”Ђ Collapsible Route Picker в”Ђв”Ђ
const routePickerLabels = {
  all: 'Р’СЃС– РјР°СЂС€СЂСѓС‚РєРё',
  pidg: '<span class="route-badge-dot dot-pidg" style="width:8px;height:8px;display:inline-block;margin-right:6px;vertical-align:middle;"></span>РџС–РґРіРѕСЂРѕРґРЅРµ',
  drag: '<span class="route-badge-dot dot-drag" style="width:8px;height:8px;display:inline-block;margin-right:6px;vertical-align:middle;"></span>Р”СЂР°РіР°РЅС–РІРєР°',
  zab: '<span class="route-badge-dot dot-zab" style="width:8px;height:8px;display:inline-block;margin-right:6px;vertical-align:middle;"></span>Р—Р°Р±РѕР№РєРё',
  dom: '<span class="route-badge-dot dot-dom" style="width:8px;height:8px;display:inline-block;margin-right:6px;vertical-align:middle;"></span>Р”РѕРјР°РјРѕСЂРёС‡'
};

let isRoutePickerOpen = false;
function toggleRoutePicker() {
  isRoutePickerOpen = !isRoutePickerOpen;
  const toggle = document.getElementById('route-picker-toggle');
  const dropdown = document.getElementById('route-picker-dropdown');
  if (!toggle || !dropdown) return;
  toggle.classList.toggle('open', isRoutePickerOpen);
  dropdown.style.display = isRoutePickerOpen ? 'block' : 'none';
  tgHaptic('selection');
}

function pickRoute(filter, el) {
  curFilter = filter;
  tgHaptic('impact_light');

  // Update active state in dropdown
  document.querySelectorAll('.route-pick-opt').forEach(o => o.classList.remove('active'));
  if (el) el.classList.add('active');

  // Update toggle label
  const labelEl = document.getElementById('route-picker-label');
  if (labelEl) labelEl.innerHTML = routePickerLabels[filter] || routePickerLabels.all;

  // Auto-close
  isRoutePickerOpen = false;
  const toggle = document.getElementById('route-picker-toggle');
  const dropdown = document.getElementById('route-picker-dropdown');
  if (toggle) toggle.classList.remove('open');
  if (dropdown) dropdown.style.display = 'none';

  renderSchedule();
  updateAll();
}

function updateClock() {
  const now = new Date();
  document.getElementById('live-clock').textContent =
    now.toLocaleTimeString('uk-UA', { hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false });
}

function getList() {
  const raw = curDir === 'to-pidg' ? scheduleToPidg : scheduleToTern;
  if (curFilter === 'all') return raw;
  return raw.filter(b => b.r === curFilter);
}

// Auto-skip cancelled trips in hero countdown for passengers & return upcoming departures
function findNext() {
  const now = new Date();
  const cur = now.getHours()*60 + now.getMinutes();
  const list = getList();
  const offset = getStopOffset();
  let next = null, tomorrow = false;
  const upcoming = [];

  const validTrips = isDriverMode ? list : list.filter(b => !isTripCancelled(curDir, b.t, b.r));
  const pool = validTrips.length ? validTrips : list;

  for (let i = 0; i < pool.length; i++) {
    const atStop = toMin(pool[i].t) + offset;
    if (atStop >= cur) {
      next = pool[i];
      for (let j = i + 1; j < Math.min(i + 4, pool.length); j++) {
        upcoming.push(pool[j]);
      }
      break;
    }
  }
  if (!next && pool.length) {
    next = pool[0];
    tomorrow = true;
    for (let j = 1; j < Math.min(4, pool.length); j++) {
      upcoming.push(pool[j]);
    }
  }
  return { next, following: upcoming[0] || null, upcoming, tomorrow, cur };
}

// в”Ђв”Ђ Hero Status Badge Update в”Ђв”Ђ
function updateHeroStatus() {
  const container = document.getElementById('hero-status-container');
  const { next } = findNext();
  if (!next) { container.innerHTML = ''; return; }

  const rep = getResolvedTripReport(curDir, next.t, next.r);
  if (!rep) {
    container.innerHTML = '';
    return;
  }

  if (rep.report_type === 'driver') {
    const timeStr = rep.created_at ? rep.created_at.slice(11, 16) : '';
    if (rep.status === 'ok') {
      const stopStr = rep.stop_name && rep.stop_name !== 'base'
        ? `РїСЂРѕС—С…Р°РІ В«${rep.stop_name}В» ${timeStr ? '(' + timeStr + ')' : ''}`
        : 'РїС–РґС‚РІРµСЂРґРёРІ РІРёС—Р·Рґ РЅР° Р»С–РЅС–СЋ';
      container.innerHTML = `<div class="status-badge badge-driver-ok">рџ‘ЁвЂЌвњ€пёЏ РћС„С–С†С–Р№РЅРѕ РІС–Рґ РІРѕРґС–СЏ: ${stopStr}</div>`;
    } else if (rep.status === 'cancelled') {
      container.innerHTML = `<div class="status-badge badge-driver-cancel">вќЊ Р’РѕРґС–Р№: СЂРµР№СЃ СЃРєР°СЃРѕРІР°РЅРѕ</div>`;
    } else if (rep.status === 'delayed_10') {
      container.innerHTML = `<div class="status-badge badge-driver-delay">вЏі Р’РѕРґС–Р№ РїРѕРІС–РґРѕРјР»СЏС”: Р·Р°С‚СЂРёРјРєР° +5вЂ“10 С…РІ ${timeStr ? '(' + timeStr + ')' : ''}</div>`;
    }
  } else if (rep.report_type === 'passenger') {
    if (rep.status === 'seen') {
      container.innerHTML = `<div class="status-badge badge-seen">рџ‘Ґ РџР°СЃР°Р¶РёСЂРё РЅР° Р·СѓРїРёРЅС†С–: Р°РІС‚РѕР±СѓСЃ С—РґРµ / РЅР° Р»С–РЅС–С—</div>`;
    } else if (rep.status === 'delayed') {
      container.innerHTML = `<div class="status-badge badge-delayed">рџ‘Ґ РџР°СЃР°Р¶РёСЂРё РїРѕРІС–РґРѕРјР»СЏСЋС‚СЊ: Р·Р°С‚СЂРёРјРєР° ~2вЂ“5 С…РІ</div>`;
    } else if (rep.status === 'missing') {
      container.innerHTML = `<div class="status-badge badge-missing">вќ“ РќР° Р·СѓРїРёРЅС†С– С‰Рµ РѕС‡С–РєСѓСЋС‚СЊ Р°РІС‚РѕР±СѓСЃ</div>`;
    }
  }
}

let isLadderExpanded = false;
function toggleLadderExpand() {
  isLadderExpanded = !isLadderExpanded;
  tgHaptic('selection');
  const ladder = document.getElementById('hero-route-ladder');
  const hint = document.getElementById('ladder-expand-hint');
  if (ladder) ladder.style.display = isLadderExpanded ? 'flex' : 'none';
  if (hint) hint.textContent = isLadderExpanded ? 'Р·РіРѕСЂРЅСѓС‚Рё в–ґ' : 'СЂРѕР·РіРѕСЂРЅСѓС‚Рё в–ѕ';
}

function renderRouteLadder(trip) {
  const ladder = document.getElementById('hero-route-ladder');
  if (!ladder || !trip) return;

  const stops = stopsConfig[curDir];
  const tripProg = getDriverTripProgress(curDir, trip.t, trip.r);
  const baseMin = toMin(trip.t);
  const myStopId = selectedStops[curDir];

  let foundCurrent = false;
  let html = '';

  stops.forEach((s, idx) => {
    const isPassed = Boolean(tripProg.passedMap[s.name]);
    const isMyStop = s.id === myStopId;
    let isCurrent = false;

    if (!isPassed && !foundCurrent && (tripProg.status === 'ok' || Object.keys(tripProg.passedMap).length > 0)) {
      isCurrent = true;
      foundCurrent = true;
    }

    const t = toTime(baseMin + s.offset);
    const passTime = tripProg.passedMap[s.name];

    let stepClass = 'ladder-step';
    if (isPassed) stepClass += ' passed';
    if (isCurrent) stepClass += ' current';
    if (isMyStop) stepClass += ' my-stop';

    html += `
      <div class="${stepClass}">
        <div class="ladder-spine">
          <div class="ladder-dot"></div>
          <div class="ladder-line"></div>
        </div>
        <div class="ladder-info">
          <div class="ladder-name-wrap">
            <span class="ladder-name">${s.name}</span>
            ${isMyStop ? '<span class="ladder-badge">Р’Р°С€Р° РїРѕСЃР°РґРєР°</span>' : ''}
            ${isCurrent ? '<span class="ladder-badge" style="background:rgba(46,196,119,0.2);color:#2ec477;border-color:rgba(46,196,119,0.35);">РќР°СЃС‚СѓРїРЅР°</span>' : ''}
          </div>
          <span class="ladder-time">${isPassed ? `вњ“ ${passTime}` : (s.approx ? '~' : '') + t}</span>
        </div>
      </div>
    `;
  });

  ladder.innerHTML = html;
}

function scrollToTrip(timeStr) {
  tgHaptic('light');
  const allRows = document.querySelectorAll('.bus-row');
  for (let row of allRows) {
    if (row.textContent.includes(timeStr)) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row.style.boxShadow = '0 0 0 2px var(--accent)';
      setTimeout(() => { row.style.boxShadow = ''; }, 1600);
      break;
    }
  }
}

// в”Ђв”Ђ Hero Card в”Ђв”Ђ
function updateHero() {
  const { next, following, upcoming, tomorrow, cur } = findNext();
  if (!next) return;

  const r = routes[next.r];
  const atStop = busMinAtStop(next);
  let diff = tomorrow ? (1440 - cur + atStop) : (atStop - cur);

  // 1. Relative countdown as prominent title
  const relValEl = document.getElementById('hero-rel-time');
  if (relValEl) {
    if (diff <= 0) relValEl.textContent = 'РІС–РґРїСЂР°РІР»СЏС”С‚СЊСЃСЏ Р·Р°СЂР°Р·!';
    else if (diff === 1) relValEl.textContent = 'С‡РµСЂРµР· 1 С…РІРёР»РёРЅСѓ';
    else if (diff < 60) relValEl.textContent = `С‡РµСЂРµР· ${diff} С…РІ`;
    else relValEl.textContent = `С‡РµСЂРµР· ${Math.floor(diff/60)} РіРѕРґ ${diff%60} С…РІ`;
  }

  // 2. Countdown Badge
  const cdBadge = document.getElementById('hero-countdown-badge');
  if (cdBadge) {
    if (diff <= 5) {
      cdBadge.textContent = 'С‚РµСЂРјС–РЅРѕРІРѕ';
      cdBadge.className = 'countdown-badge cd-urgent';
    } else if (diff <= 20) {
      cdBadge.textContent = 'СЃРєРѕСЂРѕ';
      cdBadge.className = 'countdown-badge cd-soon';
    } else {
      cdBadge.textContent = 'Р·Р° СЂРѕР·РєР»Р°РґРѕРј';
      cdBadge.className = 'countdown-badge cd-far';
    }
  }

  // 3. Progress fill
  const progressFill = document.getElementById('hero-progress-fill');
  if (progressFill) {
    const pct = Math.max(4, Math.min(100, Math.round(((30 - Math.min(30, diff)) / 30) * 100)));
    progressFill.style.width = `${pct}%`;
    progressFill.classList.toggle('urgent', diff <= 10);
  }

  // 4. Exact departure time with delay detection
  const normalTime = busTimeAtStop(next);
  const rep = getResolvedTripReport(curDir, next.t, next.r);
  const isDelayed = rep && (rep.status === 'delayed_10' || rep.status === 'delayed');
  const delayMins = rep && rep.status === 'delayed_10' ? 10 : 4;
  const delayedTime = toTime(toMin(normalTime) + delayMins);

  const clockEl = document.getElementById('hero-exact-clock');
  if (clockEl) {
    if (isDelayed) {
      clockEl.innerHTML = `<span class="bus-time-struck">${normalTime}</span> <span style="color:var(--yellow);font-weight:800;">вћ” ${delayedTime} (+${delayMins} С…РІ)</span>`;
    } else {
      clockEl.innerHTML = `<span>рџ•’ Рѕ ${normalTime}</span>`;
    }
  }

  const stopInfo = getStopInfo();
  const stopEl = document.getElementById('hero-exact-stop');
  if (stopEl) stopEl.textContent = `вЂў РїРѕСЃР°РґРєР°: В«${stopInfo.name}В»`;

  document.getElementById('hero-label').textContent = tomorrow ? 'РџР•Р РЁРР™ РђР’РўРћР‘РЈРЎ Р—РђР’РўР Рђ' : 'РќРђР™Р‘Р›РР–Р§РР™ РђР’РўРћР‘РЈРЎ';
  document.getElementById('hero-route').innerHTML = `
    <span class="pill ${r.pill}"><span class="pill-dot"></span><span>${r.name}</span></span>`;

  updateHeroStatus();
  renderRouteLadder(next);

  // 5. Upcoming Departures Micro-Feed
  const upChipsEl = document.getElementById('hero-upcoming-chips');
  if (upChipsEl) {
    if (upcoming && upcoming.length) {
      upChipsEl.innerHTML = upcoming.map(u => {
        const ur = routes[u.r];
        const uAtStop = busMinAtStop(u);
        const uDiff = tomorrow ? (1440 - cur + uAtStop) : (uAtStop - cur);
        const uDiffStr = uDiff < 60 ? `С‡РµСЂРµР· ${uDiff} С…РІ` : `С‡РµСЂРµР· ${Math.floor(uDiff/60)}Рі ${uDiff%60}С…РІ`;
        return `
          <div class="hero-up-chip" onclick="scrollToTrip('${u.t}')">
            <span class="pill pill-sm ${ur.pill}"><span class="pill-dot"></span><span>${ur.code}</span></span>
            <span class="hero-up-time">${busTimeAtStop(u)}</span>
            <span class="hero-up-rel">${uDiffStr}</span>
          </div>
        `;
      }).join('');
    } else {
      upChipsEl.innerHTML = '<span style="font-size:11.5px;color:var(--text-tertiary);padding:4px 0;">Р‘С–Р»СЊС€Рµ СЂРµР№СЃС–РІ СЃСЊРѕРіРѕРґРЅС– РЅРµРјР°С”</span>';
    }
  }
}

let showPastTrips = false;

function togglePastTrips() {
  showPastTrips = !showPastTrips;
  renderSchedule();
}

function renderBusRow(b, isPast, isCurrent, offset, dName, isAtDest) {
  const r = routes[b.r];
  const timeAtStop = busTimeAtStop(b);
  const timeAtDest = busTimeAtDest(b);

  const rep = getResolvedTripReport(curDir, b.t, b.r);
  const isCancelled = rep && rep.report_type === 'driver' && rep.status === 'cancelled';
  const isDelayed = rep && (rep.status === 'delayed_10' || rep.status === 'delayed');
  const delayMins = rep && rep.status === 'delayed_10' ? 10 : 4;
  const delayedTime = toTime(toMin(timeAtStop) + delayMins);

  let subText = '';
  if (isCancelled) {
    subText = 'РЎРљРђРЎРћР’РђРќРћ Р’РћР”Р†Р„Рњ';
  } else if (rep && rep.report_type === 'driver' && rep.status === 'ok') {
    const timeStr = rep.created_at ? rep.created_at.slice(11, 16) : '';
    if (rep.stop_name && rep.stop_name !== 'base') {
      subText = `рџ‘ЁвЂЌвњ€пёЏ Р’РѕРґС–Р№: РїСЂРѕС—С…Р°РІ ${rep.stop_name} ${timeStr ? '(' + timeStr + ')' : ''}`;
    } else {
      subText = 'рџ‘ЁвЂЌвњ€пёЏ Р’РѕРґС–Р№: РЅР° Р»С–РЅС–С— Р·Р° СЂРѕР·РєР»Р°РґРѕРј';
    }
  } else if (rep && rep.report_type === 'driver' && rep.status === 'delayed_10') {
    subText = 'рџ‘ЁвЂЌвњ€пёЏ Р’РѕРґС–Р№: Р·Р°С‚СЂРёРјРєР° ~10 С…РІ';
  } else if (rep && rep.report_type === 'passenger') {
    if (rep.status === 'seen') subText = 'рџ‘Ґ РџР°СЃР°Р¶РёСЂРё Р±Р°С‡РёР»Рё Р°РІС‚РѕР±СѓСЃ';
    else if (rep.status === 'delayed') subText = 'рџ‘Ґ РџРѕРІС–РґРѕРјР»РµРЅРѕ РїСЂРѕ Р·Р°С‚СЂРёРјРєСѓ ~3 С…РІ';
    else if (rep.status === 'missing') subText = 'рџ‘Ґ РћС‡С–РєСѓСЋС‚СЊ РЅР° Р·СѓРїРёРЅС†С–';
  } else if (!isAtDest) {
    subText = `в†’ ${dName} ~${timeAtDest}`;
  } else {
    const startName = curDir === 'to-pidg' ? 'РђРЎ-2' : 'РќРёР¶РЅСЏ';
    subText = `Р· ${startName} ${b.t}`;
  }

  let timeHtml = `<span class="bus-time">${timeAtStop}</span>`;
  if (isCancelled) {
    timeHtml = `
      <span class="bus-time" style="text-decoration:line-through;color:var(--red);">${timeAtStop}</span>
      <span class="bus-cancelled-tag">РЎРєР°СЃРѕРІР°РЅРѕ</span>
    `;
  } else if (isDelayed) {
    timeHtml = `
      <div class="bus-time-delayed-wrap">
        <span class="bus-time-struck">${timeAtStop}</span>
        <span class="bus-time-new">${delayedTime}</span>
        <span class="bus-delay-tag">+${delayMins}С…РІ</span>
      </div>
    `;
  }

  return `
    <div class="bus-row ${isPast ? 'past' : ''} ${isCurrent ? 'current' : ''} ${isCancelled ? 'cancelled' : ''}">
      <div class="bus-left">
        <div class="bus-time-col">
          ${timeHtml}
          <span class="bus-subtime">${subText}</span>
        </div>
        <span class="pill ${r.pill}"><span class="pill-dot"></span><span>${r.code}</span></span>
      </div>
      <div class="bus-right">
        <span class="bus-route-name">${r.name}</span>
      </div>
    </div>`;
}

// в”Ђв”Ђ Schedule List в”Ђв”Ђ
function renderSchedule() {
  const container = document.getElementById('schedule-container');
  const list = getList();
  const { next, tomorrow, cur } = findNext();
  const offset = getStopOffset();
  const dName = destName[curDir];
  const stopInfo = getStopInfo();
  const isAtDest = (curDir === 'to-pidg' && stopInfo.id === 'nizhnya') ||
                   (curDir === 'to-tern' && stopInfo.id === 'as2');

  const pastItems = [];
  const periods = [
    { label: 'Р Р°РЅРѕРє', items: [] },
    { label: 'Р”РµРЅСЊ', items: [] },
    { label: 'Р’РµС‡С–СЂ', items: [] }
  ];

  list.forEach(b => {
    const atStop = toMin(b.t) + offset;
    const isPast = !tomorrow && atStop < cur;
    if (isPast) {
      pastItems.push(b);
    } else {
      if (atStop < 720) periods[0].items.push(b);
      else if (atStop < 990) periods[1].items.push(b);
      else periods[2].items.push(b);
    }
  });

  let html = '';

  // 1. Collapsible Past Trips section
  if (pastItems.length > 0) {
    html += `
      <div class="past-accordion">
        <button class="past-accordion-btn" onclick="togglePastTrips()">
          <span style="display:flex;align-items:center;gap:7px;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>РњРёРЅСѓР»С– СЂРµР№СЃРё СЃСЊРѕРіРѕРґРЅС–</span>
            <span class="past-acc-badge">${pastItems.length}</span>
          </span>
          <span style="font-size:12px;color:var(--accent);font-weight:700;">
            ${showPastTrips ? 'РџСЂРёС…РѕРІР°С‚Рё в–ґ' : 'РџРѕРєР°Р·Р°С‚Рё в–ѕ'}
          </span>
        </button>
        <div class="past-accordion-content" style="display: ${showPastTrips ? 'flex' : 'none'};">
          ${pastItems.map(b => renderBusRow(b, true, false, offset, dName, isAtDest)).join('')}
        </div>
      </div>
    `;
  }

  // 2. Active / Upcoming periods
  periods.forEach(p => {
    if (!p.items.length) return;
    html += `<div class="period-label">${p.label}</div><div class="bus-list">`;

    p.items.forEach(b => {
      const isCurrent = next && b.t === next.t && b.r === next.r && !tomorrow;
      html += renderBusRow(b, false, isCurrent, offset, dName, isAtDest);
    });
    html += '</div>';
  });

  // If tomorrow and periods are empty
  if (tomorrow && periods.every(p => p.items.length === 0) && next) {
    html += `
      <div class="period-label">Р—Р°РІС‚СЂР° РІСЂР°РЅС†С–</div>
      <div class="bus-list">
        ${renderBusRow(next, false, true, offset, dName, isAtDest)}
      </div>
    `;
  }

  container.innerHTML = html;
}

// в”Ђв”Ђ Web Share API в”Ђв”Ђ
async function shareBusTrip() {
  const { next } = findNext();
  if (!next) return;
  const stopInfo = getStopInfo();
  const time = busTimeAtStop(next);
  const r = routes[next.r];
  const shareText = `рџљЊ РђРІС‚РѕР±СѓСЃ РЅР° ${r.name} Р±СѓРґРµ РЅР° Р·СѓРїРёРЅС†С– В«${stopInfo.name}В» Рѕ ${time}!\nРћРЅР»Р°Р№РЅ-СЂРѕР·РєР»Р°Рґ: ${window.location.origin}/bus`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: `РђРІС‚РѕР±СѓСЃ РЅР° ${r.name}`,
        text: shareText,
        url: `${window.location.origin}/bus`
      });
    } catch(e) {}
  } else {
    navigator.clipboard.writeText(shareText);
    alert('рџ“‹ Р†РЅС„РѕСЂРјР°С†С–СЋ РїСЂРѕ СЂРµР№СЃ СЃРєРѕРїС–Р№РѕРІР°РЅРѕ РІ Р±СѓС„РµСЂ РѕР±РјС–РЅСѓ!');
  }
}

// в”Ђв”Ђ Add to Calendar (.ics generation) в”Ђв”Ђ
function addTripToCalendar() {
  const { next, tomorrow } = findNext();
  if (!next) return;
  const stopInfo = getStopInfo();
  const time = busTimeAtStop(next);
  const r = routes[next.r];

  const now = new Date();
  if (tomorrow) now.setDate(now.getDate() + 1);

  const [hours, minutes] = time.split(':').map(Number);
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
  const endDate = new Date(startDate.getTime() + 20 * 60000);

  const pad = n => String(n).padStart(2, '0');
  const formatICSDate = d => `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Pidhorodne Bus//UA',
    'BEGIN:VEVENT',
    `SUMMARY:рџљЊ РђРІС‚РѕР±СѓСЃ: ${r.name}`,
    `DESCRIPTION:РџРѕСЃР°РґРєР° РЅР° Р·СѓРїРёРЅС†С– ${stopInfo.name} (${stopInfo.sub}) Рѕ ${time}. РќР°РїСЂСЏРјРѕРє: ${curDir === 'to-pidg' ? 'РџС–РґРіРѕСЂРѕРґРЅРµ' : 'РўРµСЂРЅРѕРїС–Р»СЊ'}.`,
    `LOCATION:${stopInfo.name}, РўРµСЂРЅРѕРїС–Р»СЊ`,
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT10M',
    'ACTION:DISPLAY',
    'DESCRIPTION:РќР°РіР°РґСѓРІР°РЅРЅСЏ: Р°РІС‚РѕР±СѓСЃ Р·Р° 10 С…РІРёР»РёРЅ!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `bus_${time.replace(':','')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// в”Ђв”Ђ Passenger Report Flow в”Ђв”Ђ
async function sendPassengerReport(statusVal) {
  const { next } = findNext();
  if (!next) return;
  const stopInfo = getStopInfo();
  closeModal('report-modal');

  try {
    const res = await fetch('/bus/api/report-passenger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        direction: curDir,
        trip_time: next.t,
        route_type: next.r,
        status: statusVal,
        stop_name: stopInfo.name
      })
    });
    const data = await res.json();
    if (data.ok) {
      myLastReportId = data.report_id;
      const statusLabels = {
        'seen': 'РђРІС‚РѕР±СѓСЃ РїСЂРёР±СѓРІ / С—РґРµ',
        'delayed': 'Р—Р°С‚СЂРёРјРєР° 2вЂ“5 С…РІ',
        'missing': 'РђРІС‚РѕР±СѓСЃР° РґРѕРІРіРѕ РЅРµРјР°С”'
      };

      document.getElementById('my-report-text').textContent = `Р’Рё РІРєР°Р·Р°Р»Рё: В«${statusLabels[statusVal]}В»`;
      document.getElementById('my-report-notice').classList.add('active');

      fetchLiveReports();
    }
  } catch(e) {
    alert('РџРѕРјРёР»РєР° РЅР°РґСЃРёР»Р°РЅРЅСЏ.');
  }
}

async function undoMyReport() {
  if (!myLastReportId) return;
  try {
    const res = await fetch('/bus/api/cancel-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ report_id: myLastReportId })
    });
    const data = await res.json();
    if (data.ok) {
      myLastReportId = null;
      document.getElementById('my-report-notice').classList.remove('active');
      fetchLiveReports();
    }
  } catch(e) {}
}

// в”Ђв”Ђ Dedicated Driver Navigator Cockpit Logic в”Ђв”Ђ
let driverViewMode = 'cockpit'; // 'cockpit' or 'passenger'
let drvRoute = localStorage.getItem('drvRoute') || 'pidg';
let drvDir = 'to-pidg';
let drvSelectedTrip = null;
let showDrvPassedStops = false;

function toggleDrvPassedStops() {
  showDrvPassedStops = !showDrvPassedStops;
  renderDriverCockpit();
}

function loginDriver() {
  const pin = document.getElementById('driver-pin-input').value.trim();
  if (pin === '4400' || pin === '2026') {
    isDriverMode = true;
    driverPin = pin;
    localStorage.setItem('isDriverMode', 'true');
    localStorage.setItem('driverPin', pin);
    closeModal('driver-modal');
    applyDriverMode();
    alert('рџ‘ЁвЂЌвњ€пёЏ РђРІС‚РѕСЂРёР·Р°С†С–СЏ СѓСЃРїС–С€РЅР°! РџСѓР»СЊС‚ РІРѕРґС–СЏ Р°РєС‚РёРІРѕРІР°РЅРѕ.');
  } else {
    alert('РќРµРІС–СЂРЅРёР№ PIN-РєРѕРґ! РЎРїСЂРѕР±СѓР№С‚Рµ С‰Рµ СЂР°Р·.');
  }
}

function applyDriverMode() {
  const drvBtn = document.getElementById('tab-nav-driver');
  const bar = document.getElementById('driver-mode-bar');
  if (drvBtn) drvBtn.style.display = isDriverMode ? 'inline-flex' : 'none';
  if (bar) bar.style.display = isDriverMode ? 'flex' : 'none';

  if (isDriverMode) {
    switchDriverView('cockpit');
  } else {
    switchDriverView('passenger');
  }
  syncBottomBarState();
  updateDockIndicator();
}

let currentActiveTab = 'tab-nav-schedule';

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
}

function openModal(id) {
  // Always close other open modals to prevent layering/stacking conflicts
  document.querySelectorAll('.modal-overlay').forEach(m => {
    if (m.id !== id) m.classList.remove('open');
  });
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('open');
    const sheet = el.querySelector('.modal-sheet');
    if (sheet) sheet.scrollTop = 0;
  }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
  syncBottomBarState();
}

function closeOnBg(e, id) {
  if (e.target.id === id) {
    closeModal(id);
  }
}

function navToSchedule() {
  closeAllModals();
  if (isDriverMode && driverViewMode === 'cockpit') {
    switchDriverView('passenger');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  syncBottomBarState('tab-nav-schedule');
}

function handleDriverBarBtn() {
  closeAllModals();
  if (isDriverMode) {
    switchDriverView('cockpit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    syncBottomBarState('tab-nav-driver');
  } else {
    openModal('driver-modal');
    syncBottomBarState('tab-nav-driver');
  }
}

function navToInfo() {
  const modal = document.getElementById('info-modal');
  if (modal && modal.classList.contains('open')) {
    closeModal('info-modal');
    return;
  }
  openModal('info-modal');
  syncBottomBarState('tab-nav-info');
}

function navToInstall() {
  const modal = document.getElementById('install-modal');
  if (modal && modal.classList.contains('open')) {
    closeModal('install-modal');
    return;
  }
  openModal('install-modal');
  syncBottomBarState('tab-nav-install');
}

function syncBottomBarState(forceTabId = null) {
  const allTabs = ['tab-nav-schedule', 'tab-nav-driver', 'tab-nav-info', 'tab-nav-install'];

  if (forceTabId) {
    currentActiveTab = forceTabId;
  } else {
    const openModalEl = document.querySelector('.modal-overlay.open');
    if (openModalEl) {
      if (openModalEl.id === 'info-modal') currentActiveTab = 'tab-nav-info';
      else if (openModalEl.id === 'install-modal') currentActiveTab = 'tab-nav-install';
      else if (openModalEl.id === 'driver-modal') currentActiveTab = 'tab-nav-driver';
      else currentActiveTab = 'tab-nav-schedule';
    } else {
      if (isDriverMode && driverViewMode === 'cockpit') {
        currentActiveTab = 'tab-nav-driver';
      } else {
        currentActiveTab = 'tab-nav-schedule';
      }
    }
  }

  allTabs.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      if (id === currentActiveTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  });

  updateDockIndicator();
}

function updateDockIndicator() {
  requestAnimationFrame(() => {
    const bar = document.getElementById('main-bottom-bar');
    const ind = document.getElementById('dock-indicator');
    const activeBtn = document.querySelector('#main-bottom-bar .bar-btn.active');
    if (!bar || !ind || !activeBtn) return;

    const barRect = bar.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const left = btnRect.left - barRect.left;
    const width = btnRect.width;

    ind.style.transform = `translateX(${left}px)`;
    ind.style.width = `${width}px`;
  });
}

function exitDriverMode() {
  isDriverMode = false;
  driverPin = '';
  localStorage.removeItem('isDriverMode');
  localStorage.removeItem('driverPin');
  applyDriverMode();
  updateAll();
  syncBottomBarState();
}

function switchDriverView(mode) {
  driverViewMode = mode;
  const bar = document.getElementById('driver-mode-bar');
  const pNotice = document.getElementById('driver-passenger-notice');
  const drvCockpit = document.getElementById('driver-cockpit-view');
  const passView = document.getElementById('passenger-view');
  const btnCockpit = document.getElementById('btn-switch-cockpit');
  const btnPassenger = document.getElementById('btn-switch-passenger');

  if (!isDriverMode) {
    if (bar) bar.style.display = 'none';
    if (pNotice) pNotice.style.display = 'none';
    if (drvCockpit) drvCockpit.style.display = 'none';
    if (passView) passView.style.display = 'block';
    const brandH1 = document.getElementById('brand-title-h1');
    const headerSub = document.getElementById('header-sub');
    const si = getStopInfo();
    if (brandH1) brandH1.textContent = 'РђРІС‚РѕР±СѓСЃРё РћРўР“';
    if (headerSub) headerSub.textContent = 'Р РѕР·РєР»Р°Рґ РїСЂРёРјС–СЃСЊРєРёС… Р°РІС‚РѕР±СѓСЃС–РІ';
    syncBottomBarState();
    return;
  }

  if (bar) bar.style.display = 'flex';
  if (mode === 'cockpit') {
    if (btnCockpit) btnCockpit.classList.add('active');
    if (btnPassenger) btnPassenger.classList.remove('active');
    if (pNotice) pNotice.style.display = 'none';
    if (drvCockpit) drvCockpit.style.display = 'block';
    if (passView) passView.style.display = 'none';
    const brandH1 = document.getElementById('brand-title-h1');
    const headerSub = document.getElementById('header-sub');
    const r = routes[drvRoute] || { name: 'РџС–РґРіРѕСЂРѕРґРЅРµ' };
    if (brandH1) brandH1.innerHTML = `<span>рџљЌ РџСѓР»СЊС‚ РІРѕРґС–СЏ</span>`;
    if (headerSub) headerSub.textContent = `${r.name} вЂў ${drvSelectedTrip ? drvSelectedTrip.t : ''}`;
    renderDriverCockpit();
  } else {
    if (btnCockpit) btnCockpit.classList.remove('active');
    if (btnPassenger) btnPassenger.classList.add('active');
    if (pNotice) pNotice.style.display = 'flex';
    if (drvCockpit) drvCockpit.style.display = 'none';
    if (passView) passView.style.display = 'block';
    const brandH1 = document.getElementById('brand-title-h1');
    const headerSub = document.getElementById('header-sub');
    const si = getStopInfo();
    if (brandH1) brandH1.textContent = 'РђРІС‚РѕР±СѓСЃРё РћРўР“';
    if (headerSub) headerSub.textContent = 'Р РѕР·РєР»Р°Рґ РїСЂРёРјС–СЃСЊРєРёС… Р°РІС‚РѕР±СѓСЃС–РІ';
    updateAll();
  }
  syncBottomBarState();
}

let isDriverPickerOpen = false;
function toggleDriverTripPicker() {
  isDriverPickerOpen = !isDriverPickerOpen;
  tgHaptic('selection');
  const drawer = document.getElementById('drv-picker-drawer');
  const btnText = document.getElementById('drv-picker-btn-text');
  if (drawer) drawer.style.display = isDriverPickerOpen ? 'block' : 'none';
  if (btnText) btnText.textContent = isDriverPickerOpen ? 'Р—РіРѕСЂРЅСѓС‚Рё в–ґ' : 'Р—РјС–РЅРёС‚Рё СЂРµР№СЃ в–ѕ';
}

let isDrvTimelineExpanded = true;
function toggleDrvTimelineExpand() {
  isDrvTimelineExpanded = !isDrvTimelineExpanded;
  tgHaptic('selection');
  const stepper = document.getElementById('drv-stepper');
  const hint = document.getElementById('drv-stepper-hint');
  if (stepper) stepper.style.display = isDrvTimelineExpanded ? 'flex' : 'none';
  if (hint) hint.textContent = isDrvTimelineExpanded ? 'Р·РіРѕСЂРЅСѓС‚Рё в–ґ' : 'СЂРѕР·РіРѕСЂРЅСѓС‚Рё в–ѕ';
}

function setDriverRoute(routeKey) {
  drvRoute = routeKey;
  localStorage.setItem('drvRoute', routeKey);
  autoPickDriverTrip();
  renderDriverCockpit();
}

function setDriverDirection(dir) {
  drvDir = dir;
  tgHaptic('selection');
  autoPickDriverTrip();
  renderDriverCockpit();
}

function getDriverTripsList() {
  const schedule = drvDir === 'to-pidg' ? scheduleToPidg : scheduleToTern;
  return schedule.filter(b => b.r === drvRoute);
}

function autoPickDriverTrip() {
  const trips = getDriverTripsList();
  if (!trips.length) {
    drvSelectedTrip = null;
    return;
  }
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();

  let found = trips.find(b => toMin(b.t) >= cur - 25);
  if (!found) found = trips[0];
  drvSelectedTrip = found;
}

function selectDriverTrip(timeStr) {
  const trips = getDriverTripsList();
  const found = trips.find(b => b.t === timeStr);
  if (found) {
    drvSelectedTrip = found;
    // Auto-collapse picker after selection
    isDriverPickerOpen = false;
    const drawer = document.getElementById('drv-picker-drawer');
    const btnText = document.getElementById('drv-picker-btn-text');
    if (drawer) drawer.style.display = 'none';
    if (btnText) btnText.textContent = 'Р—РјС–РЅРёС‚Рё СЂРµР№СЃ в–ѕ';
    renderDriverCockpit();
  }
}

function getDriverTripProgress(dir, tripTime, routeType) {
  const matches = liveReports.filter(r =>
    r.direction === dir &&
    r.trip_time === tripTime &&
    r.route_type === routeType &&
    r.report_type === 'driver'
  );

  const passedMap = {};
  let status = 'none';
  let latestStop = null;
  let latestTime = null;

  matches.forEach(r => {
    if (r.status === 'cancelled') status = 'cancelled';
    else if (r.status === 'delayed_10' && status !== 'cancelled') status = 'delayed_10';
    else if (r.status === 'ok' && status !== 'cancelled') status = 'ok';

    if (r.stop_name && r.stop_name !== 'base' && !passedMap[r.stop_name]) {
      const t = r.created_at ? r.created_at.slice(11, 16) : 'вњ…';
      passedMap[r.stop_name] = t;
      if (!latestStop) {
        latestStop = r.stop_name;
        latestTime = t;
      }
    }
  });

  return { passedMap, status, latestStop, latestTime };
}

function renderDriverCockpit() {
  if (!isDriverMode) return;

  // 1. Update Route cards active status
  document.querySelectorAll('.drv-route-card').forEach(c => c.classList.remove('active'));
  const activeCard = document.getElementById(`drv-r-${drvRoute}`);
  if (activeCard) activeCard.classList.add('active');

  // 2. Update Direction tabs
  const bPidg = document.getElementById('btn-drv-dir-to-pidg');
  const bTern = document.getElementById('btn-drv-dir-to-tern');
  if (bPidg) bPidg.classList.toggle('active', drvDir === 'to-pidg');
  if (bTern) bTern.classList.toggle('active', drvDir === 'to-tern');

  // 3. Ensure a trip is selected
  const trips = getDriverTripsList();
  if (!drvSelectedTrip || !trips.some(b => b.t === drvSelectedTrip.t)) {
    autoPickDriverTrip();
  }

  // 4. Render Trip Strip
  const strip = document.getElementById('drv-trip-strip');
  const countEl = document.getElementById('drv-trips-count');
  if (countEl) countEl.textContent = `${trips.length} СЂРµР№СЃС–РІ`;

  if (strip) {
    strip.innerHTML = trips.map(b => {
      const isSel = drvSelectedTrip && b.t === drvSelectedTrip.t;
      const prog = getDriverTripProgress(drvDir, b.t, b.r);
      const isCanc = prog.status === 'cancelled';
      const hasProg = prog.status === 'ok' && Object.keys(prog.passedMap).length > 0;
      const isDel = prog.status === 'delayed_10';

      let dot = '';
      if (isCanc) dot = 'вњ•';
      else if (isDel) dot = '!';
      else if (hasProg) dot = 'вЂў';

      return `
        <button class="drv-trip-chip ${isSel ? 'active' : ''} ${hasProg ? 'has-progress' : ''} ${isCanc ? 'cancelled' : ''}" onclick="selectDriverTrip('${b.t}')">
          ${dot ? `<span>${dot}</span>` : ''}
          <span>${b.t}</span>
        </button>
      `;
    }).join('');
  }

  if (!drvSelectedTrip) return;

  // 5. Active Trip Compact Bar
  const r = routes[drvRoute] || { name: 'РџС–РґРіРѕСЂРѕРґРЅРµ' };
  const atbTime = document.getElementById('drv-atb-time');
  const atbRoute = document.getElementById('drv-atb-route');
  const atbDir = document.getElementById('drv-atb-dir');
  if (atbTime) atbTime.textContent = drvSelectedTrip ? drvSelectedTrip.t : '--:--';
  if (atbRoute) atbRoute.textContent = r.name;
  if (atbDir) {
    atbDir.textContent = drvDir === 'to-pidg'
      ? `РђРЎ-2 (РўРµСЂРЅРѕРїС–Р»СЊ) вћ” ${r.name}`
      : `${r.name} вћ” РђРЎ-2 (РўРµСЂРЅРѕРїС–Р»СЊ)`;
  }

  // Update Header title for Driver
  const brandH1 = document.getElementById('brand-title-h1');
  const headerSub = document.getElementById('header-sub');
  if (brandH1) brandH1.innerHTML = `<span>рџљЌ РџСѓР»СЊС‚ РІРѕРґС–СЏ</span>`;
  if (headerSub) headerSub.textContent = `${r.name} вЂў ${drvSelectedTrip ? drvSelectedTrip.t : ''}`;

  // Target Stop & Focus Hero
  const stops = stopsConfig[drvDir];
  const baseMin = toMin(drvSelectedTrip.t);
  const tripProg = getDriverTripProgress(drvDir, drvSelectedTrip.t, drvSelectedTrip.r);

  let targetStop = null;
  for (let s of stops) {
    if (!tripProg.passedMap[s.name]) {
      targetStop = s;
      break;
    }
  }

  const focusStopName = document.getElementById('drv-focus-stop-name');
  const focusEta = document.getElementById('drv-focus-eta');
  const tStatusRow = document.getElementById('drv-trip-status-row');

  if (targetStop) {
    if (focusStopName) focusStopName.textContent = `${targetStop.approx ? '~' : ''}${targetStop.name} (${targetStop.sub})`;
    if (focusEta) focusEta.textContent = `~${toTime(baseMin + targetStop.offset)}`;
  } else {
    if (focusStopName) focusStopName.textContent = `рџЏЃ РљС–РЅС†РµРІР° Р·СѓРїРёРЅРєР° РїСЂРёР±СѓС‚С‚СЏ`;
    if (focusEta) focusEta.textContent = `Р РµР№СЃ Р·Р°РІРµСЂС€РµРЅРѕ`;
  }

  if (tStatusRow) {
    if (tripProg.status === 'cancelled') {
      tStatusRow.innerHTML = `<span class="badge badge-driver-cancel">Р Р•Р™РЎ РЎРљРђРЎРћР’РђРќРћ Р’РђРњР</span>`;
    } else if (tripProg.status === 'delayed_10') {
      tStatusRow.innerHTML = `<span class="badge badge-driver-delay">РџРћР’Р†Р”РћРњР›Р•РќРћ РџР Рћ Р—РђРўР РРњРљРЈ (+5вЂ“10 РҐР’)</span>`;
    } else if (tripProg.status === 'ok' && tripProg.latestStop) {
      tStatusRow.innerHTML = `<span class="badge badge-driver-ok">РЈ Р”РћР РћР—Р†: С‰РѕР№РЅРѕ В«${tripProg.latestStop}В» (${tripProg.latestTime})</span>`;
    } else {
      tStatusRow.innerHTML = `<span style="font-size:12px;color:var(--text-tertiary);font-weight:600;">Р РµР№СЃ Р·Р° СЂРѕР·РєР»Р°РґРѕРј</span>`;
    }
  }

  // 6. Stop Stepper (Р”РѕСЂРѕРіР° РїРѕ Р·СѓРїРёРЅРєР°С…)
  const stepper = document.getElementById('drv-stepper');
  const passedStops = stops.filter(s => Boolean(tripProg.passedMap[s.name]));
  const unpassedStops = stops.filter(s => !tripProg.passedMap[s.name]);

  function renderStopItem(s, idx) {
    const isPassed = Boolean(tripProg.passedMap[s.name]);
    const isTarget = targetStop && s.id === targetStop.id;
    const schedTime = toTime(baseMin + s.offset);

    let itemClass = 'stepper-item';
    let iconContent = `${idx + 1}`;
    let badgeHtml = '';

    if (isPassed) {
      itemClass += ' passed';
      iconContent = 'вњ“';
      badgeHtml = `<span class="stepper-badge sbadge-passed">вњ“ ${tripProg.passedMap[s.name]}</span>`;
    } else if (isTarget) {
      itemClass += ' current';
      badgeHtml = `<span class="stepper-badge sbadge-target">РќРђРЎРўРЈРџРќРђ</span>`;
    } else {
      itemClass += ' upcoming';
    }

    return `
      <div class="${itemClass}" onclick="drvReportSpecificStop('${s.name}')" title="РќР°С‚РёСЃРЅС–С‚СЊ РґР»СЏ РІС–РґРјС–С‚РєРё С†С–С”С— Р·СѓРїРёРЅРєРё">
        <div class="stepper-icon-col">${iconContent}</div>
        <div class="stepper-info">
          <div class="stepper-name-row">
            <span class="stepper-stop-name">${s.approx ? '~' : ''}${s.name}</span>
            <div style="display:flex;align-items:center;">
              <span class="stepper-time">~${schedTime}</span>
              ${badgeHtml}
            </div>
          </div>
          <div class="stepper-sub">${s.sub}</div>
        </div>
      </div>
    `;
  }

  if (stepper) {
    let stepperHtml = '';
    if (passedStops.length >= 2) {
      stepperHtml += `
        <div class="drv-passed-accordion" onclick="toggleDrvPassedStops()">
          <span>вњ… РџСЂРѕР№РґРµРЅРѕ ${passedStops.length} Р·СѓРїРёРЅРѕРє (${passedStops.map(s => s.name).join(' в†’ ')})</span>
          <span style="font-size:11.5px;color:var(--accent);font-weight:700;">${showDrvPassedStops ? 'Р—РіРѕСЂРЅСѓС‚Рё в–ґ' : 'РџРѕРєР°Р·Р°С‚Рё в–ѕ'}</span>
        </div>
      `;
      if (showDrvPassedStops) {
        stepperHtml += passedStops.map((s, idx) => renderStopItem(s, idx)).join('');
      }
      stepperHtml += unpassedStops.map((s, idx) => renderStopItem(s, passedStops.length + idx)).join('');
    } else {
      stepperHtml = stops.map((s, idx) => renderStopItem(s, idx)).join('');
    }
    stepper.innerHTML = stepperHtml;
  }

  // 7. Giant Advance Button
  const btnAdvance = document.getElementById('btn-drv-advance');
  const advSub = document.getElementById('drv-adv-sub');
  const advTitle = document.getElementById('drv-adv-title');

  if (btnAdvance && advSub && advTitle) {
    if (targetStop) {
      btnAdvance.className = 'btn-drv-big-advance';
      advSub.textContent = 'РџР РћР‡РҐРђР›Р Р—РЈРџРРќРљРЈ?';
      advTitle.textContent = `Р’С–РґР·РЅР°С‡РёС‚Рё: В«${targetStop.name}В»`;
    } else {
      btnAdvance.className = 'btn-drv-big-advance finished';
      advSub.textContent = 'Р Р•Р™РЎ РџР РР‘РЈР’ РќРђ РљР†РќР¦Р•Р’РЈ!';
      const oppDir = drvDir === 'to-pidg' ? 'to-tern' : 'to-pidg';
      const oppTrips = (oppDir === 'to-pidg' ? scheduleToPidg : scheduleToTern).filter(b => b.r === drvRoute);
      const now = new Date();
      const cur = now.getHours() * 60 + now.getMinutes();
      const nextOpp = oppTrips.find(b => toMin(b.t) >= cur - 10) || oppTrips[0];
      advTitle.textContent = `РџРѕС‡Р°С‚Рё Р·РІРѕСЂРѕС‚РЅРёР№ СЂРµР№СЃ ${nextOpp ? nextOpp.t : ''} вћ”`;
    }
  }

  // 8. Passenger Live Preview Box
  const prevContent = document.getElementById('drv-prev-content');
  if (prevContent) {
    if (tripProg.status === 'cancelled') {
      prevContent.innerHTML = `РџР°СЃР°Р¶РёСЂРё Р±Р°С‡Р°С‚СЊ: <b>В«Р’РѕРґС–Р№ Р·РЅСЏРІ СЂРµР№СЃ ${drvSelectedTrip.t} (${r.name})В»</b>`;
    } else if (tripProg.status === 'delayed_10') {
      prevContent.innerHTML = `РџР°СЃР°Р¶РёСЂРё Р±Р°С‡Р°С‚СЊ: <b>В«Р’РѕРґС–Р№ РїРѕРІС–РґРѕРјРёРІ РїСЂРѕ Р·Р°С‚СЂРёРјРєСѓ СЂРµР№СЃСѓ +5вЂ“10 С…РІВ»</b>`;
    } else if (tripProg.latestStop) {
      const nextName = targetStop ? `В«${targetStop.name}В»` : 'РљС–РЅС†РµРІРѕС—';
      prevContent.innerHTML = `РџР°СЃР°Р¶РёСЂРё Р±Р°С‡Р°С‚СЊ: <b>В«Р’РѕРґС–Р№ Сѓ РґРѕСЂРѕР·С–: С‰РѕР№РЅРѕ РїСЂРѕС—С…Р°РІ В«${tripProg.latestStop}В» (${tripProg.latestTime}) вћ” РїСЂСЏРјСѓС” РґРѕ ${nextName}В»</b>`;
    } else {
      prevContent.innerHTML = `РџР°СЃР°Р¶РёСЂРё Р±Р°С‡Р°С‚СЊ: СЂРµР№СЃ Р·Р° СЂРѕР·РєР»Р°РґРѕРј Рѕ <b>${drvSelectedTrip.t}</b> (${r.name}).`;
    }
  }
}

async function drvAdvanceCurrentStop() {
  if (!drvSelectedTrip) return;
  const stops = stopsConfig[drvDir];
  const tripProg = getDriverTripProgress(drvDir, drvSelectedTrip.t, drvSelectedTrip.r);

  let targetStop = null;
  for (let s of stops) {
    if (!tripProg.passedMap[s.name]) {
      targetStop = s;
      break;
    }
  }

  if (targetStop) {
    await drvReportSpecificStop(targetStop.name);
  } else {
    const newDir = drvDir === 'to-pidg' ? 'to-tern' : 'to-pidg';
    setDriverDirection(newDir);
  }
}

async function drvReportSpecificStop(stopName) {
  if (!drvSelectedTrip) return;
  if (navigator.vibrate) {
    try { navigator.vibrate(80); } catch(e) {}
  }

  try {
    const res = await fetch('/bus/api/report-driver', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pin: driverPin || '4400',
        direction: drvDir,
        trip_time: drvSelectedTrip.t,
        route_type: drvSelectedTrip.r,
        status: 'ok',
        stop_name: stopName
      })
    });
    const data = await res.json();
    if (data.ok) {
      await fetchLiveReports();
      renderDriverCockpit();
    } else {
      alert(`РџРѕРјРёР»РєР°: ${data.error}`);
    }
  } catch(e) {
    alert('РџРѕРјРёР»РєР° РЅР°РґСЃРёР»Р°РЅРЅСЏ.');
  }
}

async function submitDriverTripStatus(statusVal) {
  if (!drvSelectedTrip) return;
  const r = routes[drvSelectedTrip.r];
  const label = statusVal === 'cancelled' ? 'РЎРљРђРЎРЈР’РђРўР С†РµР№ СЂРµР№СЃ' : 'РїРѕРїРµСЂРµРґРёС‚Рё РїСЂРѕ Р·Р°С‚СЂРёРјРєСѓ +5вЂ“10 С…РІ';

  if (confirm(`Р’Рё РІРїРµРІРЅРµРЅС–, С‰Рѕ С…РѕС‡РµС‚Рµ ${label} (${drvSelectedTrip.t}, ${r.name})?`)) {
    try {
      const res = await fetch('/bus/api/report-driver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin: driverPin || '4400',
          direction: drvDir,
          trip_time: drvSelectedTrip.t,
          route_type: drvSelectedTrip.r,
          status: statusVal,
          stop_name: 'base'
        })
      });
      const data = await res.json();
      if (data.ok) {
        await fetchLiveReports();
        renderDriverCockpit();
      } else {
        alert(`РџРѕРјРёР»РєР°: ${data.error}`);
      }
    } catch(e) {
      alert('РџРѕРјРёР»РєР° РЅР°РґСЃРёР»Р°РЅРЅСЏ.');
    }
  }
}

async function resetDriverTripStops() {
  if (!drvSelectedTrip) return;
  const r = routes[drvSelectedTrip.r];
  if (confirm(`РЎРєРёРЅСѓС‚Рё РІСЃС– РІС–РґРјС–С‚РєРё Р·СѓРїРёРЅРѕРє РґР»СЏ СЂРµР№СЃСѓ ${drvSelectedTrip.t} (${r.name})?`)) {
    try {
      const res = await fetch('/bus/api/reset-driver-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin: driverPin || '4400',
          direction: drvDir,
          trip_time: drvSelectedTrip.t,
          route_type: drvSelectedTrip.r
        })
      });
      const data = await res.json();
      if (data.ok) {
        await fetchLiveReports();
        renderDriverCockpit();
      } else {
        alert(`РџРѕРјРёР»РєР°: ${data.error}`);
      }
    } catch(e) {
      alert('РџРѕРјРёР»РєР° СЃРєРёРґР°РЅРЅСЏ.');
    }
  }
}

// в”Ђв”Ђ Update all в”Ђв”Ђ
function updateAll() { updateClock(); updateHero(); renderSchedule(); }

// в”Ђв”Ђ Cache clear в”Ђв”Ђ
function clearAppCache() {
  if (confirm("РћС‡РёСЃС‚РёС‚Рё РєРµС€ С‚Р° РѕРЅРѕРІРёС‚Рё СЂРѕР·РєР»Р°Рґ?")) {
    try {
      if ('caches' in window) caches.keys().then(n => { for (let k of n) caches.delete(k); });
      localStorage.clear(); sessionStorage.clear();
    } catch(e) {}
    window.location.replace(window.location.origin + window.location.pathname + '?v=' + Date.now());
  }
}

// в”Ђв”Ђ PWA Installation Logic в”Ђв”Ђ
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('btn-pwa-install');
  if (btn) btn.style.display = 'inline-flex';
});

async function triggerPwaInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredPrompt = null;
      const btn = document.getElementById('btn-pwa-install');
      if (btn) btn.style.display = 'none';
      closeModal('install-modal');
    }
  } else {
    copyDirectBusLink();
    alert('РџРѕСЃРёР»Р°РЅРЅСЏ СЃРєРѕРїС–Р№РѕРІР°РЅРѕ! Р’С–РґРєСЂРёР№С‚Рµ Р№РѕРіРѕ Сѓ Safari (РЅР° iPhone) Р°Р±Рѕ Chrome (РЅР° Android), С‰РѕР± Р·Р±РµСЂРµРіС‚Рё РґРѕРґР°С‚РѕРє РЅР° СЂРѕР±РѕС‡РёР№ СЃС‚С–Р».');
  }
}

function copyDirectBusLink() {
  const url = window.location.origin + '/bus';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      const txt = document.getElementById('btn-copy-link-text');
      if (txt) {
        txt.textContent = 'РЎРєРѕРїС–Р№РѕРІР°РЅРѕ!';
        setTimeout(() => { txt.textContent = 'РЎРєРѕРїС–СЋРІР°С‚Рё'; }, 2500);
      }
    }).catch(() => { fallbackCopyText(url); });
  } else {
    fallbackCopyText(url);
  }
}

function fallbackCopyText(text) {
  const inp = document.getElementById('pwa-direct-url');
  if (inp) {
    inp.select();
    document.execCommand('copy');
    const txt = document.getElementById('btn-copy-link-text');
    if (txt) {
      txt.textContent = 'РЎРєРѕРїС–Р№РѕРІР°РЅРѕ!';
      setTimeout(() => { txt.textContent = 'РЎРєРѕРїС–СЋРІР°С‚Рё'; }, 2500);
    }
  }
}

// в”Ђв”Ђ Native Sheet Drag-Down Gesture в”Ђв”Ђ
function setupSheetDragGestures() {
  document.querySelectorAll('.modal-sheet').forEach(sheet => {
    let startY = 0;
    let currentY = 0;

    sheet.addEventListener('touchstart', (e) => {
      if (sheet.scrollTop <= 0) {
        startY = e.touches[0].clientY;
      } else {
        startY = 0;
      }
    }, { passive: true });

    sheet.addEventListener('touchmove', (e) => {
      if (startY > 0) {
        currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        if (diff > 0) {
          sheet.style.transform = `translateY(${diff * 0.55}px)`;
        }
      }
    }, { passive: true });

    sheet.addEventListener('touchend', () => {
      if (startY > 0 && currentY - startY > 65) {
        const overlay = sheet.closest('.modal-overlay');
        sheet.style.transform = '';
        if (overlay) {
          tgHaptic('light');
          closeModal(overlay.id);
        }
      } else {
        sheet.style.transform = '';
      }
      startY = 0;
      currentY = 0;
    }, { passive: true });
  });
}

// в”Ђв”Ђ Init в”Ђв”Ђ
setInterval(updateClock, 1000);
setInterval(() => { updateHero(); renderSchedule(); }, 20000);
setInterval(fetchLiveReports, 20000);

setDirection(curDir);
fetchWeather();
fetchLiveReports();
applyDriverMode();
setupSheetDragGestures();

window.addEventListener('resize', () => {
  updateDockIndicator();
  updateDirIndicator();
});

window.addEventListener('load', () => {
  setTimeout(() => {
    syncBottomBarState();
    updateDirIndicator();
  }, 60);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllModals();
    syncBottomBarState();
  }
});

setTimeout(() => {
  syncBottomBarState();
  updateDirIndicator();
}, 60);

setTimeout(() => {
  syncBottomBarState();
  updateDirIndicator();
}, 300);

