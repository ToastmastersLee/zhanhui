# NewlineTeamsRoomPanel解决方案

[toc]

## 一、功能架构分析

Newline 所展示的 Teams Room Panel 方案，属于微软生态下的标准化视频会议终端解决方案，与微软产品高度集成，具备高度集成、即插即用的特点。

### 1. 控制终端（Front-End Touch Panel）

<img src="./img/image-20250731093404181.png" alt="image-20250731093404181" style="zoom:50%;" /> 

- 运行 Microsoft Teams Rooms（MTR）客户端，基于 Windows IoT 平台。
- 提供触控式会议控制功能，包括：
  - 一键加入/发起会议
  - 麦克风、摄像头开关
  - 音量调节
  - 内容共享
  - 邀请参与者等操作

### 2. 主控系统（Back-End Meeting Appliance）

<img src="./img/image-20250731093355796.png" alt="image-20250731093355796" style="zoom:50%;" /> 

- 实质为一台会议专用 PC（通常由 Dell、HP、Lenovo 或 Newline 自主集成）。
- 支持以下功能：
  - 自动开机启动 MTR 环境
  - 调用外围设备：USB 摄像头、麦克风、扬声器
  - 多显示输出（如双屏、投影、触控板）
  - 网络登录 Teams 帐号，调用 Outlook 日历预约系统
  - 内嵌 AI 算法：自动取景、语音激活、音量均衡等

### 3. 外设接口与标准支持

<img src="./img/image-20250731093217646.png" alt="image-20250731093217646" style="zoom: 50%;" /> 

- 支持 USB、HDMI、LAN、PoE、蓝牙等连接方式；
- 可与 Teams 原生兼容的设备（如 Logitech Rally Bar、Shure IntelliMix、Yealink 麦克风阵列）无缝联动；
- 支持双屏会议显示、内容共享与白板协作。



## 二、产品功能亮点

| 功能类别   | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| 即开即用   | 开机即进入会议准备界面，适合无需培训的终端用户<br />（如在Zoom里面选择哪个摄像头之类,非IT用户友好型） |
| 云服务集成 | 与 Teams、Outlook、Exchange 深度集成，自动同步会议日程       |
| 多设备联动 | 支持摄像头、麦克风、音响、触控大屏、无线投屏器等外设         |
| 音视频     | 可支持1080p/4K视频、AI取景、自动增益与降噪                   |
| 生态封闭   | 完整生态封闭系统，减少兼容性和配置问题                       |



## 三、与 Q-NEX NPS 简要对比（差异化定位）

| 项目         | Newline Teams Panel              | Q-NEX NPS                            |
| ------------ | -------------------------------- | ------------------------------------ |
| **定位核心** | 专业会议专用系统（深度绑定微软） | 通用型中控与会议资源获取             |
| **操作对象** | 最终用户（老师/员工）            | IT管理员 + 教师/运营                 |
| **生态依赖** | 高度依赖 Teams / M365            | 自主平台，兼容多协议与平台           |
| **使用方式** | 开机即用，软件固定               | 自定义逻辑配置，需培训部署           |
| **控制能力** | 生态圈封闭，圈内产品都能自动集成 | 控AV矩阵、投屏、音频、开关电源等     |
| **适合场景** | 商务会议室（简洁操作优先）       | 教育/政务/多功能教室（功能灵活优先） |



## 总结

Newline 的 Teams Room Panel 方案强调“一体化”、“极简操作”和“微软原生整合”，非常适合追求效率、部署量大、IT资源有限的会议室项目。

而 Q-NEX NPS 更适合在教育/政务场景中，扮演多功能调度和控制平台的角色，其强在“可配置性”和“系统集成能力”。



## Reference

1. https://www.youtube.com/watch?v=5VBRa4s1hVM

2. https://learn.microsoft.com/en-us/MicrosoftTeams/rooms/

3. aka.ms/MTRdocs

   ## Microsoft Teams Rooms components

   <img src=".\img\room-systems-image1.jpg" alt="A user taps a Teams Rooms console, with a display in the background." style="zoom:67%;" /> 

   Microsoft Teams Rooms includes the following key components to deliver a great user experience:

   - Touchscreen console
   - Compute module
   - Microsoft Teams Rooms application
   - Peripheral devices (camera, microphone, speaker)
   - Front of room screens (maximum of two)
   - HDMI input

4. Microsoft Teams Rooms Setup | Step-by-Step： https://www.youtube.com/watch?v=In-SzWX1Gtw