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
from flask import request, Response, send_file

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

# Створюємо екземпляр бота (threaded=False для WSGI на PythonAnywhere)
bot = telebot.TeleBot(BUS_TOKEN, threaded=False)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


ROUTES = {
    'pidg': {'code': 'Підг', 'name': 'Підгородне (пряма)', 'icon': '🟢'},
    'drag': {'code': 'Драг', 'name': 'Драганівка / Почапинці', 'icon': '🔵'},
    'zab':  {'code': 'Заб',  'name': 'Забойки', 'icon': '🟡'},
    'dom':  {'code': 'Дом',  'name': 'Домаморич', 'icon': '🟣'},
    '40':   {'code': '№40',  'name': '№40 (Кладовище / Центр)', 'icon': '🔴'}
}

SCHEDULE_TO_PIDG = [
    ("06:30", "drag"), ("06:40", "pidg"), ("06:45", "zab"), ("07:10", "drag"),
    ("07:25", "dom"),  ("07:45", "pidg"), ("07:50", "drag"), ("08:15", "zab"),
    ("08:40", "pidg"), ("08:40", "drag"), ("09:10", "40"),   ("09:30", "drag"),
    ("09:40", "zab"),  ("10:10", "40"),   ("10:15", "pidg"), ("10:30", "drag"),
    ("11:10", "40"),   ("11:30", "zab"),  ("11:45", "drag"), ("11:55", "dom"),
    ("12:00", "pidg"), ("12:10", "40"),   ("13:00", "drag"), ("13:45", "pidg"),
    ("14:00", "zab"),  ("14:10", "40"),   ("14:15", "drag"), ("14:55", "dom"),
    ("15:10", "pidg"), ("15:10", "40"),   ("15:30", "drag"), ("15:45", "zab"),
    ("16:10", "40"),   ("16:30", "drag"), ("16:40", "pidg"), ("17:10", "40"),
    ("17:30", "drag"), ("17:45", "zab"),  ("17:55", "dom"),  ("18:00", "pidg"),
    ("18:30", "drag"), ("19:20", "pidg"), ("19:30", "zab"),  ("19:30", "drag"),
    ("20:15", "drag")
]

SCHEDULE_TO_TERN = [
    ("07:00", "drag"), ("07:05", "pidg"), ("07:20", "zab"), ("07:40", "drag"),
    ("08:05", "dom"),  ("08:10", "pidg"), ("08:20", "drag"), ("08:50", "zab"),
    ("09:10", "pidg"), ("09:10", "drag"), ("09:40", "40"),   ("10:00", "drag"),
    ("10:15", "zab"),  ("10:40", "40"),   ("10:45", "pidg"), ("11:00", "drag"),
    ("11:40", "40"),   ("12:05", "zab"),  ("12:15", "drag"), ("12:30", "pidg"),
    ("12:35", "dom"),  ("12:40", "40"),   ("13:30", "drag"), ("14:15", "pidg"),
    ("14:35", "zab"),  ("14:40", "40"),   ("14:45", "drag"), ("15:35", "dom"),
    ("15:40", "pidg"), ("15:40", "40"),   ("15:50", "drag"), ("16:20", "zab"),
    ("16:40", "40"),   ("16:50", "drag"), ("17:10", "pidg"), ("17:40", "40"),
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
    # Головна велика кнопка для відкриття сайту прямо в Telegram
    btn_webapp = types.KeyboardButton("🌐 Відкрити онлайн-розклад", web_app=types.WebAppInfo(url=WEBAPP_URL))
    btn_mcd = types.KeyboardButton("🍔 Від McDonald's (зараз)")
    btn_pidg = types.KeyboardButton("🏡 З Нижньої (зараз)")
    btn_all_to_pidg = types.KeyboardButton("📅 Розклад: Тернопіль ➔ Село")
    btn_all_to_tern = types.KeyboardButton("📅 Розклад: Село ➔ Тернопіль")
    btn_img = types.KeyboardButton("🖼️ Фото розкладу та PDF")
    btn_clean = types.KeyboardButton("🧹 Очистити кеш сайту")
    btn_warn = types.KeyboardButton("⚠️ Важливо про №40")
    
    markup.add(btn_webapp)
    markup.add(btn_mcd, btn_pidg)
    markup.add(btn_all_to_pidg, btn_all_to_tern)
    markup.add(btn_img, btn_clean)
    markup.add(btn_warn)
    return markup

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    text = (
        "🚌 <b>Розклад автобусів: Підгородне ↔ Тернопіль</b>\n"
        "Спеціально для Уляни під зупинки: <b>McDonald's (Мазепи)</b> та <b>Нижня зупинка (село)</b>.\n\n"
        "Натискай кнопки нижче або відкривай повний онлайн-сайт розкладу 👇"
    )
    inline_markup = types.InlineKeyboardMarkup()
    inline_markup.add(types.InlineKeyboardButton("📲 Відкрити повний сайт (Mini App)", web_app=types.WebAppInfo(url=WEBAPP_URL)))
    
    bot.send_message(message.chat.id, text, parse_mode="HTML", reply_markup=build_main_keyboard())
    bot.send_message(message.chat.id, "✨ Натисни кнопку, щоб відкрити живий онлайн-таймер:", reply_markup=inline_markup)

@bot.message_handler(commands=['site', 'app', 'link'])
def send_site_link(message):
    inline_markup = types.InlineKeyboardMarkup()
    inline_markup.add(types.InlineKeyboardButton("📲 Відкрити онлайн-сайт", web_app=types.WebAppInfo(url=WEBAPP_URL)))
    text = (
        f"🌐 <b>Онлайн-сайт розкладу:</b>\n"
        f"<code>{WEBAPP_URL}</code>\n\n"
        f"Натисніть кнопку нижче, щоб відкрити його прямо тут у Telegram, або скопіюйте посилання у браузер."
    )
    bot.send_message(message.chat.id, text, parse_mode="HTML", reply_markup=inline_markup)

@bot.message_handler(func=lambda m: m.text == "🧹 Очистити кеш сайту" or m.text in ["/clean", "/refresh"])
def clean_site_cache(message):
    nocache_time = int(datetime.now().timestamp())
    clean_url = f"{WEBAPP_URL}?nocache={nocache_time}"
    inline_markup = types.InlineKeyboardMarkup()
    inline_markup.add(types.InlineKeyboardButton("🔄 Відкрити свіжий розклад (без кешу)", web_app=types.WebAppInfo(url=clean_url)))
    
    text = (
        "🧹 <b>Очищення кешу сайту:</b>\n\n"
        "Якщо в телефоні чи в Telegram відображається старий розклад або завис час:\n"
        "1. Натисніть кнопку нижче <b>«🔄 Відкрити свіжий розклад»</b> — вона відкриє сайт із примусовим оновленням даних.\n"
        "2. На самому сайті внизу також є червона кнопка <b>«🧹 Очистити кеш»</b>, яка видаляє старі збережені файли з пам'яті браузера."
    )
    bot.send_message(message.chat.id, text, parse_mode="HTML", reply_markup=inline_markup)

@bot.message_handler(func=lambda m: m.text == "🍔 Від McDonald's (зараз)")

def next_from_mcd(message):
    now = get_kyiv_now()
    cur_m = now.hour * 60 + now.minute
    
    upcoming = []
    for dep_time, r_type in SCHEDULE_TO_PIDG:
        dep_m = parse_minutes(dep_time)
        mcd_m = dep_m + (8 if r_type == '40' else 6)
        diff = mcd_m - cur_m
        if diff >= -2:
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
    
    if first_diff <= 0:
        diff_str = "<b>ПІД'ЇЖДЖАЄ ЗАРАЗ!</b>"
    elif first_diff == 1:
        diff_str = "<b>через 1 хвилину!</b>"
    else:
        diff_str = f"<b>через {first_diff} хв</b>"

    text = (
        f"🍔 <b>НАЙБЛИЖЧИЙ АВТОБУС БІЛЯ McDONALD'S:</b>\n"
        f"🕒 Орієнтовно: <b>~{minutes_to_str(first[2])}</b> ({diff_str})\n"
        f"📍 Виїзд з АС-2: <b>{first[0]}</b>\n"
        f"Маршрут: {first_route['icon']} <b>[{first_route['code']}] {first_route['name']}</b>\n"
    )
    if first[1] == '40':
        text += "⚠️ <i>Увага: цей автобус повертає на кладовище, до Нижньої не їде!</i>\n"
    else:
        text += "✅ <i>Їде через Нижню зупинку</i>\n"

    if len(top) > 1:
        text += "\n<b>Наступні рейси після нього:</b>\n"
        for item in top[1:]:
            r = ROUTES[item[1]]
            warn = " (⚠️ Кладовище)" if item[1] == '40' else ""
            text += f"• <b>~{minutes_to_str(item[2])}</b> — {r['icon']} [{r['code']}] {r['name']}{warn} (через {item[3]} хв)\n"

    bot.send_message(message.chat.id, text, parse_mode="HTML")

@bot.message_handler(func=lambda m: m.text == "🏡 З Нижньої (зараз)")
def next_from_pidg(message):
    now = get_kyiv_now()
    cur_m = now.hour * 60 + now.minute
    
    upcoming = []
    for dep_time, r_type in SCHEDULE_TO_TERN:
        dep_m = parse_minutes(dep_time)
        diff = dep_m - cur_m
        if diff >= -2:
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
    
    if first_diff <= 0:
        diff_str = "<b>ПІД'ЇЖДЖАЄ ЗАРАЗ!</b>"
    elif first_diff == 1:
        diff_str = "<b>через 1 хвилину!</b>"
    else:
        diff_str = f"<b>через {first_diff} хв</b>"

    mcd_time = minutes_to_str(first[2] + 11)

    text = (
        f"🏡 <b>НАЙБЛИЖЧИЙ АВТОБУС З НИЖНЬОЇ ЗУПИНКИ:</b>\n"
        f"🕒 Посадка в селі: <b>{first[0]}</b> ({diff_str})\n"
        f"🏁 Прибуття до McDonald's: <b>~{mcd_time}</b>\n"
        f"Маршрут: {first_route['icon']} <b>[{first_route['code']}] {first_route['name']}</b>\n"
    )
    if first[1] == '40':
        text += "⚠️ <i>Посадка біля міського кладовища</i>\n"

    if len(top) > 1:
        text += "\n<b>Наступні автобуси:</b>\n"
        for item in top[1:]:
            r = ROUTES[item[1]]
            text += f"• <b>{item[0]}</b> — {r['icon']} [{r['code']}] {r['name']} (через {item[3]} хв)\n"

    bot.send_message(message.chat.id, text, parse_mode="HTML")

@bot.message_handler(func=lambda m: m.text == "📅 Розклад: Тернопіль ➔ Село")
def full_to_pidg(message):
    text = "🚌 <b>ТЕРНОПІЛЬ ➔ ПІДГОРОДНЕ</b>\n<i>(час з АС-2 / ~+6 хв біля McDonald's)</i>\n\n"
    for t, r_key in SCHEDULE_TO_PIDG:
        r = ROUTES[r_key]
        mcd = minutes_to_str(parse_minutes(t) + (8 if r_key == '40' else 6))
        warn = " ⚠️(Кладовище)" if r_key == '40' else ""
        text += f"• <b>{t}</b> (~{mcd} Мак) — {r['icon']} [{r['code']}]{warn}\n"
    bot.send_message(message.chat.id, text, parse_mode="HTML")

@bot.message_handler(func=lambda m: m.text == "📅 Розклад: Село ➔ Тернопіль")
def full_to_tern(message):
    text = "🏡 <b>ПІДГОРОДНЕ ➔ ТЕРНОПІЛЬ</b>\n<i>(посадка в селі / ~+11 хв до McDonald's)</i>\n\n"
    for t, r_key in SCHEDULE_TO_TERN:
        r = ROUTES[r_key]
        mcd = minutes_to_str(parse_minutes(t) + 11)
        warn = " ⚠️(з кладовища)" if r_key == '40' else ""
        text += f"• <b>{t}</b> (~{mcd} до Маку) — {r['icon']} [{r['code']}]{warn}\n"
    bot.send_message(message.chat.id, text, parse_mode="HTML")

@bot.message_handler(func=lambda m: m.text == "⚠️ Важливо про №40")
def info_warning(message):
    text = (
        "⚠️ <b>ВАЖЛИВА ІНФОРМАЦІЯ ПРО АВТОБУС №40:</b>\n\n"
        "1. Автобус №40 — це міський маршрут (їде з Центру повз McDonald's на Мазепи).\n"
        "2. <b>Він звертає до МІСЬКОГО КЛАДОВИЩА</b> і <b>НЕ ЇДЕ</b> до Нижньої зупинки в Підгородньому!\n"
        "3. Щоб дістатися саме до Нижньої зупинки, Уляні потрібно сідати на:\n"
        "   🟢 <b>[Підг]</b> — прямий Підгородне\n"
        "   🔵 <b>[Драг]</b> — Драганівка / Почапинці\n"
        "   🟡 <b>[Заб]</b> — Забойки\n"
        "   🟣 <b>[Дом]</b> — Домаморич\n\n"
        "💡 <i>Всі ці приміські автобуси виїжджають з АС-2 (Білогірська) і їдуть через вул. Мазепи прямо повз McDonald's (+5–7 хв після старту).</i>"
    )
    bot.send_message(message.chat.id, text, parse_mode="HTML")

@bot.message_handler(func=lambda m: m.text == "🖼️ Фото розкладу та PDF")
def send_files(message):
    bot.send_message(message.chat.id, "Надсилаю зручні фото розкладу та PDF...")
    p1 = os.path.join(BASE_DIR, "ternopil_to_pidhorodne_mobile.png")
    p2 = os.path.join(BASE_DIR, "pidhorodne_to_ternopil_mobile.png")
    p_all = os.path.join(BASE_DIR, "rozklad_all_in_one.png")
    pdf_file = os.path.join(BASE_DIR, "rozklad_pidhorodne_ternopil.pdf")

    if os.path.exists(p_all):
        with open(p_all, 'rb') as f:
            bot.send_photo(message.chat.id, f, caption="📋 <b>Зведений розклад</b> (обидва напрямки)", parse_mode="HTML")

    if os.path.exists(p1):
        with open(p1, 'rb') as f:
            bot.send_photo(message.chat.id, f, caption="🍔 <b>Тернопіль ➔ Підгородне</b> (McDonald's ➔ Нижня зупинка)", parse_mode="HTML")

    if os.path.exists(p2):
        with open(p2, 'rb') as f:
            bot.send_photo(message.chat.id, f, caption="🏡 <b>Підгородне ➔ Тернопіль</b> (Нижня зупинка ➔ McDonald's)", parse_mode="HTML")

    if os.path.exists(pdf_file):
        with open(pdf_file, 'rb') as f:
            bot.send_document(message.chat.id, f, caption="📑 <b>Розклад у PDF</b> (можна зберегти у Файли)", parse_mode="HTML")

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
