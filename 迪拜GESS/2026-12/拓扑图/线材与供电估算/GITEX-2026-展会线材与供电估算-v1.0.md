---
document_type: "initial cable and power estimate"
version: "v1.0"
date: "2026-08-19"
status: "draft - lengths and final electrical design pending"
---

# GITEX GLOBAL Dubai 2026｜展会线材与供电估算 v1.0

[toc]

<img src=".\img\image-20260819153059412.png" alt="image-20260819153059412" style="zoom: 67%;" />

> 依据当前拓扑 UI 的初步估算，供团队测长和讨论使用。长度列均留空，待现场布局确认后填写；本文件不是施工或采购冻结清单。

- 蓝：LAN；红：HDMI；黄：USB；绿：音频；黑色虚线：无线关系，不计实体线材。
- 黑色插头：设备需要 AC 供电，不是信号线。
- 供电结构：`区域地插 → 1–3 只经搭建方认可的 2–10 位 PDU/排插 → 本区设备`。
- 取电点、回路、容量、插头和分支方式由**冰雯与搭建方**确认。
- 展会数据： 5 x 5 x 2.8 （m）

## 1. 基础设施区（Infrastructure Area）

<img src=".\img\image-20260819153309793.png" alt="image-20260819153309793" style="zoom: 67%;" /> 

| No. | 长度 | 类型规格 | 用途与备注 |
| ---- | ---- | -------- | ---------- |
| 1 | 3 m | Cat6 RJ45 | Router2 With SIM ➜ Q-NEX Server；Q-NEX 平台网络通信。 |
| 2 | 3 m | Cat6 RJ45 | Router2 With SIM ➜ Lite Media Server；演示内容/平台网络通信。 |
| 3 | 5 m | Cat6 RJ45 | Router2 With SIM ➜ SL100 区域；实际接入设备/交换节点待确认。 |
| 4 | <font color =red>15 m</font> | Cat6 RJ45 | Router2 With SIM ➜ CPL50；是否仅静态展示待确认。<br /><font color =red> CPL50按照挂在最外面，LDP100来计算（可提前暗埋）</font> |
| 5 | <font color =red>15 m</font> | Cat6 RJ45 | Router2 With SIM ➜ NPS150；BYOM 区网络上联。<br /><font color =red> 可提前暗埋</font> |
| 6 | 8 m | Cat6 RJ45 | Router2 With SIM ➜ NDP600；协作教学区网络上联。 |
| 7 | N/A | 区域地插 ×6 | 搭建方预埋至基础设施、LCS、SL100、协作/NDP600、<br />NPS150、数字海报/LDP100 六区；位置与回路待确认。 |
| 8 | 1.5 m | 6–8 位带保护 PDU/排插 ×1 | 基础设施区地插 ➜ Router2 With SIM、Q-NEX Server、<br />Lite Media Server、预留网络设备。 |



## 2. LCS 录播区（LCS Area）

<img src=".\img\image-20260819155421579.png" alt="image-20260819155421579" style="zoom:80%;" /> 



| No. | 长度 | 类型规格 | 用途与备注 |
| ---- | ---- | -------- | ---------- |
| 1 | 15 m | 属于LCS810 SKU套装一部分<br />(无需额外再带) | S210现场展会只需接入一根到主机，让主机有音柱即可. |
| 2 | 8 m | Cat6 RJ45 ×1；PoE 待核 | Five-Lens AI Smart Camera ➜ LCS810；五目摄像机网络链路。<br />(主机自带PoE交换机，且有能力形成局自己域网) |
| 3 | 3 m | Cat6 RJ45 ×1；PoE 待核 | AI Tracking Camera-T ➜ LCS810；AI 跟踪摄像机网络链路。<br />(主机自带PoE交换机，且有能力形成局自己域网) |
| 4 | 1 m | 3–4位排插 ×1 | LCS 区地插 ➜ LCS810,并可能需要给TE1410D供电 |



## 3. SL100 与双屏演示区（SL100 Area）

<img src=".\img\image-20260819160133020.png" alt="image-20260819160133020" style="zoom: 67%;" /> 

| No. | 长度 | 类型规格 | 用途与备注 |
| ---- | ---- | -------- | ---------- |
| 1 | 8 m | HDMI 2.0，4K@60，18 Gbps | SL100 ➜ QA1400 Pro with OPS 65"；视频输出。 |
| 2 | 8 m | HDMI 2.0，4K@60，18 Gbps | SL100 ➜ QA1400 Ultra with OPS 65"；视频输出。 |
| 3 | 8 m | USB Touch/数据线 | QA1400 Pro with OPS 65" ➜ SL100；触控回传/数据交互。 |
| 4 | 8 m | USB Touch/数据线 | QA1400 Ultra with OPS 65" ➜ SL100；触控回传/数据交互。 |
| 5 | 10 m | 14AWG 金银线 | SL100 ➜ PS610 |
| 5 | 10 m | 14AWG 金银线 | SL100 ➜ PS610 |
| 6 | 1.5 m | 3–4 孔位排插 | SL100 区地插/经认可分支配电 ➜ SL100 |
| 6 | 1.5 m | 3–4 孔位排插 | SL100  ➜ 两台 QA1400<br />(IFP 液晶电源1.5m) |

> [!note]
>
> - SL100的供网在基础设施区描述，这里不再赘述



## 4. NDP600 Area

<img src=".\img\image-20260819161715628.png" alt="image-20260819161715628" style="zoom: 67%;" />    

| No.  | 长度  | 类型规格                 | 用途与备注                                             |
| ---- | ----- | ------------------------ | ------------------------------------------------------ |
| 1    | 5 m   | HDMI 2.0，4K@60，18 Gbps | NDP600 ➜ TB1400D Pro with OPS 65"；视频输出。          |
| 2    | 5 m   | USB Touch/数据线         | TB1400D Pro with OPS 65" ➜ NDP600；触控回传/数据交互。 |
| 3    | 1 m   | HDMI 2.0，4K@60，18 Gbps | B3821 ➜ NDP600                                         |
| 4    | 10 m  | 14AWG 金银线             | NDP600 ➜ Speaker 1                                     |
| 5    | 10 m  | 14AWG 金银线             | NDP600 ➜ Speaker 2；                                   |
| 6    | 1.5 m | 3–4 孔位排插             | 地插 ➜ NDP600                                          |
| 7    | 1.5 m | 3–4 孔位排插             | NDP600 ➜ 桌面，放一个桌面给笔记本等供电                |

> [!note]
>
> 1.  NDP600的供网在基础设施区描述，这里不再赘述
> 2. TB1400D pro的供电在分组教学区描述；



## 5. 分组教学区

<img src=".\img\image-20260819161742085.png" alt="image-20260819161742085" style="zoom:67%;" /> 

| No. | 长度 | 类型规格 | 用途与备注 |
| ---- | ---- | -------- | ---------- |
| 1 | 8 m | Cat6 RJ45 | Router1 ➜ IQ Share Matrix Box WP55（Group 1、Group 2）； |
| 2 | 8 m | Cat6 RJ45 | Router1 ➜ IQ Share Matrix Box WP55（Group 1、Group 2）； |
| 3 | 3 m | HDMI 2.0，4K@60，18 Gbps ×2 | WP55（Group 1）➜ PD150（Group 1）；分组显示画面。 |
| 4 | 3 m | HDMI 2.0，4K@60，18 Gbps ×2 | WP55（Group 2）➜ PD150（Group 2）；分组显示画面。 |
| 5 | 3 m | 6–8 位排插 | NDP600排插  ➜  分组教学区； <br />供电给 WP55 x2 ； PD150 x 2 ； TB400D x 1 |
| 6 | 1.5m | 2-3 位排插 | 分组教学区排插 ➜    TB400D x 1 |





## 6. NPS150 BYOM 区

<img src="D:\Github\IQ\QNEX_Trade_Show\迪拜GESS\2026-12\拓扑图\线材与供电估算\img\image-20260819163237641.png" alt="image-20260819163237641" style="zoom:50%;" /> 

| No. | 长度 | 类型规格 | 用途与备注 |
| ---- | ---- | -------- | ---------- |
| 1 | 1 m | Cat6 RJ45 | NPS150 ➜ NPS-CPL20； |
| 2 | 5 m | HDMI 2.0，4K@60，18 Gbps | NPS150 ➜ HN1000 Pro with OPS 65"；视频输出。 |
| 3 | 5 m | USB Touch <br />(A-B)    | HN1000 Pro with OPS 65" ➜ NPS150；触控回传/数据交互。 |
| 4 | 1 m | HDMI 2.0，4K@60，18 Gbps | IQShare (WP50) ➜ NPS150；视频输入。 |
| 5 | 1 m | USB Touch/数据线         | NPS150 ➜ IQShare (WP50)；数据/触控交互。              |
| 6 | 1 m  | USB 数据线  （A-A）      | S350 ➜ NPS150；                                       |
| 7 | 1 m | USB 数据线  （A-A）      | HY300 ➜ NPS150；                                      |
| 7 | 1 m | 4–6 位排插 | CPL50、HN1000 Pro、 |
| 9 | 1 m | 6–8 位排插 | NPS150、WP50、NPS-CPL20、HY300、 |
| 10 | 1 m | 4–6 位排插 | 笔记本、备用 |

> [!note]
>
> 1.  NPS150的供网在基础设施区描述，这里不再赘述
> 2. CPL50的供网在基础设施区描述，这里不再赘述



## 7. 数字海报与 LDP100 区

| No. | 长度 | 类型规格 | 用途与备注 |
| ---- | ---- | -------- | ---------- |
| 1 | N/A | USB Flash Drive（U 盘）×1 | 播放介质，不计线材长度。<br />内容需要与设计师进一步确认 |
| 2 | 1.5m / 3m | 2–3 位排插 ×1 | 数字海报区地插 ➜ Digital Poster - F Serial 80"；<br />若无地插，则从SL100的排查上拉电，长度改成 3m |
| 3 | 1.5m | 2–3 位排插 ×1 | 地插 ➜ LDP100 with OPS 及预留设备；<br />当前仅预留电源位。 |



## 7. 初评数量与冻结前确认

