# Thailand Exhibition July 2025 v3

[toc]


------

1. Booth Number: M18
2. Area: 4 x 9 meters
3. The main wall should reserve a 60cm storage area, also used for cable routing

------

## 1. Basic Information

| Key             | Value                                                        |
| --------------- | ------------------------------------------------------------ |
| Exhibition Name | Infocom Asia                                                 |
| Team Leader     | Bonnie                                                       |
| Date            | July 2025                                                    |
| Location        | Bangkok, Thailand                                            |
| Booth Area      | Total booth size: **9m x 4m**                                |
| Power Location  | **Main power** at top-left corner, **Server area** near center wall |
| Socket Standard | US standard, compatible with other countries                 |



------

### 1.2 Exhibition Layout Overview

<img src="./img/image-20250520164746986.png" alt="image-20250520164746986" style="zoom:50%;" />

| Zone | Area Name             | Description (Simplified)                                     |
| ---- | --------------------- | ------------------------------------------------------------ |
| 1    | Group Teaching        | Demonstrates group collaboration and centralized control, simulates distributed classroom scenario. |
| 1-B  | Poster Display        | Independent poster display area behind Group Teaching.       |
| 2    | NDP100 Area           | Showcases podium control, multimedia teaching, and device integration. |
| 3A   | Lecture Capture & IoT | Integrates lecture capture with IoT applications, showcasing teaching capture and environmental control. |
| 3B   | AHY500 Area           | Simulates meeting collaboration and remote control, BYOM application scenario. |
| 4    | NDP500 Area           | Demonstrates podium control, multimedia teaching, and device integration. |
| 5    | NPS Conference Room   | Simulates meeting collaboration and remote control, supports multi-device access. |
| 6    | Creative Display      | Four screens create a spliced image to enhance visual appeal and brand expression. |



------

## 2. Exhibition Deployment Details

------

### 2.1 General Overview

<img src="./img/泰国展会-202507-V3.drawio.png" alt="v15" style="zoom:67%;" />

| Cable Type                     | Color          | Color Code |
| ------------------------------ | -------------- | ---------- |
| **LAN / Ethernet / PoE+**      | 🟦 Blue         | `#0074D9`  |
| **HDMI (Video)**               | 🔴 Red          | `#FF4136`  |
| **USB**                        | 🟡 Yellow       | `#FFDC00`  |
| **RS232 / RS485**              | 🟣 Purple       | `#B10DC9`  |
| **Audio**                      | 🟢 Green        | `#2ECC40`  |
| **IR Control (Emitter)**       | 🔘 Gray         | `#AAAAAA`  |
| **Relay Control**              | 🟠 Orange       | `#FF851B`  |
| **Power Cable (DC/AC)**        | ⚫ Black        | `#111111`  |
| **Wi-Fi / NFC / UHF / Air IR** | ⚫ Black Dashed | ---        |



------

#### 2.1.1 Grid and Dimension Information

<img src="./img/image-20250520172017360.png" style="zoom: 80%;" /> <img src="./img/02Grid diagram（网格图）.jpg" style="zoom:50%;" />

- Total booth size: **9m x 4m** (9000mm x 4000mm)
- **Main power** at top-left corner, **Server area** near center wall

------

#### 2.1.2 Power Point Locations and Quantities

<img src="./img/image-20250520172705686.png" alt="image-20250520172705686" style="zoom: 50%;" />

------

#### 2.1.3 🔌 Basic Area Cable Statistics

<img src="./img/image-20250606172021508.png" alt="image-20250606172021508" style="zoom:67%;" />

1. **LAN Cables**

   | No.  | Length | Type | Application/Note              |
   | ---- | ------ | ---- | ----------------------------- |
   | 1    | 10m    | Cat6 | Router 1 ➜ Lite Media Server  |
   | 2    | 10m    | Cat6 | Router 1 ➜ Web-Console Server |
   | 3    | 10m    | Cat6 | Router 1 ➜ PoE Switch 1       |
   | 4    | 10m    | Cat6 | Router 1 ➜ PoE Switch 2       |

   

2. **HDMI Cables**

   N/A

3. **Power Cables & Sockets**

   | No.  | Length | Spec        | Application/Note                              | Power Point |
   | ---- | ------ | ----------- | --------------------------------------------- | ----------- |
   | 1    | 5m     | 6-8 Outlets | Router 1 x1, PoE Switch 1 x1, PoE Switch 2 x1 | 10          |
   | 1    | 5m     | 6-8 Outlets | Lite Media Server x1, Web-Console Server x1   | 10          |

   

------

### 2.2 Zone 1: Group Teaching Area

<img src="./img/IQ-Matrix-5.png" alt="IQ-Matrix-5.png" style="zoom:80%;" />

1. **Student Side:**
   - Students use wired LAN/HDMI cables or Wi-Fi to cast laptop screens to PD300 via WP55.
     - If supported, smartphones can substitute laptops (OPS) for demonstration.
2. **Teacher Side:**
   - Teacher’s laptop uses LAN/HDMI cable or Wi-Fi to cast to WP55, and can broadcast via iPad to all groups.
   - PAD can control which screen is displayed where.
   - PAD can annotate any screen.
3. **WP55:**
   - Built-in custom software; mouse connected to WP55 can annotate or interact with content.

#### 🔌 Cable Statistics

1. **LAN Cables**

   Pre-installed by contractor: runs from WP40 rack overhead to storage, total distance height 4m + overhead 8m + drop to storage 4m + redundancy 6m = 22m

   | No.  | Length | Type | Application/Note            |
   | ---- | ------ | ---- | --------------------------- |
   | 1    | 22m    | Cat6 | WP45 network, pre-installed |
   | 2    | 22m    | Cat6 | WP45 network, pre-installed |
   | 3    | 5m     | Cat6 | Router 2 ➜ WP55             |
   | 4    | 5m     | Cat6 | Router 2 ➜ WP55             |
   | 5    | 5m     | Cat6 | Router 2 ➜ WP55             |

   

2. **HDMI Cables**

   Height is 4m; as WP40 is installed on a shelf, 2m is usually sufficient, but 3m is allocated for redundancy.

   > [Certified, yellow heads]

   | No.  | Length | Spec             | Application         |
   | ---- | ------ | ---------------- | ------------------- |
   | 1    | 8m     | HDMI2.0, 4K@60Hz | WP55 ➜ PD300        |
   | 2    | 8m     | HDMI2.0, 4K@60Hz | WP55 ➜ PD300        |
   | 3    | 5m     | HDMI2.0, 4K@60Hz | WP55 ➜ SW1 Basic 55 |

   

3. **Power Cables & Sockets**

   | No.  | Length | Spec        | Application/Note                   | Power Point |
   | ---- | ------ | ----------- | ---------------------------------- | ----------- |
   | 1    | 5m     | 4-6 Outlets | PD300 x2, SW1 Basic 55 x1          | 2           |
   | 1    | 5m     | 4-6 Outlets | Group teaching boxes x3, Router x1 | 2           |

   

   <img src="./img/image-20250527171752732.png" alt="image-20250527171752732" style="zoom:25%;" />

   **Power Adapter:** Model KZ1203000W, Input 100–240V~ 50/60Hz 1.0A Max, Output 12V⎓3.0A (36W Max), indoor use only, Made in China, Certifications: CE, FCC, UKCA, RoHS

#### 2.2.1 Digital Poster-R

<img src="./img/image-20250527151116286.png" alt="image-20250527151116286" style="zoom:33%;" />

Poster content displayed via USB flash drive.

- Poster design: mobile phone casting to screen assistant (320 x 1080).

##### 🔌 Cable Statistics

1. **Power Cables & Sockets**

   | No.  | Length | Spec | Application/Note | Power Point |
   | ---- | ------ | ---- | ---------------- | ----------- |
   | 1    | /      | /    | Digital Poster-R | 1           |

   

------

### 2.3 Zone 2: NDP100 Area

<img src="./img/NDP100-4.png" style="zoom:80%;" />

**NDP100 Area Cabling and Functions**

1. Core product: **NDP100 Smart Podium**, paired with a **75-inch main display** and two solar panels to form the standard classroom wall.
   - Note: Only two PS610 speakers may be available, one for NDP100, one for NDP500.
2. Demonstrated controls include:
   - **Air conditioner panel** (IR control)
   - **Cove lighting strip** (connected to NDP100 External port, reserved power cord)
   - **Motorized projector screen** (controlled via NDP100)
   - Note: No RS232 control demo for IFP due to control codes required from manufacturer.
3. **NDP100 built-in OPS** serves both this area’s panels and teacher-side group teaching display; use needs to avoid resource conflict.
   - 3 USB cables: 2 for solar panels, 1 for teacher side in group teaching

#### 🔌 NDP100 Area Cable Statistics

1. **LAN Cables**

   | No.  | Length | Type | Application/Note |
   | ---- | ------ | ---- | ---------------- |
   | 1    | 10m    | Cat6 | Router ➜ NDP100  |

   

2. **HDMI Cables**

   | No.  | Length | Spec             | Application/Note                          |
   | ---- | ------ | ---------------- | ----------------------------------------- |
   | 1    | 8m     | HDMI2.0, 4K@60Hz | NDP100 ➜ Main Screen TR1300C (back input) |
   | 2    | 1m     | HDMI2.0, 4K@60Hz | E4521 ➜ NDP100 (demo equipment)           |
   | 3    | 8m     | HDMI2.0, 4K@60Hz | NDP100 ➜ LCS810 (lecture capture input)   |

   

3. **Audio Cables**

   | No.  | Length | Spec                                                         | Application/Note |
   | ---- | ------ | ------------------------------------------------------------ | ---------------- |
   | 1    | 8m     | gold silver speaker wire, OFC Oxygen-Free Copper, 16AWG [^1] | NDP100 ➜ PS610   |

   

4. **USB Cables**

   > Panels use LCD OPS

   | No.  | Length | Spec | Application/Note |
   | ---- | ------ | ---- | ---------------- |
   | 1    | 3m     | A-A  | IFP OPS ➜ Panel  |
   | 1    | 3m     | A-A  | IFP OPS ➜ Panel  |

   

   ***USB Not Connected Notes:***

   1. NDP100 OPS ➜ IFP USB (10m): Abandoned; not needed for group teaching

5. **Control Cables**

   | No.  | Type        | Length   | Spec         | Application/Note                             |
   | ---- | ----------- | -------- | ------------ | -------------------------------------------- |
   | 1    | IR          | Standard | IR Standard  | CBX control                                  |
   | 2    | Power Cable | 10m      | 3-core Power | NDP100 ➜ Screen control                      |
   | 3    | Relay       | 10m      | 3-core Power | NDP100 ➜ Strip light (flat cable, not round) |

   

   ***RS232 Not Connected Notes:***

   1. CBX-RS232 control for lecture capture: 1.5m / 3PIN-3PIN, not connected
   2. LCD control NDP100 ➜ Floor ➜ IFP / 3PIN-D89-3PIN / 8m, not connected

6. **Power Cables & Sockets**

   | No.  | Length | Spec        | Application/Note                                             | Power Point |
   | ---- | ------ | ----------- | ------------------------------------------------------------ | ----------- |
   | 1    | 3m     | 4-6 Outlets | TR1300C x1, MEMO2 x1                                         | 12          |
   | 2    | 6m     | 4-6 Outlets | CBX2 x1, MEMO1 x1, Air Conditioner Panel x1                  | 12          |
   | 2    | /      | /           | Direct to power point 9: NDP100 x1, E4521 x1 (powered by NDP100) | 9           |
   | 3    | 3m     | 6-8 Outlets | Strip Light x1, Lecture Capture Host x1, Sound Mixer x1, shared to 12 | 10          |

   

------

### 2.4 Zone 3

#### 2.4.1 Zone 3A: Lecture Capture Area

<img src="./img/LCS-5.png" alt="LCS-5.png" style="zoom: 67%;" />

##### 🔌 LCS Cable Statistics

1. **LAN Cables**

   | No.  | Length | Spec      | Application/Note                               |
   | ---- | ------ | --------- | ---------------------------------------------- |
   | 1    | 22m    | Cat6, PoE | CV870-T ➜ LCS810, pre-installed, PoE supported |
   | 2    | 10m    | Cat6, PoE | CV870-S ➜ LCS810, PoE supported                |
   | 3    | 5m     | Cat6      | S610 ➜ Sound Mixer                             |

   

   ***LAN Not Connected Notes:***

   1. S610 chained microphone LAN not connected; only sound column display needed.
   2. Switch ➜ LCS810 LAN not connected; host and cameras can form a local network.

2. **HDMI Cables**

   | No.  | Length | Spec             | Application/Note            |
   | ---- | ------ | ---------------- | --------------------------- |
   | 1    | 12m    | HDMI2.0, 4K@60Hz | NDP100 ➜ LCS810 video input |

   

3. **Audio Cables**

   | No.  | Length | Spec                     | Application/Note           |
   | ---- | ------ | ------------------------ | -------------------------- |
   | 1    | 2m     | 3.5mm Male to Male (TRS) | Sound Mixer ➜ LCS810 input |

   

4. **USB Cables**

   N/A

5. **Control Cables**

   - CBX - RS232 not connected

6. **Power Cables & Sockets** [Power Point 8]

   | No.  | Length | Spec        | Application/Note         | Power Point |
   | ---- | ------ | ----------- | ------------------------ | ----------- |
   | 1    | 5m     | 3-4 Outlets | LCS810 Host, Sound Mixer | 8           |

   

------

#### 2.4.2 Zone 3B: AHY500 BYOM Area

<img src="./img/image-20250527143000274.png" alt="image-20250527143000274" style="zoom:50%;" />

1. The wall behind IoT, with three devices focused on AHY500 for BYOM demonstrations.
2. Panel software leverages NDP500 OPS; image projected onto 135-inch all-in-one, with E4521 input used for other demos.

##### 🔌 AHY500 Cable Statistics

1. **LAN Cables**

   N/A. AHY500 forms a local network without router access.

2. **HDMI Cables**

   | No.  | Length | Spec             | Application/Note     |
   | ---- | ------ | ---------------- | -------------------- |
   | 1    | 2m     | HDMI2.0, 4K@60Hz | AHY500 ➜ SW1 Display |

   

3. **Audio Cables**

   N/A

4. **USB Cables** [Pending Verification]

   | No.  | Length | Spec      | Application/Note                    |
   | ---- | ------ | --------- | ----------------------------------- |
   | 1    | 3m     | A-A       | IQ Board MEMO ➜ NDP500 OPS (shared) |
   | 2    | 2m     | Extension | A-A USB extension cable             |

   

5. **Control Cables**

   N/A

6. **Power Cables & Sockets**

   | No.  | Length | Spec        | Application/Note                                    | Power Point |
   | ---- | ------ | ----------- | --------------------------------------------------- | ----------- |
   | 1    | 5m     | 6-8 Outlets | AHY500 x1, SW1 x1, IQ Board MEMO x1, Project Screen | 7           |

   

   Note: Initially estimated at 3m, but 5m used in procurement.

------

### 2.5 Zone 4: NDP500 Area

<img src="./img/image-20250604152338183.png" alt="image-20250604152338183" style="zoom:50%;" />

**NDP500 Area Cabling and Functions:**

1. The **NDP500 Podium** is the core, demonstrating a smart classroom solution with a **135-inch LED all-in-one** and **PS610 speakers**; supports OPS and E4520 signal switching.
   - Note 1: Reverse Touch function not demonstrated.
   - Note 2: Only two PS610s may be available—one for NDP100, one for NDP500.
2. Demonstrates **air conditioning control panel**, volume control, and device integration capabilities.
3. **LE60P Panel** (USB connected to NDP500) for writing demonstration.
   - Note: Miracast demonstration and LE60P share OPS resources; schedule presentations to avoid conflict.

#### 🔌 NDP500 Area Cable Statistics

1. **LAN Cables**

   | No.  | Length | Spec | Application/Note                  |
   | ---- | ------ | ---- | --------------------------------- |
   | 1    | 10m    | Cat6 | Storage Switch ➜ NDP500 (network) |

   

2. **HDMI Cables**

   | No.  | Length | Spec             | Application/Note                              |
   | ---- | ------ | ---------------- | --------------------------------------------- |
   | 1    | 10m    | HDMI2.0, 4K@60Hz | NDP500 ➜ 135" LED All-in-One (main video out) |
   | 2    | 1m     | HDMI2.0, 4K@60Hz | E4520 ➜ NDP500 (demo input)                   |

   

3. **Audio Cables**

   | No.  | Length | Spec                                                         | Application/Note |
   | ---- | ------ | ------------------------------------------------------------ | ---------------- |
   | 1    | 8m     | gold silver speaker wire, OFC Oxygen-Free Copper, 16AWG [^1] | NDP500 ➜ PS610   |

   

4. **USB Cables**

   N/A.
    LE60P ➜ NDP500 OPS USB cable counted in AHY500 BYOM Area; not double-counted here.

5. **Control Cables**

   | No.  | Type | Length      | Application/Note          |
   | ---- | ---- | ----------- | ------------------------- |
   | 1    | IR   | 1.5m (std.) | NDP500 ➜ AC panel control |

   

6. **Power Cables & Sockets**

   | No.  | Length | Spec        | Application/Note                               | Power Point |
   | ---- | ------ | ----------- | ---------------------------------------------- | ----------- |
   | 1    | 6m     | 3-4 Outlets | NDP500 Main x1, E4521 x1                       | 6           |
   | 2    | 5m     | 4-6 Outlets | 135" all-in-one x1 [2000+W], CBX1 x1, AC Panel | 11          |

   

------

### 2.6 Zone 5: NPS Conference Room Area

<img src="./img/NSP-2.png" alt="image-20250606165718199" style="zoom:67%;" />

This solution is based on the NPS central controller for multi-screen projection and meeting control:

1. **Inputs:** Supports two HDMI sources (e.g., laptop, WP50) and USB peripherals (keyboard, mouse, microphone S350, camera CV810 GEN2).
2. Recommended outputs:
   - **HDMI OUT 1 (Main Screen):** To 65" QA1300 PRO
   - Auxiliary display repurposed for group teaching; no output here.
3. Touch Panel and NPS host connect via pre-installed cables from storage; CV810 GEN2 supports PoE but will use DC power via LAN due to cable length.
4. Backup spotlight may be connected to NPS; an extra AC panel is also provided for demo.
5. Notes:
   - Using PoE for Touch Panel reduces the need for an AC outlet, making the setup cleaner.
   - Although CV810 GEN2 supports PoE, with many inspection ports, NPS can use public network + AC power, and an extra AC cable on the wall will not look messy.

#### 🔌 NPS Area Cable Statistics

1. **LAN Cables**

   | No.  | Length | Spec      | Application/Note                     |
   | ---- | ------ | --------- | ------------------------------------ |
   | 1    | 15m    | Cat6      | NPS ➜ Storage Switch, system network |
   | 2    | 15m    | Cat6, PoE | Touch Panel ➜ Storage Switch         |
   | 3    | 10m    | Cat6      | CV810 GEN2 ➜ NPS                     |

   

2. **HDMI Cables**

   | No.  | Length | Spec             | Application/Note                                         |
   | ---- | ------ | ---------------- | -------------------------------------------------------- |
   | 1    | 3m     | HDMI2.0, 4K@60Hz | WP50 ➜ NPS (PC1); extra length since NPS is in cabinet   |
   | 2    | 3m     | HDMI2.0, 4K@60Hz | Laptop ➜ NPS (PC2); extra length since NPS is in cabinet |
   | 3    | 8m     | HDMI2.0, 4K@60Hz | HDMI OUT1 ➜ QA1300 PRO (Main Screen)                     |

   

   Note:

   - Extra length is for hidden cabling from podium to wall display.

3. **Audio Cables**

   N/A

4. **USB Cables**

   | No.  | Length | Spec   | Application/Note       |
   | ---- | ------ | ------ | ---------------------- |
   | 1    | 3m     | A-B    | NPS ➜ Laptop           |
   | 2    | 3m     | A-B    | NPS ➜ WP50             |
   | 3    | 10m    | A-B    | CV810 GEN2 ➜ NPS       |
   | -    | N/A    | Dongle | Microphone S350 ➜ NPS  |
   | -    | /      | /      | Keyboard & Mouse ➜ NPS |

   

   Note:

   - Extra length is for hidden cabling as NPS is in cabinet.

5. **Control Cables**

   | No.  | Type  | Length | Application/Note                       |
   | ---- | ----- | ------ | -------------------------------------- |
   | 1    | RS232 | 10m    | NPS ➜ CV810                            |
   | 2    | Relay | 8m     | NPS ➜ Lighting strip switch/demo power |

   

6. **Power Cables & Sockets**

   | No.  | Length | Spec        | Application/Note                               | Power Point |
   | ---- | ------ | ----------- | ---------------------------------------------- | ----------- |
   | 1    | 5m     | 4-6 Outlets | CV810 GEN2 x1, QA1300 PRO x1, SW1 Display x1   | 5           |
   | 2    | 5m     | 4-6 Outlets | NPS Host x1, WP50 x1, backup for demo lighting | 5           |

   

------

### 2.7 Zone 6: All-in-One Displays

Four all-in-one displays are arranged in a floral pattern; designers produce four quadrant images, each device plays its part via USB, combining to form a complete image.

<img src="./img/image-20250526205102014.png" alt="image-20250526205102014" style="zoom:67%;" />

1. **Power Cables & Sockets**

   | No.  | Length | Spec        |      | Application/Note     |
   | ---- | ------ | ----------- | ---- | -------------------- |
   | 1    | 5m     | 4-6 Outlets |      | Power for screens x4 |

   

------

*End of Document*