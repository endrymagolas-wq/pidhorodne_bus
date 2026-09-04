#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Модуль розкладу автобусів Підгородне <-> Тернопіль для Flask / PythonAnywhere
Забезпечує роботу 24/7 Telegram Webhook та веб-додатка /bus
"""

import os
import sys
from datetime import datetime, timezone, timedelta

# Сумісність urllib3 з pyTelegramBotAPI
try:
    import urllib3.fields
    if not hasattr(urllib3.fields, 'format_header_param'):
        urllib3.fields.format_header_param = getattr(
            urllib3.fields, 'format_header_param_rfc2231',
            lambda name, value: f'{name}="{value}"'
        )
except Exception:
    pass

import telebot
from telebot import types
from flask import request, Response

# Налаштування проксі для PythonAnywhere
if "PYTHONANYWHERE_DOMAIN" in os.environ or os.path.exists("/home/AvalonKnight"):
    telebot.apihelper.proxy = {
        'http': 'http://proxy.server:3128',
        'https': 'http://proxy.server:3128'
    }

try:
    import zoneinfo
    KYIV_TZ = zoneinfo.ZoneInfo("Europe/Kyiv")
except Exception:
    KYIV_TZ = timezone(timedelta(hours=3))

BUS_TOKEN = os.getenv("PIDHORODNE_BOT_TOKEN", "8972553566:AAEvFKwONSaYRHdFvNa_oGxqBw1K29kQBmg")
SERVER_URL = os.getenv("SERVER_URL", "https://avalonknight.pythonanywhere.com")
WEBAPP_URL = f"{SERVER_URL.rstrip('/')}/bus"

bot = telebot.TeleBot(BUS_TOKEN, threaded=False)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

ROUTES = {
    'pidg': {'code': 'Підг', 'name': 'Підгородне (пряма)', 'icon': '🟢'},
    'drag': {'code': 'Драг', 'name': 'Драганівка / Почапинці', 'icon': '🔵'},
    'zab':  {'code': 'Заб',  'name': 'Забойки', 'icon': '🟡'},
    'dom':  {'code': 'Дом',  'name': 'Домаморич', 'icon': '🟣'}
}

# Розклад з АС-2 (без міського рейсу №40)
SCHEDULE_TO_PIDG = [
    ("06:30", "drag"), ("06:40", "pidg"), ("06:45", "zab"), ("07:10", "drag"),
    ("07:25", "dom"),  ("07:45", "pidg"), ("07:50", "drag"), ("08:15", "zab"),
    ("08:40", "pidg"), ("08:40", "drag"), ("09:30", "drag"), ("09:40", "zab"),
    ("10:15", "pidg"), ("10:30", "drag"), ("11:30", "zab"),  ("11:45", "drag"),
    ("11:55", "dom"),  ("12:00", "pidg"), ("13:00", "drag"), ("13:45", "pidg"),
    ("14:00", "zab"),  ("14:15", "drag"), ("14:55", "dom"),  ("15:10", "pidg"),
    ("15:30", "drag"), ("15:45", "zab"),  ("16:30", "drag"), ("16:40", "pidg"),
    ("17:30", "drag"), ("17:45", "zab"),  ("17:55", "dom"),  ("18:00", "pidg"),
    ("18:30", "drag"), ("19:20", "pidg"), ("19:30", "zab"),  ("19:30", "drag"),
    ("20:15", "drag")
]

# Розклад з Нижньої зупинки в Підгородньому
SCHEDULE_TO_TERN = [
    ("07:00", "drag"), ("07:05", "pidg"), ("07:20", "zab"), ("07:40", "drag"),
    ("08:05", "dom"),  ("08:10", "pidg"), ("08:20", "drag"), ("08:50", "zab"),
    ("09:10", "pidg"), ("09:10", "drag"), ("10:00", "drag"), ("10:15", "zab"),
    ("10:45", "pidg"), ("11:00", "drag"), ("12:05", "zab"),  ("12:15", "drag"),
    ("12:30", "pidg"), ("12:35", "dom"),  ("13:30", "drag"), ("14:15", "pidg"),
    ("14:35", "zab"),  ("14:45", "drag"), ("15:35", "dom"),  ("15:40", "pidg"),
    ("15:50", "drag"), ("16:20", "zab"),  ("16:50", "drag"), ("17:10", "pidg"),
    ("17:50", "drag"), ("18:20", "zab"),  ("18:30", "pidg"), ("18:35", "dom"),
    ("18:50", "drag"), ("19:45", "pidg"), ("19:50", "drag"), ("20:05", "zab")
]

def parse_minutes(time_str: str) -> int:
    h, m = map(int, time_str.split(':'))
    return h * 60 + m

def minutes_to_str(m: int) -> str:
    m = m % (24 * 60)
    return f"{m // 60:02d}:{m % 60:02d}"

def get_kyiv_now() -> datetime:
    return datetime.now(KYIV_TZ)

def build_main_keyboard():
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True, row_width=2)
    btn_webapp = types.KeyboardButton("🌐 Відкрити онлайн-розклад", web_app=types.WebAppInfo(url=WEBAPP_URL))
    btn_zbruch = types.KeyboardButton("🏛️ Збруч (зараз)")
    btn_mcd = types.KeyboardButton("🍔 Від McDonald's (зараз)")
    btn_pidg = types.KeyboardButton("🏡 З Нижньої (зараз)")
    btn_all_to_pidg = types.KeyboardButton("📅 Розклад: Тернопіль ➔ Село")
    btn_all_to_tern = types.KeyboardButton("📅 Розклад: Село ➔ Тернопіль")
    btn_clean = types.KeyboardButton("🧹 Очистити кеш сайту")
    btn_warn = types.KeyboardButton("ℹ️ Маршрут і зупинки")

    markup.add(btn_webapp)
    markup.add(btn_zbruch, btn_mcd)
    markup.add(btn_pidg)
    markup.add(btn_all_to_pidg, btn_all_to_tern)
    markup.add(btn_clean, btn_warn)
    return markup

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    text = (
        "🚌 <b>Розклад автобусів: Підгородне ↔ Тернопіль</b>\n\n"
        "Маршрут проходить через ключові зупинки:\n"
        "• <b>АС-2</b> (Білогірська)\n"
        "• <b>Збруч</b> (Торговиця, +2 хв)\n"
        "• <b>McDonald's / Танк</b> (Мазепи, +6 хв)\n"
        "• <b>Бережанська</b> (ЗУНУ, +8 хв)\n"
        "• <b>Підгородне (Нижня зупинка)</b> (+17 хв)\n\n"
        "<i>Міський маршрут №40 виключено з розкладу, оскільки він курсує лише до міського кладовища і не доїжджає до центру села.</i>\n\n"
        "Обирайте потрібну дію або відкривайте зручний веб-розклад із вибором будь-якої зупинки 👇"
    )
    inline_markup = types.InlineKeyboardMarkup()
    inline_markup.add(types.InlineKeyboardButton("📲 Відкрити веб-розклад (з вибором зупинки)", web_app=types.WebAppInfo(url=WEBAPP_URL)))

    bot.send_message(message.chat.id, text, parse_mode="HTML", reply_markup=build_main_keyboard())
    bot.send_message(message.chat.id, "✨ Натисніть кнопку, щоб відкрити інтерактивний таймер:", reply_markup=inline_markup)

@bot.message_handler(commands=['site', 'app', 'link'])
def send_site_link(message):
    inline_markup = types.InlineKeyboardMarkup()
    inline_markup.add(types.InlineKeyboardButton("📲 Відкрити веб-додаток", web_app=types.WebAppInfo(url=WEBAPP_URL)))
    text = (
        f"🌐 <b>Онлайн-розклад:</b>\n"
        f"<code>{WEBAPP_URL}</code>\n\n"
        f"Можна відкрити прямо в Telegram або скопіювати посилання у будь-який браузер."
    )
    bot.send_message(message.chat.id, text, parse_mode="HTML", reply_markup=inline_markup)

@bot.message_handler(func=lambda m: m.text == "🧹 Очистити кеш сайту" or m.text in ["/clean", "/refresh"])
def clean_site_cache(message):
    nocache_time = int(datetime.now().timestamp())
    clean_url = f"{WEBAPP_URL}?nocache={nocache_time}"
    inline_markup = types.InlineKeyboardMarkup()
    inline_markup.add(types.InlineKeyboardButton("🔄 Відкрити свіжий розклад", web_app=types.WebAppInfo(url=clean_url)))

    text = (
        "🧹 <b>Очищення кешу сайту:</b>\n\n"
        "Якщо в телефоні чи в Telegram відображається застарілий розклад:\n"
        "1. Натисніть кнопку <b>«🔄 Відкрити свіжий розклад»</b> нижче.\n"
        "2. Також на самому сайті є кнопка <b>«🧹 Кеш»</b> у нижній панелі."
    )
    bot.send_message(message.chat.id, text, parse_mode="HTML", reply_markup=inline_markup)

@bot.message_handler(func=lambda m: m.text == "🏛️ Збруч (зараз)")
def next_from_zbruch(message):
    now = get_kyiv_now()
    cur_m = now.hour * 60 + now.minute

    upcoming = []
    for dep_time, r_type in SCHEDULE_TO_PIDG:
        dep_m = parse_minutes(dep_time)
        stop_m = dep_m + 2
        diff = stop_m - cur_m
        if diff >= -1:
            upcoming.append((dep_time, r_type, stop_m, diff))

    if not upcoming:
        first_dep, first_type = SCHEDULE_TO_PIDG[0]
        first_stop = parse_minutes(first_dep) + 2
        text = (
            f"🌙 <b>Сьогодні рейси вже завершились!</b>\n\n"
            f"Перший автобус завтра вранці:\n"
            f"🕒 <b>~{minutes_to_str(first_stop)}</b> на зупинці Збруч (виїзд з АС-2 о {first_dep})\n"
            f"{ROUTES[first_type]['icon']} <b>{ROUTES[first_type]['name']}</b>"
        )
        bot.send_message(message.chat.id, text, parse_mode="HTML")
        return

    top = upcoming[:3]
    first = top[0]
    first_route = ROUTES[first[1]]
    first_diff = first[3]

    diff_str = "<b>ПІД'ЇЖДЖАЄ ЗАРАЗ!</b>" if first_diff <= 0 else (
        "<b>через 1 хвилину!</b>" if first_diff == 1 else f"<b>через {first_diff} хв</b>"
    )

    text = (
        f"🏛️ <b>НАЙБЛИЖЧИЙ АВТОБУС (ЗУПИНКА «ЗБРУЧ»):</b>\n"
        f"🕒 Орієнтовно: <b>~{minutes_to_str(first[2])}</b> ({diff_str})\n"
        f"📍 Виїзд з АС-2: <b>{first[0]}</b>\n"
        f"🏁 На Нижні зупинці в селі: ~<b>{minutes_to_str(parse_minutes(first[0]) + 17)}</b>\n"
        f"Маршрут: {first_route['icon']} <b>[{first_route['code']}] {first_route['name']}</b>\n"
    )

    if len(top) > 1:
        text += "\n<b>Наступні рейси:</b>\n"
        for item in top[1:]:
            r = ROUTES[item[1]]
            text += f"• <b>~{minutes_to_str(item[2])}</b> — {r['icon']} [{r['code']}] {r['name']} (через {item[3]} хв)\n"

    bot.send_message(message.chat.id, text, parse_mode="HTML")

@bot.message_handler(func=lambda m: m.text == "🍔 Від McDonald's (зараз)")
def next_from_mcd(message):
    now = get_kyiv_now()
    cur_m = now.hour * 60 + now.minute

    upcoming = []
    for dep_time, r_type in SCHEDULE_TO_PIDG:
        dep_m = parse_minutes(dep_time)
        mcd_m = dep_m + 6
        diff = mcd_m - cur_m
        if diff >= -1:
            upcoming.append((dep_time, r_type, mcd_m, diff))

    if not upcoming:
        first_dep, first_type = SCHEDULE_TO_PIDG[0]
        first_mcd = parse_minutes(first_dep) + 6
        text = (
            f"🌙 <b>Сьогодні рейси вже закінчились!</b>\n\n"
            f"Перший автобус завтра вранці:\n"
            f"🕒 <b>{first_dep}</b> з АС-2 (~<b>{minutes_to_str(first_mcd)}</b> біля McDonald's)\n"
            f"{ROUTES[first_type]['icon']} <b>{ROUTES[first_type]['name']}</b>"
        )
        bot.send_message(message.chat.id, text, parse_mode="HTML")
        return

    top = upcoming[:3]
    first = top[0]
    first_route = ROUTES[first[1]]
    first_diff = first[3]

    diff_str = "<b>ПІД'ЇЖДЖАЄ ЗАРАЗ!</b>" if first_diff <= 0 else (
        "<b>через 1 хвилину!</b>" if first_diff == 1 else f"<b>через {first_diff} хв</b>"
    )

    text = (
        f"🍔 <b>НАЙБЛИЖЧИЙ АВТОБУС БІЛЯ McDONALD'S / ТАНКА:</b>\n"
        f"🕒 Орієнтовно: <b>~{minutes_to_str(first[2])}</b> ({diff_str})\n"
        f"📍 Виїзд з АС-2: <b>{first[0]}</b>\n"
        f"🏁 На Нижні зупинці в селі: ~<b>{minutes_to_str(parse_minutes(first[0]) + 17)}</b>\n"
        f"Маршрут: {first_route['icon']} <b>[{first_route['code']}] {first_route['name']}</b>\n"
    )

    if len(top) > 1:
        text += "\n<b>Наступні рейси після нього:</b>\n"
        for item in top[1:]:
            r = ROUTES[item[1]]
            text += f"• <b>~{minutes_to_str(item[2])}</b> — {r['icon']} [{r['code']}] {r['name']} (через {item[3]} хв)\n"

    bot.send_message(message.chat.id, text, parse_mode="HTML")

@bot.message_handler(func=lambda m: m.text == "🏡 З Нижньої (зараз)")
def next_from_pidg(message):
    now = get_kyiv_now()
    cur_m = now.hour * 60 + now.minute

    upcoming = []
    for dep_time, r_type in SCHEDULE_TO_TERN:
        dep_m = parse_minutes(dep_time)
        diff = dep_m - cur_m
        if diff >= -1:
            upcoming.append((dep_time, r_type, dep_m, diff))

    if not upcoming:
        first_dep, first_type = SCHEDULE_TO_TERN[0]
        text = (
            f"🌙 <b>Сьогодні автобусів з села вже немає!</b>\n\n"
            f"Перший автобус завтра:\n"
            f"🕒 <b>{first_dep}</b> на Нижній зупинці\n"
            f"{ROUTES[first_type]['icon']} <b>{ROUTES[first_type]['name']}</b>"
        )
        bot.send_message(message.chat.id, text, parse_mode="HTML")
        return

    top = upcoming[:3]
    first = top[0]
    first_route = ROUTES[first[1]]
    first_diff = first[3]

    diff_str = "<b>ПІД'ЇЖДЖАЄ ЗАРАЗ!</b>" if first_diff <= 0 else (
        "<b>через 1 хвилину!</b>" if first_diff == 1 else f"<b>через {first_diff} хв</b>"
    )

    mcd_time = minutes_to_str(first[2] + 11)
    zbruch_time = minutes_to_str(first[2] + 16)

    text = (
        f"🏡 <b>НАЙБЛИЖЧИЙ АВТОБУС З НИЖНЬОЇ ЗУПИНКИ:</b>\n"
        f"🕒 Посадка в селі: <b>{first[0]}</b> ({diff_str})\n"
        f"🍔 McDonald's: <b>~{mcd_time}</b>\n"
        f"🏛️ Збруч: <b>~{zbruch_time}</b>\n"
        f"🏁 АС-2: <b>~{minutes_to_str(first[2] + 20)}</b>\n"
        f"Маршрут: {first_route['icon']} <b>[{first_route['code']}] {first_route['name']}</b>\n"
    )

    if len(top) > 1:
        text += "\n<b>Наступні автобуси:</b>\n"
        for item in top[1:]:
            r = ROUTES[item[1]]
            text += f"• <b>{item[0]}</b> — {r['icon']} [{r['code']}] {r['name']} (через {item[3]} хв)\n"

    bot.send_message(message.chat.id, text, parse_mode="HTML")

@bot.message_handler(func=lambda m: m.text == "📅 Розклад: Тернопіль ➔ Село")
def full_to_pidg(message):
    text = "🚌 <b>ТЕРНОПІЛЬ ➔ ПІДГОРОДНЕ (Нижня зуп.)</b>\n<i>(АС-2 / ~+2 хв Збруч / ~+6 хв McDonald's / +17 хв Нижня)</i>\n\n"
    for t, r_key in SCHEDULE_TO_PIDG:
        r = ROUTES[r_key]
        dep_m = parse_minutes(t)
        zbruch = minutes_to_str(dep_m + 2)
        mcd = minutes_to_str(dep_m + 6)
        nizh = minutes_to_str(dep_m + 17)
        text += f"• <b>{t}</b> (Збруч {zbruch} | Мак {mcd} | Нижня {nizh}) — {r['icon']} [{r['code']}]\n"
    bot.send_message(message.chat.id, text, parse_mode="HTML")

@bot.message_handler(func=lambda m: m.text == "📅 Розклад: Село ➔ Тернопіль")
def full_to_tern(message):
    text = "🏡 <b>ПІДГОРОДНЕ (Нижня) ➔ ТЕРНОПІЛЬ</b>\n<i>(Нижня / ~+11 хв McDonald's / ~+16 хв Збруч / +20 хв АС-2)</i>\n\n"
    for t, r_key in SCHEDULE_TO_TERN:
        r = ROUTES[r_key]
        dep_m = parse_minutes(t)
        mcd = minutes_to_str(dep_m + 11)
        zbruch = minutes_to_str(dep_m + 16)
        as2 = minutes_to_str(dep_m + 20)
        text += f"• <b>{t}</b> (Мак {mcd} | Збруч {zbruch} | АС-2 {as2}) — {r['icon']} [{r['code']}]\n"
    bot.send_message(message.chat.id, text, parse_mode="HTML")

@bot.message_handler(func=lambda m: m.text == "ℹ️ Маршрут і зупинки")
def info_warning(message):
    text = (
        "📍 <b>СХЕМА ЗУПИНОК ТА РУХУ АВТОБУСІВ:</b>\n\n"
        "<b>Тернопіль ➔ Підгородне:</b>\n"
        "1. АС-2 (вул. Білогірська) — <b>старт</b>\n"
        "2. Видавництво «Збруч» (вул. Торговиця) — <b>+2–3 хв</b>\n"
        "3. Дамба / Готель «Галичина» — <b>+4 хв</b>\n"
        "4. McDonald's / Танк (вул. Мазепи) — <b>+6 хв</b>\n"
        "5. Вул. Бережанська (ЗУНУ) — <b>+8 хв</b>\n"
        "6. Підгородне (Верхня зуп. / Поворот) — <b>+13 хв</b>\n"
        "7. Підгородне (Нижня зуп., центр села) — <b>+17 хв</b>\n\n"
        "<b>Зворотний напрямок:</b>\n"
        "Нижня ($T$) ➔ Бережанська (+9) ➔ McDonald's (+11) ➔ Збруч (+16) ➔ АС-2 (+20 хв)\n\n"
        "⚠️ <b>Про автобус №40:</b>\n"
        "Маршрут №40 їде тільки до міського кладовища на околиці села. До Нижньої зупинки звідти понад 2,5 км пішки, тому рейс №40 не включено у розклад."
    )
    bot.send_message(message.chat.id, text, parse_mode="HTML")

def register_bus_routes(app):
    """Підключає маршрути для веб-додатка та вебхука бота до існуючого Flask додатку"""

    @app.route("/bus", methods=["GET"])
    def bus_web_app():
        html_path = os.path.join(BASE_DIR, "index.html")
        if os.path.exists(html_path):
            with open(html_path, "r", encoding="utf-8") as f:
                content = f.read()
            return Response(content, mimetype="text/html; charset=utf-8")
        return "Помилка: файл index.html не знайдено", 404

    @app.route("/manifest.json", methods=["GET"])
    def bus_manifest():
        man_path = os.path.join(BASE_DIR, "manifest.json")
        if os.path.exists(man_path):
            with open(man_path, "r", encoding="utf-8") as f:
                content = f.read()
            return Response(content, mimetype="application/json; charset=utf-8")
        return "{}", 200

    @app.route("/bus-telegram", methods=["POST"])
    def bus_telegram_webhook():
        if request.headers.get('content-type') == 'application/json':
            json_string = request.get_data().decode('utf-8')
            update = telebot.types.Update.de_json(json_string)
            bot.process_new_updates([update])
            return '', 200
        return 'Bad Request', 400

    @app.route("/setup-bus-webhook", methods=["GET"])
    def setup_bus_webhook():
        bus_webhook_url = f"{SERVER_URL.rstrip('/')}/bus-telegram"
        try:
            bot.remove_webhook()
            success = bot.set_webhook(url=bus_webhook_url)
            return f"✅ Підгородне Bot Webhook успішно зареєстровано на: {bus_webhook_url} (успіх: {success})", 200
        except Exception as e:
            return f"❌ Помилка налаштування Webhook: {e}", 500

    print("🚌 Маршрути Підгородне Bus успішно підключено до Flask!", flush=True)
