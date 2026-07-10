#!/usr/bin/env python3
# Generate XHS cover (1080x1440), XHS content card (1080x1440), LinkedIn card (1200x627)
from PIL import Image, ImageDraw, ImageFont
import os

BASE = "/sessions/youthful-relaxed-galileo/mnt/product-analytics"
XHS = os.path.join(BASE, "xiaohongshu/2026-07-10")
LI = os.path.join(BASE, "linkedin/2026-07-10")
os.makedirs(XHS, exist_ok=True); os.makedirs(LI, exist_ok=True)

BOLD_TTC = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
REG_TTC  = "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"

def sc_index(path):
    for i in range(10):
        try:
            f = ImageFont.truetype(path, 20, index=i)
            fam = f.getname()[0]
            if fam == "Noto Sans CJK SC":
                return i
        except Exception:
            break
    return 0

BI = sc_index(BOLD_TTC); RI = sc_index(REG_TTC)
def bold(sz): return ImageFont.truetype(BOLD_TTC, sz, index=BI)
def reg(sz):  return ImageFont.truetype(REG_TTC, sz, index=RI)

def vgrad(w, h, c1, c2):
    img = Image.new("RGB", (w, h))
    d = ImageDraw.Draw(img)
    for y in range(h):
        t = y / (h - 1)
        d.line([(0, y), (w, y)], fill=tuple(int(a + (b - a) * t) for a, b in zip(c1, c2)))
    return img

def ctext(d, cx, y, txt, font, fill):
    w = d.textlength(txt, font=font)
    d.text((cx - w / 2, y), txt, font=font, fill=fill)
    return w

INK = (26, 29, 41); ORG = (255, 92, 40); BLUE = (15, 98, 254); GRAY = (100, 106, 122)

# ---------------- 1) XHS COVER 1080x1440 ----------------
img = vgrad(1080, 1440, (255, 244, 228), (255, 221, 205))
d = ImageDraw.Draw(img)
# top pill
pill_w, pill_h, py = 460, 76, 90
d.rounded_rectangle([(1080-pill_w)//2, py, (1080+pill_w)//2, py+pill_h], 38, fill=INK)
ctext(d, 540, py+14, "每日产品趋势 · 7月10日", bold(38), (255, 248, 240))
# big title
ctext(d, 540, 250, "AI不卷模型了", bold(128), INK)
# highlight behind second line
t2 = "开始卷省钱"
f2 = bold(128); w2 = d.textlength(t2, font=f2)
hx1, hy1 = 540 - w2/2 - 28, 430; hx2, hy2 = 540 + w2/2 + 28, 430 + 168
d.rounded_rectangle([hx1, hy1, hx2, hy2], 32, fill=ORG)
ctext(d, 540, 442, t2, f2, (255, 255, 255))
ctext(d, 540, 650, "「省钱工具」集体冲上HN首页", reg(46), (90, 70, 60))
# white card with 4 rows
cx1, cy1, cx2, cy2 = 70, 760, 1010, 1260
d.rounded_rectangle([cx1, cy1, cx2, cy2], 36, fill=(255, 255, 255))
rows = [
    ("1", BLUE,  "语音听写 Wispr 估值冲 $2B"),
    ("2", ORG,   "「无摄像头」眼镜融资 $1B"),
    ("3", (14, 131, 69), "Agent界的Terraform来了"),
    ("4", (123, 97, 255), "纤维拉满搜索 +115%"),
]
ry = cy1 + 52
for n, c, t in rows:
    d.ellipse([cx1+56, ry, cx1+56+64, ry+64], fill=c)
    nw = d.textlength(n, font=bold(40))
    d.text((cx1+56+32-nw/2, ry+6), n, font=bold(40), fill=(255,255,255))
    d.text((cx1+156, ry+2), t, font=bold(50), fill=INK)
    ry += 112
# bottom
ctext(d, 540, 1310, "商业逻辑逐个拆解｜今日全球8大信号", bold(42), INK)
ctext(d, 540, 1372, "#AI趋势 #产品观察 #商业分析 #科技日报", reg(34), (172, 120, 90))
img.save(os.path.join(XHS, "cover.png"))

# ---------------- 2) XHS CONTENT CARD 1080x1440 ----------------
img = vgrad(1080, 1440, (247, 248, 252), (233, 238, 250))
d = ImageDraw.Draw(img)
ctext(d, 540, 80, "今天值得抄的4个作业", bold(88), INK)
d.rounded_rectangle([390, 200, 690, 212], 6, fill=ORG)
cards = [
    ("① AI降本成新赛道", "Frugon / Foreman 开源霸榜HN", "连OpenAI都开卖便宜档位 Flex"),
    ("② 隐私 = 溢价", "一周两家$1B：去摄像头眼镜、无监控AI", "Wispr截屏丑闻反向验证（2.7分）"),
    ("③ 语音输入开战", "Wispr估值$2B vs Willow宣称1.2%错词率", "决胜项：隐私×稳定×工作流"),
    ("④ 纤维经济爆发", "fibermaxxing搜索+115% 销售+20%", "可乐雀巢下场，GLP-1外溢红利"),
]
y = 260
for title, l1, l2 in cards:
    d.rounded_rectangle([70, y, 1010, y+236], 28, fill=(255, 255, 255))
    d.rounded_rectangle([70, y, 88, y+236], 9, fill=BLUE)
    d.text((120, y+30), title, font=bold(54), fill=INK)
    d.text((120, y+108), l1, font=reg(40), fill=(60, 65, 80))
    d.text((120, y+164), l2, font=reg(40), fill=GRAY)
    y += 268
ctext(d, 540, y+16, "每日产品趋势 · 2026.07.10 · 详细拆解见正文", reg(36), GRAY)
img.save(os.path.join(XHS, "card-4-signals.png"))

# ---------------- 3) LINKEDIN 1200x627 ----------------
img = vgrad(1200, 627, (13, 22, 52), (18, 42, 94))
d = ImageDraw.Draw(img)
d.rounded_rectangle([64, 62, 76, 190], 6, fill=ORG)
d.text((100, 60), "DAILY PRODUCT TRENDS — JULY 10, 2026", font=bold(24), fill=(122, 156, 224))
d.text((96, 104), "The Efficiency Turn", font=bold(88), fill=(255, 255, 255))
d.text((100, 224), "AI's story just pivoted from capability to cost — and privacy became a moat.",
       font=reg(30), fill=(185, 204, 242))
tiles = [
    ("+254%", "AI app revenue YoY", "fastest category"),
    ("~$2B", "Wispr Flow in talks", "voice war ignites"),
    ("2×$1B", "privacy unicorns/wk", "no-camera, private AI"),
    ("+115%", "fibermaxxing search", "GLP-1 spillover"),
]
tw, th, gap, x0, y0 = 254, 210, 22, 96, 320
x = x0
for big, s1, s2 in tiles:
    d.rounded_rectangle([x, y0, x+tw, y0+th], 20, fill=(255, 255, 255, 255))
    d.text((x+22, y0+26), big, font=bold(52), fill=BLUE)
    d.text((x+22, y0+108), s1, font=bold(21), fill=INK)
    d.text((x+22, y0+146), s2, font=reg(20), fill=GRAY)
    x += tw + gap
d.text((100, 566), "HN cost-tool sweep · Kastor 'Terraform for agents' · Willow Atlas 1 vs Wispr · Even Realities $150M",
       font=reg(22), fill=(122, 156, 224))
img.save(os.path.join(LI, "linkedin-card.png"))

for p in [os.path.join(XHS,"cover.png"), os.path.join(XHS,"card-4-signals.png"), os.path.join(LI,"linkedin-card.png")]:
    print(p, os.path.getsize(p)//1024, "KB")
print("SC index bold/reg:", BI, RI)
