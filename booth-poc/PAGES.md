# 展位模拟器 GitHub Pages 发布与交接

更新：2026-10-30。公开入口：https://toastmasterslee.github.io/q/booth/

维护源：`D:\Github\IQ\Zhanhui\booth-poc`。公开仓库：`ToastmastersLee/q`，分支`main`，Pages来源为仓库根目录；本应用只管理`booth/`。不上传项目文档、源码仓库、截图、`.runtime/`或整个私有仓库。构建包含Three.js许可证，资源使用相对路径。

## 当前功能与验证

POC 03：讲台默认X=0、Z=-500 mm；左墙增加屏后开口与洞内排插，WP55×2及IFP先接洞内排插，再接柜内排插。共21件、15根示意线。WP55路径约948/935 mm依赖占位接口，接近用户给定1 m上限；实际端口、弯折、余量及排插供电线长度仍待核对。开口为暂估300×400 mm，并非施工确认尺寸。

12项单元测试通过；真实浏览器导出v3文件及回导成功，解析比对全部21件不变。旧v1/v2迁移保留已有坐标。线上检查了默认讲台Z=-500、屏后排插四条关联电源、俯视/左墙视图、直接刷新，无捕获到的console错误。没有进行设备性能基准或实际施工/用电验收。

性能：取消持续动画循环，静止时不渲染；交互和视图变化触发渲染，保留Orbit阻尼。关闭实时阴影、关闭绘图缓冲保留，像素倍率上限1.25。拖动物件时，仅修改开口才重建墙几何。GitHub Pages提供静态托管，WebGL仍由访问者机器执行，不能保证所有设备帧率。

本地和Pages的localStorage互相隔离。先从原页面导出JSON，再在新页面导入；不要清空原浏览器布局。已有用户讲台坐标不会被新默认覆盖；恢复初始布局会采用新默认，可撤销。

## 接线颜色规范

| 类型 | 颜色 |
| --- | --- |
| LAN / Ethernet / PoE+ | 蓝 `#0074D9` |
| HDMI（视频） | 红 `#FF4136` |
| USB | 黄 `#FFDC00` |
| RS232 / RS485 | 紫 `#B10DC9` |
| Audio | 绿 `#2ECC40` |
| IR 控制线（发射器） | 灰 `#AAAAAA` |
| Relay 控制线 | 橙 `#FF851B` |
| 电源 | 橙 `#FF851B`（与Relay共用） |

图例和对应筛选项只显示当前接线表实际使用的类型；目前本展位用到电源、HDMI、USB，其余类型预留且隐藏。新增连接时沿用`CABLE_TYPES`，不要另造同义类型或颜色。

## 后续发布

先读本目录README及交接手册，检查`git status --short`。按实际变更运行必要测试，再构建。使用现有Miniconda Python；裸`python`若是Store别名，使用下面的明确路径。

```powershell
Set-Location -LiteralPath 'D:\Github\IQ\Zhanhui\booth-poc'
npm test
if ($LASTEXITCODE -ne 0) { throw 'Tests failed' }
npm run build
if ($LASTEXITCODE -ne 0) { throw 'Build failed' }
```

发布checkout在`.runtime/pages-checkout`，已初始化。换电脑时先逐级确认根路径及`.runtime`父目录，再克隆：

```powershell
git -c core.autocrlf=false clone --depth 1 --branch main https://github.com/ToastmastersLee/q.git .runtime/pages-checkout
if ($LASTEXITCODE -ne 0) { throw 'Clone failed' }
git -C .runtime/pages-checkout config core.autocrlf false
```

优先现有HTTPS认证。本机HTTPS读取正常但推送认证失败，实际使用已有SSH身份经443端口推送，不改全局SSH配置。每个新PowerShell进程需要重新设置进程级环境变量：

```powershell
git -C .runtime/pages-checkout remote set-url origin git@github-work:ToastmastersLee/q.git
$env:GIT_SSH_COMMAND = 'C:/Windows/System32/OpenSSH/ssh.exe -o BatchMode=yes -o ConnectTimeout=10 -o ConnectionAttempts=1 -o HostName=ssh.github.com -o HostKeyAlias=github.com -p 443'
C:\Users\jackding\Miniconda3\python.exe -X utf8 scripts/publish_pages.py
if ($LASTEXITCODE -ne 0) { throw 'Preparation failed' }
git -C .runtime/pages-checkout diff --cached --stat
git -C .runtime/pages-checkout diff --cached --name-only
# 必须全部位于booth/，确认后正常推送：
C:\Users\jackding\Miniconda3\python.exe -X utf8 scripts/publish_pages.py --publish
if ($LASTEXITCODE -ne 0) { throw 'Push failed; retain checkout and inspect before retrying' }
```

准备脚本要求checkout干净，先快进到最新main，记录`booth/`外全部Git blob，再同步构建、清理本应用过期文件并生成SHA-256清单。推送前确认远端未移动，正常commit/push；不强推。不变的构建直接复用当前提交，无需制造空提交。意外失败时保留checkout，从失败阶段继续，不能覆盖用户修改。构建内的第三方shader和Vite生成HTML保持原字节，不为发布空白检查改写依赖代码；维护源仍运行`git diff --check`。

## 上线验收

```powershell
C:\Users\jackding\Miniconda3\python.exe -X utf8 scripts/publish_pages.py --verify
```

脚本核对对应提交的Pages工作流、当前main、所有构建文件公网SHA-256，以及既有架构站、LCS站和四个规划/演示入口。排队中只等待部署，勿重复发布。匿名API限流时，通过GitHub连接器实时读取`commits/main`和本次SHA对应`actions/runs`，保存`.runtime/github-proof.json`，其格式为：

```json
{"fetchedAt":"实时UTC时间","source":"实际工具","headSha":"实际main SHA","workflow":{"head_sha":"本次SHA","status":"completed","conclusion":"success","html_url":"实际工作流URL"}}
```

再运行`--verify --github-proof .runtime/github-proof.json`；证明必须在30分钟内且提交一致。字节通过后，还要浏览器打开实际HTTPS地址，检查相关交互、直接刷新、console和资源。不要将“已推送”写成“已验收”。`.runtime/pages-release.json`保存清单、保留边界、提交、工作流与验证状态；`pages-browser.png`和`pages-browser-verification.json`保存浏览器证据。

架构站发布器位于相邻`QNEXPreSaleToolBox/Emulators/SystemArchitecture/tools/publish_pages.py`，已在本机加入`booth/`保留名单，相关规则写入其`Emulators/PUBLISH_HANDOFF.md`。这两份相邻仓库修改尚未提交，后续同步维护源码时需一并保留。LCS发布器只管理`lcs/`。

## 之前布局版本的发布结果

- 公开提交：`9b0c8226166af5e2d0d376a35255a7ca868b0761`。
- Pages工作流：https://github.com/ToastmastersLee/q/actions/runs/40999941816 ，结论success。
- 4个构建文件公网SHA-256全部匹配；六个既有入口可访问，应用目录外Git blob全部一致。
- 浏览器验收状态：`published_verified`；证据见`.runtime/pages-release.json`、`.runtime/pages-browser-verification.json`与`.runtime/pages-browser.png`。
- 公开仓库已推送；本维护仓库及相邻发布器修改保留在本地，未提交/推送。

## 2026-10-30 接线颜色规范更新

- 最新提交：`209bae12d3ad294b05e53cce7929551b357da8a0`；Pages工作流success：https://github.com/ToastmastersLee/q/actions/runs/41000815457。
- 浏览器确认HDMI红、USB黄、电源橙；未使用的LAN、RS232/RS485、Audio、IR、Relay图例已隐藏；console无error。
- 最新构建文件SHA-256已与公网逐项核对。
