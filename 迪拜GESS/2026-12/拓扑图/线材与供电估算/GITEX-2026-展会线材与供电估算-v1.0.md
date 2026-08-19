---
document_type: "initial cable and power estimate"
version: "v1.0"
date: "2026-08-19"
status: "draft - lengths and final electrical design pending"
---

# GITEX GLOBAL Dubai 2026｜展会线材与供电估算 v1.0

[toc]

> 依据当前拓扑 UI 的初步估算，供团队测长和讨论使用。长度列均留空，待现场布局确认后填写；本文件不是施工或采购冻结清单。

- 蓝：LAN；红：HDMI；黄：USB；绿：音频；黑色虚线：无线关系，不计实体线材。
- 黑色插头：设备需要 AC 供电，不是信号线。
- 供电结构：`区域地插 → 1–3 只经搭建方认可的 2–10 位 PDU/排插 → 本区设备`。
- 取电点、回路、容量、插头和分支方式由**冰雯与搭建方**确认。

## 1. 基础设施区（Infrastructure Area）

| No. | 长度 | 类型规格 | 用途与备注 |
| ---- | ---- | -------- | ---------- |
| 1 |  | Cat6 RJ45 | Router2 With SIM ➜ Q-NEX Server；Q-NEX 平台网络通信。 |
| 2 |  | Cat6 RJ45 | Router2 With SIM ➜ Lite Media Server；演示内容/平台网络通信。 |
| 3 |  | Cat6 RJ45 | Router2 With SIM ➜ SL100 区域；实际接入设备/交换节点待确认。 |
| 4 |  | Cat6 RJ45 | Router2 With SIM ➜ CPL50；是否仅静态展示待确认。 |
| 5 |  | Cat6 RJ45 | Router2 With SIM ➜ NPS150；BYOM 区网络上联。 |
| 6 |  | Cat6 RJ45 | Router2 With SIM ➜ NDP600；协作教学区网络上联。 |
| 7 |  | 区域地插 ×6 | 搭建方预埋至基础设施、LCS、SL100、协作/NDP600、NPS150、数字海报/LDP100 六区；位置与回路待确认。 |
| 8 |  | 2–10 位带保护 PDU/排插 ×1 | 基础设施区地插 ➜ Router2 With SIM、Q-NEX Server、Lite Media Server、预留网络设备。 |
| 9 |  | 经认可的分支配电/延长电源线 ×4 | 高设备密度区地插/首级配电 ➜ 同区额外 PDU；SL100 1 路、协作/NDP600 2 路、NPS150 BYOM 1 路。普通排插能否串接待搭建方确认。 |

> Network Switch / PoE 交换机在参考截图中出现，但当前 v1.0 拓扑未确认其数量和接线，因此暂不计入本表。

## 2. LCS 录播区（LCS Area）

| No. | 长度 | 类型规格 | 用途与备注 |
| ---- | ---- | -------- | ---------- |
| 1 |  | S210 原厂配套音频/连接线 ×2 | S210（左、右）➜ LCS810；实际端口、供电与音频承载方式按 LCS810/S210 手册确认。 |
| 2 |  | Cat6 RJ45 ×1；PoE 待核 | Five-Lens AI Smart Camera ➜ LCS810；五目摄像机网络链路。 |
| 3 |  | Cat6 RJ45 ×1；PoE 待核 | AI Tracking Camera-T ➜ LCS810；AI 跟踪摄像机网络链路。 |
| 4 |  | 2–10 位带保护 PDU/排插 ×1 | LCS 区地插 ➜ LCS810、摄像机/PoE 设备及预留；摄像机是否 PoE 供电会影响插座数。 |

## 3. SL100 与双屏演示区（SL100 Area）

| No. | 长度 | 类型规格 | 用途与备注 |
| ---- | ---- | -------- | ---------- |
| 1 |  | HDMI 2.0，4K@60，18 Gbps | SL100 ➜ QA1400 Pro with OPS 65"；视频输出。 |
| 2 |  | HDMI 2.0，4K@60，18 Gbps | SL100 ➜ QA1400 Ultra with OPS 65"；视频输出。 |
| 3 |  | USB Touch/数据线 | QA1400 Pro with OPS 65" ➜ SL100；触控回传/数据交互。 |
| 4 |  | USB Touch/数据线 | QA1400 Ultra with OPS 65" ➜ SL100；触控回传/数据交互。 |
| 5 |  | 平衡模拟音频线 ×2；接口待核 | SL100 ➜ 图示两路音频终端；终端型号、接口和功放/DSP 需求待确认。 |
| 6 |  | 2–10 位带保护 PDU/排插 ×2 | SL100 区地插/经认可分支配电 ➜ SL100、两台 QA1400、音频终端、笔记本（如接入）；保守预留 2 只。 |

## 4. 协作教学与 NDP600 区（Collaborative Learning / NDP600 Area）

| No. | 长度 | 类型规格 | 用途与备注 |
| ---- | ---- | -------- | ---------- |
| 1 |  | Cat6 RJ45 ×2 | Router1 ➜ IQ Share Matrix Box WP55（Group 1、Group 2）；两台 WP55 均为有线 LAN 接入，各 1 条。Router1 与 Router2 为独立网络，不互联。 |
| 2 |  | HDMI 2.0，4K@60，18 Gbps ×2 | WP55（Group 1、Group 2）➜ PD150（Group 1、Group 2）；分组显示画面。 |
| 3 |  | Cat6 RJ45 ×1 | Router2 With SIM ➜ NDP600；NDP600 网络上联。 |
| 4 |  | HDMI 2.0，4K@60，18 Gbps | NDP600 ➜ TB1400D Pro with OPS 65"；视频输出。 |
| 5 |  | USB Touch/数据线 | TB1400D Pro with OPS 65" ➜ NDP600；触控回传/数据交互。 |
| 6 |  | HDMI 2.0，4K@60，18 Gbps | B3821 ➜ NDP600；实际端口与最大分辨率待确认。 |
| 7 |  | 平衡模拟音频线 ×2；接口待核 | NDP600 ➜ Speaker 1、Speaker 2；是否经功放/DSP 待确认。 |
| 8 |  | 2–10 位带保护 PDU/排插 ×3 | 协作/NDP600 区地插/经认可分支配电 ➜ NDP600、TB1400D、B3821、PD150 ×2、WP55 ×2、扬声器及预留；设备密集，保守预留 3 只。 |

## 5. NPS150 BYOM 区

| No. | 长度 | 类型规格 | 用途与备注 |
| ---- | ---- | -------- | ---------- |
| 1 |  | Cat6 RJ45 | Router2 With SIM ➜ NPS150；BYOM 区网络上联。 |
| 2 |  | Cat6 RJ45；PoE 待核 | NPS150 ➜ NPS-CPL20；NPS-CPL20 网络/可能的 PoE 链路。 |
| 3 |  | HDMI 2.0，4K@60，18 Gbps | IQShare (WP50) ➜ NPS150；视频输入。 |
| 4 |  | USB Touch/数据线 | NPS150 ➜ IQShare (WP50)；数据/触控交互。 |
| 5 |  | HDMI 2.0，4K@60，18 Gbps | NPS150 ➜ HN1000 Pro with OPS 65"；视频输出。 |
| 6 |  | USB Touch/数据线 | HN1000 Pro with OPS 65" ➜ NPS150；触控回传/数据交互。 |
| 7 |  | USB 数据线 ×2 | S350、HY300 ➜ NPS150；实际功能与端口待产品确认。 |
| 8 |  | 无实体线材 | Laptop + Dongle ⇢ IQShare (WP50)；无线投屏关系，不计线材。 |
| 9 |  | 2–10 位带保护 PDU/排插 ×2 | NPS150 BYOM 区地插/经认可分支配电 ➜ NPS150、HN1000 Pro、WP50、NPS-CPL20、S350、HY300、笔记本（如接入）。 |

## 6. 数字海报与 LDP100 区

| No. | 长度 | 类型规格 | 用途与备注 |
| ---- | ---- | -------- | ---------- |
| 1 |  | USB Flash Drive（U 盘）×1 | USB Flash ➜ Digital Poster - F Serial 80"；播放介质，不计线材长度。视频格式、容量和备份待确认。 |
| 2 |  | 展馆认可的本地制式电源线 | 数字海报区地插 ➜ Digital Poster - F Serial 80"；电流、插头与专用回路需求待确认。 |
| 3 |  | 2–10 位带保护 PDU/排插 ×1 | LDP100 区地插 ➜ LDP100 with OPS 及预留设备；当前仅预留电源位。 |

## 7. 初评数量与冻结前确认

- Cat6 LAN：13 条；HDMI：8 条；USB Touch/数据：7 条；音频/麦克风：6 条。
- 区域地插：6 个；2–10 位 PDU/排插：10 只；待确认分支配电/延长线：4 路；数字海报 U 盘：1 个。
- 冻结前必须确认：地插和回路、各设备实际位置、线长、HDMI 是否需主动/光纤、PoE 来源、音频接口、PDU 位数与分支方式、线材备份比例。
