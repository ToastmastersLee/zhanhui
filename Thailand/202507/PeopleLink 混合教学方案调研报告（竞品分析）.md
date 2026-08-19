##  PeopleLink 混合教学方案调研报告（竞品分析）

[toc]

<img src="./img/image-20250730170944793.png" alt="image-20250730170944793" style="zoom: 80%;" />

> From 2025, 泰国展会

## 一、总体架构概览

PeopleLink（简称 PL）通过其自研的硬件（e-Podium、追踪摄像头、DSP系统）+自研软件（视频会议平台）打造一套完整的 Hybrid Classroom 解决方案：

**核心组成：**

| 模块                                | 说明                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| **e-Podium**                        | 数字讲台，内置主控系统，集成鹅颈麦、Dante转接、LED信息屏、丰富的I/O接口（USB/HDMI/LAN等） |
| **Video Wall Grid**                 | 演讲者正前方由拼接屏组成的视频墙，每块屏幕显示一位与会者（最大支持100屏、1000人视频流） |
| **Teacher/Student Tracking Camera** | 摄像头自动追踪讲者和学生，提升线上互动性                     |
| **Ceiling Mic & Speaker**           | 支持Dante协议的吸顶麦克风与喇叭，通过讲台统一接入处理        |
| **Interactive Flat Panel (IFP)**    | 演讲者背后的电子白板，通过HDMI接入，辅助互动教学             |
| **inClass 软件**                    | PL自研的视频会议平台，支持多人远程接入、分屏管理、课件内容流等 |



## 二、系统功能分析

| 功能分类         | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| **多屏互动显示** | 拼接墙支持灵活布局配置，默认9人/屏，可自定义显示主持人和课件画面 |
| **讲台集中控制** | 通过一体化讲台集中管理音频（鹅颈麦、Dante麦）、视频源、课件播放、外接设备 |
| **远程教学支持** | 支持最大1000人在线、实时视频交互，适用于大规模远程授课       |
| **音频系统融合** | 吸顶麦/喇叭通过 Dante 网络音频集成到讲台控制器               |
| **本地互动显示** | 背后大屏 IFP 供本地书写/课件展示，与远程教学无缝协同         |



## 三、现场照片重点解读

| 图片                                                         | 内容识别                                | 补充说明                                                     |
| ------------------------------------------------------------ | --------------------------------------- | ------------------------------------------------------------ |
| <img src="./img/image-20250730170311773.png" alt="image-20250730170311773" style="zoom: 33%;" /> | Video Wall Grid                         | 拼接屏支持以“1人1屏”方式显示远程参与者，兼具**主持人**和**课件专属**区域；<br />显示一个主讲人画面与多个Free Seat标识，体现平台支持多人并发视频流 |
| <img src="./img/image-20250730170944793.png" alt="image-20250730170944793" style="zoom: 33%;" /> | 总体方案示意图                          | 展示所有核心模块连接逻辑                                     |
| <img src="./img/image-20250730170222150.png" alt="image-20250730170222150" style="zoom: 25%;" /> | e-Podium <br />顶部接口区               | 提供多种I/O接口（USB3.0、HDMI输入输出、LAN等），便于外设接入 |
| <img src="./img/image-20250730170140249.png" alt="image-20250730170140249" style="zoom: 25%;" /> | e-Podium 外观                           | 前面板大尺寸LED屏幕可显示演讲人信息、会议主题等，提升会议体验 |
| <img src=".\img\image-20250731110809520.png" alt="image-20250731110809520" style="zoom:50%;" /> |                                         |                                                              |
| <img src=".\img\image-20250731110455002.png" alt="image-20250731110455002" style="zoom:80%;" /> | HDMI Splitter and Multimedia Controller |                                                              |
| <img src="./img/image-20250730170249020.png" alt="image-20250730170249020" style="zoom: 50%;" /> | Dante吸顶麦                             | 明确为Dante网络音频系统组成部分，连接至讲台后集中处理        |

![peoplelink epodium](https://www.peoplelinkvc.com/wp-content/uploads/2024/02/Front-View-1.webp)



## 四、竞品优劣分析（对比本公司NDP500系列）

| 项目             | PeopleLink                                                   | Q-NEX（NDP500 ）                                             |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **讲台设计**     | 集成鹅颈麦、Dante转接、显示屏、美观度高                      | 集成无线麦克风、可选推拉盖、功能较为中性                     |
| **中控系统**     | 中控是PL目前较为薄弱的环节                                   | Q-NEX中控系统成熟，且支持动态，全校园的cascading控制         |
| **音频系统**     | 1. 通过 Dante 网络音频集中接入讲台<br />2. 另一款麦克风自带回音消除功能（结构上和S610+Mixer类似） | 集成无线麦克风，也可以灵活搭配第三方的麦克风<br />（如思必驰的Dante产品，以及S610+mixer). |
| **视频会议平台** | 自研平台，软硬件高度耦合                                     | 可兼容第三方平台（Zoom、Teams 等），灵活性更强               |
| **视频墙显示**   | 1人1屏展示，支持最高100屏                                    | NDP系统不自带拼接墙方案，但Zoom等第三方软件有成熟的互动展示  |
| **摄像头系统**   | Teacher/Student Tracking 多路联动                            | 单PTZ控制为主，几个CV810 GEN2.0自带的跟踪可以实现演讲者跟踪  |
| **IFP整合**      | 通过HDMI接入                                                 | HDMI, 支持反向触控                                           |
| **软件许可**     | inClass独立平台（需购买License）                             | 控制平台与硬件绑定，管理平台统一 Dashboard/Web-Console       |
| **用户体验**     | 高集成、展示性强，适合高端会场/示范教室                      | 灵活部署，适配各种预算和场景需求                             |
| **价格**         | 从产品形态推断出PL的价格会远高于一般的竞品                   |                                                              |
| **小结**         | 耦合性强                                                     | 灵活性高                                                     |





## 五、关注重点

- PL方案强调“一站式集成”与“高可视化体验”，适合政府演示/高端会议教室。
- 其讲台设计是目前行业内展示性最强之一，尤其是前面板的LED显示模块。
- PL对Dante音频系统整合成熟，具备完整吸顶麦+吸顶喇叭一体化解决方案。
- 由于现场时间限制，并未实际操作，如接入笔记本以及矩阵切换这类。
  - 不过现场人员介绍说，笔记本通过HDMI接入，则会显示在背后的IFP大屏上；
  - 通过USB接入则自动接入到inClass平台。



## 六、 参考连接

1. [PeopleLink ePodium - Unboxing Digital podium for Auditorium, Classroom and Training rooms -- Youtbe](https://www.youtube.com/watch?v=YeayU4n2H0U)
2. https://www.peoplelinkvc.com/products/digital-podiums/peoplelink-epodium
3. [Easy to program, Room automation Control system by PeopleLink - Part 2 (Advanced Training) -- Youtube](https://www.youtube.com/watch?v=3UWJXfjkd1Y)
4. [Peoplelink Room Appliance with Touch Controller](https://shop.peoplelinkvc.com/products/peoplelink-room-appliance-with-touch-controller?srsltid=AfmBOopNvlbNf4g09_mM0ZLbywXN6QV4HWbUDlNj1xaJlGC4zbIQ87XD&utm_source=chatgpt.com)