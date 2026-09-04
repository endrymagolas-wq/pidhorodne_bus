#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Генератор графічних шпаргалок розкладу автобусів для смартфона (PNG та PDF)
Тернопіль (McDonald's / АС-2) <-> Підгородне (Нижня зупинка)
"""

import os
from PIL import Image, ImageDraw, ImageFont
import fitz  # PyMuPDF

FONT_DIR = r"C:\Windows\Fonts"
FONT_REGULAR = os.path.join(FONT_DIR, "segoeui.ttf")
FONT_BOLD = os.path.join(FONT_DIR, "segoeuib.ttf")
FONT_SEMIBOLD = os.path.join(FONT_DIR, "segoeuisl.ttf")

ROUTES_CONFIG = {
    'pidg': {'code': 'Підг', 'name': 'Підгородне', 'color': (74, 222, 128), 'bg': (16, 45, 28)},
    'drag': {'code': 'Драг', 'name': 'Драганівка', 'color': (96, 165, 250), 'bg': (18, 38, 63)},
    'zab':  {'code': 'Заб',  'name': 'Забойки',    'color': (250, 204, 21), 'bg': (50, 42, 12)},
    'dom':  {'code': 'Дом',  'name': 'Домаморич',  'color': (192, 132, 252), 'bg': (42, 22, 60)},
    '40':   {'code': '№40',  'name': 'Кладовище',  'color': (248, 113, 113), 'bg': (55, 18, 22)}
}

SCHEDULE_TO_PIDG = [
    # Morning (20)
    ("06:30", "drag", "ранок"), ("06:40", "pidg", "ранок"), ("06:45", "zab", "ранок"),
    ("07:10", "drag", "ранок"), ("07:25", "dom", "ранок"),  ("07:45", "pidg", "ранок"),
    ("07:50", "drag", "ранок"), ("08:15", "zab", "ранок"),  ("08:40", "pidg", "ранок"),
    ("08:40", "drag", "ранок"), ("09:10", "40", "ранок"),   ("09:30", "drag", "ранок"),
    ("09:40", "zab", "ранок"),  ("10:10", "40", "ранок"),   ("10:15", "pidg", "ранок"),
    ("10:30", "drag", "ранок"), ("11:10", "40", "ранок"),   ("11:30", "zab", "ранок"),
    ("11:45", "drag", "ранок"), ("11:55", "dom", "ранок"),
    # Day (13)
    ("12:00", "pidg", "день"),  ("12:10", "40", "день"),    ("13:00", "drag", "день"),
    ("13:45", "pidg", "день"),  ("14:00", "zab", "день"),   ("14:10", "40", "день"),
    ("14:15", "drag", "день"),  ("14:55", "dom", "день"),   ("15:10", "pidg", "день"),
    ("15:10", "40", "день"),    ("15:30", "drag", "день"),   ("15:45", "zab", "день"),
    ("16:10", "40", "день"),
    # Evening (12)
    ("16:30", "drag", "вечір"), ("16:40", "pidg", "вечір"), ("17:10", "40", "вечір"),
    ("17:30", "drag", "вечір"), ("17:45", "zab", "вечір"),  ("17:55", "dom", "вечір"),
    ("18:00", "pidg", "вечір"), ("18:30", "drag", "вечір"), ("19:20", "pidg", "вечір"),
    ("19:30", "zab", "вечір"),  ("19:30", "drag", "вечір"), ("20:15", "drag", "вечір")
]

SCHEDULE_TO_TERN = [
    # Morning (16)
    ("07:00", "drag", "ранок"), ("07:05", "pidg", "ранок"), ("07:20", "zab", "ранок"),
    ("07:40", "drag", "ранок"), ("08:05", "dom", "ранок"),  ("08:10", "pidg", "ранок"),
    ("08:20", "drag", "ранок"), ("08:50", "zab", "ранок"),  ("09:10", "pidg", "ранок"),
    ("09:10", "drag", "ранок"), ("09:40", "40", "ранок"),   ("10:00", "drag", "ранок"),
    ("10:15", "zab", "ранок"),  ("10:40", "40", "ранок"),   ("10:45", "pidg", "ранок"),
    ("11:00", "drag", "ранок"), ("11:40", "40", "ранок"),
    # Day (14)
    ("12:05", "zab", "день"),   ("12:15", "drag", "день"),  ("12:30", "pidg", "день"),
    ("12:35", "dom", "день"),   ("12:40", "40", "день"),    ("13:30", "drag", "день"),
    ("14:15", "pidg", "день"),  ("14:35", "zab", "день"),   ("14:40", "40", "день"),
    ("14:45", "drag", "день"),  ("15:35", "dom", "день"),   ("15:40", "pidg", "день"),
    ("15:40", "40", "день"),    ("15:50", "drag", "день"),   ("16:20", "zab", "день"),
    ("16:40", "40", "день"),
    # Evening (11)
    ("16:50", "drag", "вечір"), ("17:10", "pidg", "вечір"), ("17:40", "40", "вечір"),
    ("17:50", "drag", "вечір"), ("18:20", "zab", "вечір"),  ("18:30", "pidg", "вечір"),
    ("18:35", "dom", "вечір"),  ("18:50", "drag", "вечір"), ("19:45", "pidg", "вечір"),
    ("19:50", "drag", "вечір"), ("20:05", "zab", "вечір")
]

def add_mins(t_str, mins):
    h, m = map(int, t_str.split(':'))
    tot = (h * 60 + m + mins) % (24 * 60)
    return f"{tot // 60:02d}:{tot % 60:02d}"

def draw_rounded_rect(draw, bbox, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(bbox, radius=radius, fill=fill, outline=outline, width=width)

def draw_dot(draw, cx, cy, radius, color):
    draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=color)

def render_direction_image(is_to_pidg, filename):
    # Dimensions: 1080 x 2340 (Standard 19.5:9 smartphone resolution)
    W, H = 1080, 2340
    img = Image.new("RGBA", (W, H), (11, 15, 25, 255))
    draw = ImageDraw.Draw(img)

    f_title = ImageFont.truetype(FONT_BOLD, 46)
    f_sub = ImageFont.truetype(FONT_REGULAR, 23)
    f_badge = ImageFont.truetype(FONT_BOLD, 21)
    f_section = ImageFont.truetype(FONT_BOLD, 26)
    f_time = ImageFont.truetype(FONT_BOLD, 29)
    f_mcd = ImageFont.truetype(FONT_SEMIBOLD, 19)
    f_warn_title = ImageFont.truetype(FONT_BOLD, 22)
    f_note = ImageFont.truetype(FONT_REGULAR, 19)

    # 1. Header Card
    draw_rounded_rect(draw, (40, 45, W - 40, 240), 22, fill=(21, 29, 48), outline=(36, 48, 79), width=2)
    
    if is_to_pidg:
        title_text = "ТЕРНОПІЛЬ  ->  ПІДГОРОДНЕ"
        sub_text = "Посадка: біля McDonald's (вул. Мазепи)  *  Фініш: Нижня зупинка"
        offset_text = "Автобус біля McDonald's: приблизно через 5-7 хв після виїзду з АС-2"
        data = SCHEDULE_TO_PIDG
    else:
        title_text = "ПІДГОРОДНЕ  ->  ТЕРНОПІЛЬ"
        sub_text = "Посадка: Нижня зупинка в селі  *  До McDonald's: ~10-12 хв"
        offset_text = "Час посадки на центральній дорозі Підгороднього"
        data = SCHEDULE_TO_TERN

    # Title with icon dot
    draw_dot(draw, 72, 92, 10, (56, 189, 248))
    draw.text((95, 68), title_text, font=f_title, fill=(248, 250, 252))
    draw.text((70, 132), sub_text, font=f_sub, fill=(148, 163, 184))
    draw.text((70, 172), offset_text, font=f_sub, fill=(56, 189, 248))

    # 2. Warning Card
    draw_rounded_rect(draw, (40, 260, W - 40, 375), 18, fill=(35, 20, 25), outline=(239, 68, 68), width=2)
    draw_dot(draw, 68, 292, 8, (239, 68, 68))
    draw.text((86, 278), "ВАЖЛИВО ДЛЯ УЛЯНИ ПРО АВТОБУС №40:", font=f_warn_title, fill=(248, 113, 113))
    draw.text((65, 312), "* Маршрут №40 повертає на МІСЬКЕ КЛАДОВИЩЕ і НЕ доїжджає до Нижньої зупинки!", font=f_note, fill=(254, 202, 202))
    draw.text((65, 340), "* Щоб вийти на Нижній, сідайте на: [Підг], [Драг], [Заб] або [Дом].", font=f_note, fill=(187, 247, 208))

    # 3. Legend Bar
    legend_y = 395
    draw_rounded_rect(draw, (40, legend_y, W - 40, legend_y + 60), 14, fill=(17, 24, 39), outline=(36, 48, 79), width=1)
    lx = 60
    for k, r in ROUTES_CONFIG.items():
        box_w = 175 if k != 'dom' else 185
        draw_rounded_rect(draw, (lx, legend_y + 10, lx + box_w, legend_y + 50), 10, fill=r['bg'], outline=r['color'], width=1)
        draw_dot(draw, lx + 20, legend_y + 30, 6, r['color'])
        draw.text((lx + 34, legend_y + 18), f"[{r['code']}] {r['name'][:4]}", font=f_badge, fill=r['color'])
        lx += box_w + 14

    # 4. Schedule Columns: Left: Morning, Right: Day & Evening
    start_y = 480
    col1_x = 40
    col2_x = W // 2 + 10
    col_w = W // 2 - 50

    morning_buses = [b for b in data if b[2] == "ранок"]
    day_buses = [b for b in data if b[2] == "день"]
    evening_buses = [b for b in data if b[2] == "вечір"]

    row_h = 58  # 58px gives plenty of breathing room in 2340px height

    def draw_bus_row(x, y, bus):
        t, r_key, _ = bus
        rc = ROUTES_CONFIG[r_key]
        
        if is_to_pidg:
            mcd_t = add_mins(t, 8 if r_key == '40' else 6)
            sub_label = f"~{mcd_t} Мак"
        else:
            mcd_t = add_mins(t, 11)
            sub_label = f"~{mcd_t} Мак"

        is_40 = (r_key == '40')
        row_bg = (28, 18, 22) if is_40 else (21, 29, 48)
        border_col = (180, 50, 50) if is_40 else (36, 48, 79)
        
        draw_rounded_rect(draw, (x, y, x + col_w, y + row_h - 6), 10, fill=row_bg, outline=border_col, width=1)

        # Time
        draw.text((x + 14, y + 10), t, font=f_time, fill=(255, 255, 255))
        draw.text((x + 115, y + 16), sub_label, font=f_mcd, fill=(56, 189, 248) if is_to_pidg else (74, 222, 128))

        # Badge
        badge_x = x + col_w - 150
        draw_rounded_rect(draw, (badge_x, y + 9, x + col_w - 10, y + row_h - 15), 8, fill=rc['bg'], outline=rc['color'], width=1)
        draw_dot(draw, badge_x + 14, y + 25, 5, rc['color'])
        badge_str = f"[{rc['code']}] {rc['name'][:4]}" if not is_40 else "№40 Кладов."
        draw.text((badge_x + 24, y + 14), badge_str, font=f_badge, fill=rc['color'])

    # Column 1: Morning
    draw_dot(draw, col1_x + 18, start_y + 14, 7, (56, 189, 248))
    draw.text((col1_x + 34, start_y), "РАНОК (до 12:00)", font=f_section, fill=(56, 189, 248))
    cy = start_y + 42
    for b in morning_buses:
        draw_bus_row(col1_x, cy, b)
        cy += row_h

    # Column 2: Day & Evening
    draw_dot(draw, col2_x + 18, start_y + 14, 7, (250, 204, 21))
    draw.text((col2_x + 34, start_y), "ДЕНЬ (12:00 - 16:29)", font=f_section, fill=(250, 204, 21))
    cy2 = start_y + 42
    for b in day_buses:
        draw_bus_row(col2_x, cy2, b)
        cy2 += row_h

    cy2 += 16
    draw_dot(draw, col2_x + 18, cy2 + 14, 7, (192, 132, 252))
    draw.text((col2_x + 34, cy2), "ВЕЧІР (після 16:30)", font=f_section, fill=(192, 132, 252))
    cy2 += 42
    for b in evening_buses:
        draw_bus_row(col2_x, cy2, b)
        cy2 += row_h

    # Footer
    draw_rounded_rect(draw, (40, H - 90, W - 40, H - 30), 14, fill=(17, 24, 39), outline=(36, 48, 79), width=1)
    footer_text = "Збережіть це зображення в Галерею або Збережене Telegram для швидкого доступу!"
    draw.text((70, H - 68), footer_text, font=f_note, fill=(148, 163, 184))

    img.save(filename, "PNG", quality=95)
    print(f"Saved: {filename}")
    return filename

def render_all_in_one_image(filename):
    # W: 1200, H: 2650 (to fit all 45 rows without cutting off)
    W, H = 1200, 2650
    img = Image.new("RGBA", (W, H), (11, 15, 25, 255))
    draw = ImageDraw.Draw(img)

    f_title = ImageFont.truetype(FONT_BOLD, 40)
    f_sub = ImageFont.truetype(FONT_REGULAR, 22)
    f_badge = ImageFont.truetype(FONT_BOLD, 20)
    f_col_header = ImageFont.truetype(FONT_BOLD, 25)
    f_time = ImageFont.truetype(FONT_BOLD, 24)
    f_mcd = ImageFont.truetype(FONT_SEMIBOLD, 18)
    f_note = ImageFont.truetype(FONT_REGULAR, 18)

    # Header Card
    draw_rounded_rect(draw, (30, 30, W - 30, 180), 20, fill=(21, 29, 48), outline=(36, 48, 79), width=2)
    draw_dot(draw, 56, 68, 9, (56, 189, 248))
    draw.text((76, 48), "ПІДГОРОДНЕ <-> ТЕРНОПІЛЬ (ЗВЕДЕНИЙ РОЗКЛАД)", font=f_title, fill=(248, 250, 252))
    draw.text((60, 102), "Зупинки: McDonald's (вул. Мазепи / Майдан Перемоги)  *  Нижня зупинка (село)", font=f_sub, fill=(148, 163, 184))
    draw.text((60, 136), "УВАГА: Автобус №40 їде тільки на міське кладовище і не доїжджає до Нижньої зупинки!", font=f_sub, fill=(248, 113, 113))

    # Two Main Panels side by side
    col_w = (W - 80) // 2
    col1_left = 30
    col2_left = 30 + col_w + 20

    panel_top = 200
    panel_bottom = H - 50

    # Panel 1: Ternopil -> Pidhorodne
    draw_rounded_rect(draw, (col1_left, panel_top, col1_left + col_w, panel_bottom), 18, fill=(15, 23, 42), outline=(56, 189, 248), width=2)
    draw_dot(draw, col1_left + 24, panel_top + 33, 7, (56, 189, 248))
    draw.text((col1_left + 40, panel_top + 20), "ТЕРНОПІЛЬ -> ПІДГОРОДНЕ", font=f_col_header, fill=(56, 189, 248))
    draw.text((col1_left + 24, panel_top + 55), "АС-2 (виїзд)  ->  ~McDonald's  ->  Нижня", font=f_note, fill=(148, 163, 184))

    # Panel 2: Pidhorodne -> Ternopil
    draw_rounded_rect(draw, (col2_left, panel_top, col2_left + col_w, panel_bottom), 18, fill=(15, 23, 42), outline=(34, 197, 94), width=2)
    draw_dot(draw, col2_left + 24, panel_top + 33, 7, (74, 222, 128))
    draw.text((col2_left + 40, panel_top + 20), "ПІДГОРОДНЕ -> ТЕРНОПІЛЬ", font=f_col_header, fill=(74, 222, 128))
    draw.text((col2_left + 24, panel_top + 55), "Нижня (посадка)  ->  ~McDonald's", font=f_note, fill=(148, 163, 184))

    row_h = 51
    row_y_start = panel_top + 95

    # Fill Panel 1
    y1 = row_y_start
    for t, r_key, _ in SCHEDULE_TO_PIDG:
        rc = ROUTES_CONFIG[r_key]
        mcd_t = add_mins(t, 8 if r_key == '40' else 6)
        is_40 = (r_key == '40')

        bg = (35, 20, 25) if is_40 else (21, 29, 48)
        border = (180, 50, 50) if is_40 else (30, 41, 59)
        draw_rounded_rect(draw, (col1_left + 15, y1, col1_left + col_w - 15, y1 + row_h - 6), 8, fill=bg, outline=border, width=1)

        draw.text((col1_left + 25, y1 + 10), t, font=f_time, fill=(255, 255, 255))
        draw.text((col1_left + 115, y1 + 14), f"~{mcd_t} Мак", font=f_mcd, fill=(56, 189, 248))

        badge_x = col1_left + col_w - 170
        draw_rounded_rect(draw, (badge_x, y1 + 8, col1_left + col_w - 25, y1 + row_h - 13), 6, fill=rc['bg'], outline=rc['color'], width=1)
        draw_dot(draw, badge_x + 14, y1 + 25, 4, rc['color'])
        b_label = f"[{rc['code']}] {rc['name'][:4]}" if not is_40 else "№40 Кладов."
        draw.text((badge_x + 22, y1 + 12), b_label, font=f_badge, fill=rc['color'])

        y1 += row_h

    # Fill Panel 2
    y2 = row_y_start
    for t, r_key, _ in SCHEDULE_TO_TERN:
        rc = ROUTES_CONFIG[r_key]
        mcd_t = add_mins(t, 11)
        is_40 = (r_key == '40')

        bg = (35, 20, 25) if is_40 else (21, 29, 48)
        border = (180, 50, 50) if is_40 else (30, 41, 59)
        draw_rounded_rect(draw, (col2_left + 15, y2, col2_left + col_w - 15, y2 + row_h - 6), 8, fill=bg, outline=border, width=1)

        draw.text((col2_left + 25, y2 + 10), t, font=f_time, fill=(255, 255, 255))
        draw.text((col2_left + 115, y2 + 14), f"~{mcd_t} Мак", font=f_mcd, fill=(74, 222, 128))

        badge_x = col2_left + col_w - 170
        draw_rounded_rect(draw, (badge_x, y2 + 8, col2_left + col_w - 25, y2 + row_h - 13), 6, fill=rc['bg'], outline=rc['color'], width=1)
        draw_dot(draw, badge_x + 14, y2 + 25, 4, rc['color'])
        b_label = f"[{rc['code']}] {rc['name'][:4]}" if not is_40 else "№40 Кладов."
        draw.text((badge_x + 22, y2 + 12), b_label, font=f_badge, fill=rc['color'])

        y2 += row_h

    img.save(filename, "PNG", quality=95)
    print(f"Saved: {filename}")
    return filename

def generate_pdf(img_files, pdf_filename):
    doc = fitz.open()
    for img_path in img_files:
        img = Image.open(img_path)
        rect = fitz.Rect(0, 0, img.width, img.height)
        page = doc.new_page(width=img.width, height=img.height)
        page.insert_image(rect, filename=img_path)
    doc.save(pdf_filename, deflate=True, garbage=4)
    doc.close()
    print(f"Saved PDF: {pdf_filename}")

if __name__ == "__main__":
    out_dir = r"C:\Users\andri\.gemini\antigravity\scratch\pidhorodne-bus"
    p1 = os.path.join(out_dir, "ternopil_to_pidhorodne_mobile.png")
    p2 = os.path.join(out_dir, "pidhorodne_to_ternopil_mobile.png")
    p3 = os.path.join(out_dir, "rozklad_all_in_one.png")
    pdf_path = os.path.join(out_dir, "rozklad_pidhorodne_ternopil.pdf")

    render_direction_image(True, p1)
    render_direction_image(False, p2)
    render_all_in_one_image(p3)
    generate_pdf([p3, p1, p2], pdf_path)
    print("All graphics updated successfully!")
