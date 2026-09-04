#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Telegram Bot для перегляду розкладу автобусів:
Тернопіль (McDonald's / АС-2) ↔ Підгородне (Нижня зупинка)
"""

import os
import sys
from datetime import datetime, timezone, timedelta
try:
    import zoneinfo
    KYIV_TZ = zoneinfo.ZoneInfo("Europe/Kyiv")
except Exception:
    # Fallback to UTC+2/UTC+3
    KYIV_TZ = timezone(timedelta(hours=3))

import telebot
from telebot import types

# ТОКЕН БОТА: вставте сюди свій токен від @BotFather або задайте через змінну оточення TG_BOT_TOKEN
TOKEN = os.getenv("TG_BOT_TOKEN", "YOUR_TELEGRAM_BOT_TOKEN_HERE")

bot = telebot.TeleBot(TOKEN)

# Маршрути
ROUTES = {
    'pidg': {'code': 'Підг', 'name': 'Підгородне (пряма)', 'icon': '🟢', 'is_direct': True},
    'drag': {'code': 'Драг', 'name': 'Драганівка / Почапинці', 'icon': '🔵', 'is_direct': True},
    'zab':  {'code': 'Заб',  'name': 'Забойки', 'icon': '🟡', 'is_direct': True},
    'dom':  {'code': 'Дом',  'name': 'Домаморич', 'icon': '🟣', 'is_direct': True},
    '40':   {'code': '№40',  'name': '№40 (Кладовище / Центр)', 'icon': '🔴', 'is_direct': False}
}

# Розклад: Тернопіль ➔ Підгородне (час виїзду з АС-2, №40 з Центру)
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

# Розклад: Підгородне ➔ Тернопіль (орієнтовний час посадки на Нижній зупинці)
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
    btn_mcd = types.KeyboardButton("🍔 Від McDonald's (зараз)")
    btn_pidg = types.KeyboardButton("🏡 З Нижньої (зараз)")
    btn_all_to_pidg = types.KeyboardButton("📅 Розклад: Тернопіль ➔ Село")
    btn_all_to_tern = types.KeyboardButton("📅 Розклад: Село ➔ Тернопіль")
    btn_warn = types.KeyboardButton("⚠️ Важливо про №40")
    markup.add(btn_mcd, btn_pidg)
    markup.add(btn_all_to_pidg, btn_all_to_tern)
    markup.add(btn_warn)
    return markup

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    text = (
        "🚌 <b>Розклад автобусів: Підгородне ↔ Тернопіль</b>\n"
        "Спеціально налаштовано під зупинки: <b>McDonald's (Мазепи)</b> та <b>Нижня зупинка (село)</b>.\n\n"
        "Оберіть дію в меню нижче 👇"
    )
    bot.send_message(message.chat.id, text, parse_mode="HTML", reply_markup=build_main_keyboard())

@bot.message_handler(func=lambda m: m.text == "🍔 Від McDonald's (зараз)")
def next_from_mcd(message):
    now = get_kyiv_now()
    cur_m = now.hour * 60 + now.minute
    
    # Фільтруємо рейси (бажано прямі, але показуємо і наступний)
    upcoming = []
    for dep_time, r_type in SCHEDULE_TO_PIDG:
        dep_m = parse_minutes(dep_time)
        # Біля McDonald's автобус за ~6 хв після АС-2
        mcd_m = dep_m + (8 if r_type == '40' else 6)
        diff = mcd_m - cur_m
        if diff >= -2:  # якщо автобус був 1-2 хв тому, він якраз може під'їжджати
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

    # Беремо 3 найближчі
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

if __name__ == "__main__":
    print("Bot is starting...")
    if TOKEN == "YOUR_TELEGRAM_BOT_TOKEN_HERE":
        print("УВАГА: Будь ласка, вкажіть реальний Telegram токен у файлі bot.py або через змінну TG_BOT_TOKEN!")
    bot.infinity_polling()
