# 泰国展会的信息记录

[toc]





## DNP100v3 （10寸屏）



| Key            | Value                                         | Remark |
| -------------- | --------------------------------------------- | ------ |
| Device ID      | 572E7D37DAFD                                  |        |
| Console Server | 192.168.5.60                                  |        |
| NMP IP         | 192.168.5.102                                 |        |
| 广播特性       | HDMI OUT A，C可以广播<br />HDMI OUT B口不广播 |        |



## NDP500

| Key            | Value        | Remark |
| -------------- | ------------ | ------ |
| Device ID      | 572B6D15905F |        |
| Console Server | 192.168.5.60 |        |
| NDP500 IP      | 192.168.5.?  |        |



## 场地部署

<img src="./img/image-20240624094510184.png" alt="image-20240624094510184" style="zoom:97%;" /> 

<img src="./img/image-20240710140756346.png" alt="image-20240710140756346" style="zoom:67%;" /> 

1. 总体分为两个解决方案进行搭建：
   - 智慧教室方案
   - 会议室方案
2. 会议室方案围绕NPS为核心进行搭建
   - NPS暗埋在会议桌下/柜子内，10寸屏放在桌面
   - NPS控制2台液晶，第三台液晶纯粹展示，接**MBX**
   - 邀请客人围绕会议桌坐下对NPS方案进行介绍
3. 智慧教室方案围绕NDP500和NDP100为核心进行搭建
   - NDP500
     - NDP500放在左边
   - NDP100
     - NDP100放在右边

4. 中间是空白的会贴海报
5. 空调内机：
   - 品牌： 奥克斯
   - 电线不会很长
   - <font color=red>还需要带一个CBX </font>，使用NDP100连接该内机

6. 空调面板：
   - 总计3个，可用于NSP100，NDP500

7. 灯：
   - Q崽射灯接500
   - 射灯：线没有接
   - Q-NEX给NPS



## 拓扑图



### NDP500

![image-20240624100732340](./img/image-20240624100732340.png) 



### NDP100

 <img src="./img/image-20240624100937238.png" alt="image-20240624100937238" style="zoom:87%;" /> 



### NPS100

<img src="./img/image-20240624101003902.png" alt="image-20240624101003902" style="zoom:67%;" /> 



<img src="./img/image-20240712162520804.png" alt="image-20240712162520804" style="zoom: 87%;" /> <img src="./img/image-20240712162600136.png" alt="image-20240712162600136" style="zoom:87%;" />



### LCS710

![image-20240711141218688](./img/image-20240711141218688.png)



<img src="./img/image-20240711141400774.png" alt="image-20240711141400774" style="zoom:87%;" /> 



### LCS710 Pro

<img src="./img/image-20240711141245738.png" alt="image-20240711141245738" style="zoom:67%;" />

<img src="./img/image-20240711140905187.png" alt="image-20240711140905187" style="zoom:67%;" /> 

**Pre-setting Steps:**

1. Add one Ethernet network IP to PC: 
   - IP: 192.167.32.100
   - Subnet: 255.255.255.0

2. Connect PC to the POE3 port of the station.





### AS200

<img src="./img/image-20240712102041168.png" alt="image-20240712102041168" style="zoom:87%;" />



