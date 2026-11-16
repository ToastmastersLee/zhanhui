---
document_type: "registration and WhatsApp channel record"
date: "2026-11-16"
event: "GITEX GLOBAL Dubai 2026"
status: "internal reference"
---

# GITEX GLOBAL Dubai 2026｜注册与 WhatsApp 信息记录

## 1. 2026 参展注册 / Badge 预览

| 项目 | 已记录信息 |
| --- | --- |
| 证据图片 | [访客门户参展注册与 Badge 预览](./GITEX-2026-访客门户-参展注册与Badge预览-20261116.png) |
| 访问入口 | <https://visit.gitex.com/visitor-portal?sub_event=GLOBAL> |
| 注册身份 | `LI WANG`；Global Pre-Sales and Consulting Engineer；`IQ \| QNEX`；China；Badge Category：`Exhibitor`。 |
| 画面显示展期 | 2026-12-08 至 2026-12-11。 |
| 画面显示场地 | Venue 1：Dubai World Trade Centre, Dubai；Venue 2：Dubai Exhibition Centre, Expo City。 |
| Badge 状态 | 页面明确为 **Badge Preview**，并提示该预览不可作为现场入场凭证。 |
| 注册支持邮箱 | `support@gitex.com`（来自门户截图）。 |

图片 SHA-256：`A48377C96EE78CD34CC828BBDF4D81A9009EF20A66BE40C18E3B90377EA68CE2`。

> 官方活动页同样将 2026 Summit 标为 12 月 7 日（DWTC），Expo 标为 12 月 8–11 日（Expo City Dubai）；门户截图中的 Badge 预览记录的是 Expo 日期范围。参见 [GITEX GLOBAL 官方页](https://www.gitex.com/)。

## 2. WhatsApp 商业账号：仅记录文字信息

三张用户提供的 WhatsApp 截图**不复制到项目目录**。可见信息如下：

| 字段 | 记录值 |
| --- | --- |
| 账号 | `GITEX GLOBAL`，已验证；`@gitexglobal`。 |
| 电话 | `+971 4 306 4070`。 |
| 账号类型 | WhatsApp Business account；画面显示 Joined in September 2021。 |
| 分类 | Event Planner。 |
| 邮箱 / 网站 | `gitexmarketing@dwtc.com`；<https://www.gitex.com/>。 |
| 资料页显示的下一届信息 | 7–11 December 2027；Summit 7 December at Dubai World Trade Centre，Exhibition 8–11 December at Expo City Dubai。 |

**时间边界：**该 WhatsApp 资料页为 2027 活动信息，不用于覆盖本项目的 2026 注册、展期或 Badge 状态。

## 3. “WhatsApp 验证码”实际可能的实现方式

先纠正术语：此处通常应称为 **OTP（一次性验证码）**，不是 OTA。OTA 常指 Over-The-Air（空中下载/远程升级）。若验证码由服务器生成并发送至 WhatsApp，它通常是“带有效期的服务器 OTP”；它也不同于由认证器 App 本地生成的 TOTP。

| 层级 | 正常实现 | 当前可确认程度 |
| --- | --- | --- |
| 访问控制 | 用户在门户请求“Expert”功能，注册后台创建一次性挑战：验证码与账号/手机号/功能范围绑定，保存哈希、有效期、尝试次数和发送频率。 | 通用安全实现；截图未展示该门户具体逻辑。 |
| 消息发送 | 后台通过 WhatsApp Business Platform（或其 BSP 服务商）调用已批准的 `AUTHENTICATION` 模板，将 OTP 发送至用户 WhatsApp 号码。 | Meta 官方 API 支持 Authentication 模板与 OTP 按钮类型；无法从截图确定 GITEX 使用的 WABA、BSP 或模板。 |
| 验证与授权 | 用户在网页输入 OTP；后台校验哈希、有效期、重试上限和号码归属；成功后签发短时、仅限 Expert 功能的会话/权限声明。 | 合理架构推断，不是对 GITEX 门户的确认。 |
| 投递状态 | 平台可用 webhook 回传消息投递状态；但“已投递”不应代替用户输入 OTP 的验证。 | 通用实现建议。 |

Meta 的 [WhatsApp Business Platform 概览](https://developers.facebook.com/documentation/business-messaging/whatsapp/overview) 说明企业可通过 Cloud API 发送模板消息；其 [Authentication/OTP 模板接口](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates/) 列出 `AUTHENTICATION` 类别，以及 Copy Code、One Tap、Zero Tap、No Buttons 等 OTP 类型。

## 4. 对“Expert”功能的谨慎结论

- WhatsApp 资料页只能证明 GITEX 有已验证的商业 WhatsApp 账号；**不能证明**该访客门户已经为 Expert 功能启用了 WhatsApp OTP。
- 在未看到门户的“发送 WhatsApp 验证码”界面或实际消息前，不能确认验证码有效期、是否一次性、绑定哪个手机号，或由谁（GITEX / 门户供应商 / BSP）运营。
- 如门户实际提供 WhatsApp OTP，应使用注册时已绑定、可正常接收 WhatsApp 的手机号，并仅在该门户输入验证码；不要在群聊、邮件或本项目文档中保存或转发验证码。

## 5. 本地研究结论与后续核验

**当前关键结论（2026-11-16）：**若 Expert 功能的验证码确实由 WhatsApp 发出，其合理实现应是：门户服务端生成随机、一次性的 OTP，绑定请求用户与 Expert 功能范围，以哈希形式保存并设置短有效期、重试上限及发送频率；随后通过 WhatsApp Business Platform 的 `AUTHENTICATION` 模板发送；用户在门户输入验证码后，由服务端校验并签发短时、范围受限的授权会话。

**这不是已确认的 GITEX 技术实现。**后续研究应只补充可观察或可取得的证据：Expert 页面是否有 WhatsApp OTP 选项、实际消息的模板/过期提示、门户是否要求输入手机号，以及 GITEX 或其技术供应商对验证渠道的说明。不得记录、转发或保存任何实际验证码。

