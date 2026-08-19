from __future__ import annotations

import html
import re
import shutil
from pathlib import Path


PROJECT_DIR = Path(__file__).resolve().parents[2]
OUTPUT_DIR = PROJECT_DIR / "拓扑图"
ASSET_DIR = OUTPUT_DIR / "assets"
CATALOG = Path(r"D:\Github\IQ\QNEXPreSaleToolBox\售前产品清单-4Gemini-2026-5-2.md")
CATALOG_IMAGE_DIR = CATALOG.parent / "img"
OUTPUT_HTML = OUTPUT_DIR / "GITEX-2026-展会系统拓扑-v0.1.html"


def parse_catalog(path: Path) -> dict[str, Path]:
    """Parse model -> local image path from the presales product catalog."""
    rows: dict[str, Path] = {}
    pattern = re.compile(
        r"^\|\s*([^|]+?)\s*\|[^|]*\|\s*<img\s+src=[\"']([^\"']+)[\"']",
        re.IGNORECASE,
    )
    for line in path.read_text(encoding="utf-8").splitlines():
        match = pattern.search(line)
        if not match:
            continue
        model = match.group(1).strip()
        source = match.group(2).replace("\\", "/")
        source = re.sub(r"^\./", "", source)
        image = CATALOG.parent / source
        rows.setdefault(model.casefold(), image)
    return rows


def asset_for(catalog: dict[str, Path], candidates: list[str]) -> str | None:
    for candidate in candidates:
        source = catalog.get(candidate.casefold())
        if not source or not source.exists():
            continue
        ASSET_DIR.mkdir(parents=True, exist_ok=True)
        destination = ASSET_DIR / source.name
        shutil.copy2(source, destination)
        return f"assets/{destination.name}"
    return None


def card(node: dict[str, object], image_path: str | None) -> str:
    x, y = node["x"], node["y"]
    w, h = node.get("w", 190), node.get("h", 96)
    label = html.escape(str(node["label"]))
    subtitle = html.escape(str(node.get("subtitle", "")))
    badge = html.escape(str(node.get("badge", "待确认")))
    badge_class = html.escape(str(node.get("badge_class", "pending")))
    initials = html.escape(str(node.get("initials", label[:2])))
    if image_path:
        visual = f'<img src="{html.escape(image_path)}" alt="{label}">'
    else:
        visual = f'<div class="placeholder">{initials}</div>'
    return f"""
    <article class="device" id="{node['id']}" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px">
      <div class="visual">{visual}</div>
      <div class="copy"><strong>{label}</strong><span>{subtitle}</span></div>
      <em class="badge {badge_class}">{badge}</em>
    </article>"""


def build() -> tuple[Path, list[str]]:
    catalog = parse_catalog(CATALOG)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    ASSET_DIR.mkdir(parents=True, exist_ok=True)

    nodes = [
        {"id": "group_controller", "label": "iPad / NDP600 + B3821", "subtitle": "控制端二选一；B3821 接入待确认", "x": 70, "y": 225, "w": 220, "candidates": ["NDP600", "iPad"], "badge": "选择待冻结", "badge_class": "pending", "initials": "控"},
        {"id": "tb1400", "label": "TB1400D Pro + OPS", "subtitle": "65-inch｜分组教学核心", "x": 315, "y": 225, "w": 205, "candidates": ["TB1400D Pro", "TB1400D"], "badge": "清单已列", "badge_class": "listed", "initials": "TB"},
        {"id": "student_a", "label": "WP55 + PD150", "subtitle": "学生端 A", "x": 555, "y": 180, "w": 190, "candidates": ["WP55"], "badge": "×1", "badge_class": "confirmed", "initials": "A"},
        {"id": "student_b", "label": "WP55 + PD150", "subtitle": "学生端 B", "x": 555, "y": 315, "w": 190, "candidates": ["PD150"], "badge": "×1", "badge_class": "confirmed", "initials": "B"},

        {"id": "cv870", "label": "CV870 Pro", "subtitle": "布局出现｜清单未明确", "x": 845, "y": 180, "w": 175, "candidates": ["CV870"], "badge": "冲突待核", "badge_class": "risk", "initials": "CV"},
        {"id": "cv210", "label": "CV210", "subtitle": "摄像机", "x": 845, "y": 290, "w": 175, "candidates": ["CV210"], "badge": "清单已列", "badge_class": "listed", "initials": "C2"},
        {"id": "audio_camera", "label": "S210 + C2500S", "subtitle": "拾音 + 五目摄像头", "x": 845, "y": 400, "w": 205, "candidates": ["S210"], "badge": "随人带 C2500S", "badge_class": "risk", "initials": "AV"},
        {"id": "lcs", "label": "LCS810", "subtitle": "录播主机", "x": 1110, "y": 270, "w": 200, "h": 110, "candidates": ["LCS810"], "badge": "组合核心", "badge_class": "confirmed", "initials": "LCS"},
        {"id": "lcs_display", "label": "显示 / 录制输出", "subtitle": "对应液晶与输出规格待确认", "x": 1365, "y": 270, "w": 170, "h": 110, "candidates": [], "badge": "阻塞 v0.2", "badge_class": "pending", "initials": "OUT"},

        {"id": "ldp100", "label": "LDP100 + OPS", "subtitle": "恢复为当前方案｜随人带", "x": 70, "y": 575, "w": 215, "candidates": ["LDP100"], "badge": "当前", "badge_class": "confirmed", "initials": "LDP"},
        {"id": "sl100", "label": "SL100", "subtitle": "数字讲台", "x": 70, "y": 705, "w": 215, "candidates": ["SL100"], "badge": "×1", "badge_class": "confirmed", "initials": "SL"},
        {"id": "podium_display", "label": "65-inch IFP", "subtitle": "HN1000 / QA1400 对应关系待定", "x": 345, "y": 625, "w": 220, "h": 110, "candidates": [], "badge": "映射待确认", "badge_class": "pending", "initials": "65"},
        {"id": "ps610", "label": "PS610", "subtitle": "清单 ×1；布局标记疑似两处", "x": 610, "y": 625, "w": 145, "h": 110, "candidates": ["PS610"], "badge": "数量冲突", "badge_class": "risk", "initials": "PS"},

        {"id": "nps", "label": "NPS150", "subtitle": "协作/BYOM 路径待确认", "x": 845, "y": 560, "w": 180, "candidates": ["NPS150"], "badge": "×1", "badge_class": "listed", "initials": "NPS"},
        {"id": "meeting_av", "label": "S350 + HY300", "subtitle": "音视频外设", "x": 1090, "y": 560, "w": 190, "candidates": ["S350", "HY300"], "badge": "清单已列", "badge_class": "listed", "initials": "AV"},
        {"id": "share", "label": "WP50 + C5 + H5", "subtitle": "无线传屏/按键", "x": 845, "y": 700, "w": 215, "candidates": ["WP50"], "badge": "清单已列", "badge_class": "listed", "initials": "BYOM"},
        {"id": "schedule", "label": "QCD100 + CPL50", "subtitle": "预约/小件；实接或静态待定", "x": 1090, "y": 700, "w": 215, "candidates": ["CPL50"], "badge": "演示方式待定", "badge_class": "pending", "initials": "RS"},
        {"id": "ifps", "label": "65-inch OPS Displays", "subtitle": "HN1000 Pro / QA1400 Pro / Ultra", "x": 1360, "y": 625, "w": 175, "h": 120, "candidates": [], "badge": "OPS 范围待核", "badge_class": "pending", "initials": "IFP"},
    ]

    node_html: list[str] = []
    missing: list[str] = []
    for node in nodes:
        candidates = list(node.get("candidates", []))
        asset = asset_for(catalog, candidates) if candidates else None
        if candidates and not asset:
            missing.append(str(node["label"]))
        node_html.append(card(node, asset))

    missing_text = "、".join(missing) if missing else "无"
    document = f"""<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GITEX 2026 展会系统拓扑 v0.1</title>
<style>
  :root {{ --ink:#172033; --muted:#637083; --blue:#1677ff; --teal:#0f9f89; --amber:#f59e0b; --red:#e5484d; --paper:#f4f7fb; }}
  * {{ box-sizing:border-box; }}
  html, body {{ width:100%; height:100%; margin:0; overflow:hidden; background:#dfe7f2; font-family:"Microsoft YaHei","Segoe UI",sans-serif; color:var(--ink); }}
  #viewport {{ position:fixed; inset:0; display:flex; align-items:center; justify-content:center; overflow:hidden; }}
  #canvas {{ position:relative; width:1600px; height:900px; transform-origin:center center; overflow:hidden; background:linear-gradient(145deg,#fbfdff 0%,#f3f7fc 58%,#eef4fa 100%); box-shadow:0 24px 80px rgba(31,51,78,.22); }}
  .header {{ position:absolute; left:42px; right:42px; top:28px; height:92px; display:flex; align-items:flex-start; justify-content:space-between; border-bottom:1px solid #cfdaea; }}
  .header h1 {{ margin:0; font-size:31px; letter-spacing:.3px; }}
  .header p {{ margin:8px 0 0; color:var(--muted); font-size:14px; }}
  .meta {{ text-align:right; font-size:13px; color:var(--muted); line-height:1.65; }}
  .meta b {{ color:var(--red); }}
  .zone {{ position:absolute; border:1px solid #cfdaea; border-radius:18px; background:rgba(255,255,255,.75); box-shadow:0 8px 28px rgba(39,64,96,.07); }}
  .zone h2 {{ position:absolute; left:18px; top:14px; margin:0; font-size:18px; }}
  .zone small {{ position:absolute; right:18px; top:17px; color:var(--muted); font-size:12px; }}
  .z1 {{ left:40px; top:145px; width:740px; height:320px; }}
  .z2 {{ left:820px; top:145px; width:740px; height:320px; }}
  .z3 {{ left:40px; top:495px; width:740px; height:330px; }}
  .z4 {{ left:820px; top:495px; width:740px; height:330px; }}
  #links {{ position:absolute; inset:0; width:1600px; height:900px; pointer-events:none; z-index:2; }}
  .link {{ fill:none; stroke-width:3; marker-end:url(#arrow-blue); }}
  .link.confirmed {{ stroke:var(--teal); marker-end:url(#arrow-green); }}
  .link.pending {{ stroke:var(--amber); stroke-dasharray:8 7; marker-end:url(#arrow-amber); }}
  .link.risk {{ stroke:var(--red); stroke-dasharray:4 6; marker-end:url(#arrow-red); }}
  .line-label {{ font-size:12px; font-weight:700; fill:#5a6576; paint-order:stroke; stroke:#f7f9fc; stroke-width:5px; stroke-linejoin:round; }}
  .device {{ position:absolute; z-index:4; display:flex; align-items:center; gap:10px; padding:12px; border:1px solid #cbd8e8; border-radius:14px; background:#fff; box-shadow:0 8px 20px rgba(34,59,92,.10); }}
  .visual {{ flex:0 0 58px; width:58px; height:58px; display:flex; align-items:center; justify-content:center; border-radius:11px; background:#f3f7fb; overflow:hidden; }}
  .visual img {{ max-width:54px; max-height:54px; object-fit:contain; }}
  .placeholder {{ width:54px; height:54px; display:flex; align-items:center; justify-content:center; border-radius:11px; background:linear-gradient(135deg,#dcecff,#eef6ff); color:#1666b5; font-size:17px; font-weight:800; }}
  .copy {{ min-width:0; display:flex; flex-direction:column; gap:5px; }}
  .copy strong {{ font-size:14px; line-height:1.2; }}
  .copy span {{ font-size:11px; line-height:1.3; color:var(--muted); }}
  .badge {{ position:absolute; right:8px; bottom:-9px; padding:3px 8px; border-radius:999px; font-style:normal; font-size:10px; font-weight:700; border:1px solid; background:#fff; }}
  .badge.confirmed {{ color:#087b68; border-color:#81d7c9; background:#ebfbf8; }}
  .badge.listed {{ color:#1666b5; border-color:#a9cdec; background:#edf6ff; }}
  .badge.pending {{ color:#946200; border-color:#f0c56c; background:#fff8e7; }}
  .badge.risk {{ color:#b3262d; border-color:#efa0a4; background:#fff0f1; }}
  .legend {{ position:absolute; left:50px; bottom:24px; display:flex; gap:22px; align-items:center; z-index:5; font-size:11px; color:var(--muted); }}
  .legend span::before {{ content:""; display:inline-block; width:28px; margin-right:7px; vertical-align:middle; border-top:3px solid; }}
  .legend .solid::before {{ border-color:var(--teal); }}
  .legend .dash::before {{ border-color:var(--amber); border-top-style:dashed; }}
  .footer-note {{ position:absolute; right:48px; bottom:20px; max-width:790px; text-align:right; z-index:5; color:#6b5260; font-size:11px; line-height:1.45; }}
</style>
</head>
<body>
<div id="viewport"><main id="canvas">
  <header class="header">
    <div><h1>Dubai GITEX 2026｜Exhibition System Topology</h1><p>v0.1 · 基于 2026-07-06 会议纪要与截至 2026-08-11 的群聊资料</p></div>
    <div class="meta">Booth: <strong>H3-A52 · 25㎡</strong><br>Phase: P1 拓扑与展品冻结<br><b>非施工接线图｜虚线均需人工确认</b></div>
  </header>

  <section class="zone z1"><h2>01 Group Teaching</h2><small>分组教学组合</small></section>
  <section class="zone z2"><h2>02 Lecture Capture</h2><small>录播与 AI 摄像</small></section>
  <section class="zone z3"><h2>03 Smart Podium & Display</h2><small>数字讲台与显示</small></section>
  <section class="zone z4"><h2>04 Collaboration & Scheduling</h2><small>协作、BYOM 与预约</small></section>

  <svg id="links" viewBox="0 0 1600 900" aria-label="Topology links">
    <defs>
      <marker id="arrow-green" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#0f9f89"/></marker>
      <marker id="arrow-amber" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#f59e0b"/></marker>
      <marker id="arrow-red" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#e5484d"/></marker>
    </defs>
    <path class="link pending" d="M290 273 C300 273 305 273 315 273"/><text class="line-label" x="292" y="258">控制/信号待确认</text>
    <path class="link confirmed" d="M520 268 C540 250 545 230 555 228"/><text class="line-label" x="520" y="215">分组关系</text>
    <path class="link confirmed" d="M520 278 C540 310 545 350 555 360"/>

    <path class="link pending" d="M1020 228 C1060 230 1080 280 1110 310"/>
    <path class="link confirmed" d="M1020 338 C1060 338 1080 330 1110 330"/>
    <path class="link confirmed" d="M1050 448 C1090 420 1090 370 1120 365"/>
    <text class="line-label" x="1042" y="300">摄像/音频输入</text>
    <path class="link pending" d="M1310 325 C1330 325 1345 325 1365 325"/><text class="line-label" x="1302" y="305">HDMI/网络待确认</text>

    <path class="link pending" d="M285 623 C310 623 320 660 345 670"/><text class="line-label" x="290" y="610">显示映射待确认</text>
    <path class="link pending" d="M285 753 C320 745 320 700 345 690"/>
    <path class="link risk" d="M565 680 C585 680 595 680 610 680"/><text class="line-label" x="567" y="662">音频/数量待核</text>

    <path class="link pending" d="M1025 608 C1045 608 1060 608 1090 608"/><text class="line-label" x="1030" y="590">USB/音频待确认</text>
    <path class="link pending" d="M1060 748 C1090 700 1300 680 1360 678"/>
    <path class="link pending" d="M1280 608 C1310 610 1330 640 1360 658"/>
    <path class="link pending" d="M1305 748 C1330 740 1345 720 1360 708"/>
    <text class="line-label" x="1208" y="690">目标显示/网络待确认</text>
  </svg>

  {''.join(node_html)}
  <div class="legend"><span class="solid">已确认的组合关系</span><span class="dash">拟议/待确认连接</span></div>
  <div class="footer-note">当前缺失产品图：{html.escape(missing_text)}。产品图来自售前产品清单；缺图不影响结构，但 v0.2 前应补正式图片与接口资料。</div>
</main></div>
<script>
  const canvas = document.getElementById('canvas');
  function fit() {{
    const scale = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
    canvas.style.transform = `scale(${{scale}})`;
  }}
  addEventListener('resize', fit); fit();
</script>
</body>
</html>"""
    OUTPUT_HTML.write_text(document, encoding="utf-8")
    return OUTPUT_HTML, missing


if __name__ == "__main__":
    output, missing_assets = build()
    print(f"OUTPUT={output}")
    print(f"MISSING={','.join(missing_assets) if missing_assets else 'NONE'}")
