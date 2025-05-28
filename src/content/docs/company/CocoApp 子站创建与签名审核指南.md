---
title: CocoApp 子站创建与签名审核指南_0528

description: CocoApp 子站创建与签名审核指南_0528
---
## 一、创建子站

### 1. 初始化子站结构

执行初始化命令创建空的 CocoApp 子站结构：

```bash
./cococat siteCreate
```

#### 执行结果说明：

命令执行后将生成 **子站私钥（Site private key）** 和 **子站地址（Site address）**，示例输出如下：

```log
time="2023-12-11T13:49:34+08:00" level=info msg="Init OK"
time="2023-12-11T13:49:34+08:00" level=info msg="Listen port in 17243"
time="2023-12-11T13:49:34+08:00" level=info msg="Loading sites..."
time="2023-12-11T13:49:34+08:00" level=info msg=----------------------------------------------------------------------
time="2023-12-11T13:49:34+08:00" level=info msg="Site private key: 5KGR...DcM7a"
time="2023-12-11T13:49:34+08:00" level=info msg="                  !!! ^ Save it now, required to modify the site ^ !!!"
time="2023-12-11T13:49:34+08:00" level=info msg="Site address:     17BB4T8aHw9MJ58MTrtTgUDP73gQJqdDtF"
time="2023-12-11T13:49:34+08:00" level=info msg=----------------------------------------------------------------------
```

**操作要求**：

- **立即保存私钥**：私钥用于后续签名和修改子站，丢失将无法恢复。
- **目录生成**：当前目录下自动创建 `data` 文件夹，子站文件存储于 `data/{Site address}` 路径。

### 2. 配置子站元数据

进入 `data/{Site address}` 文件夹，编辑 `content.json` 文件，配置子站基础信息：

```json
{
	...
  "merged_type": "0001",                              // 子站分类（必填，见下表）
	...
}
```

#### `merged_type` 分类映射表

| 序号   | 分类名称      | 序号   | 分类名称  |
| ------ | ------------- | ------ | --------- |
| `0001` | Books         | `0012` | Medica    |
| `0002` | Busniess      | `0013` | Music     |
| `0003` | DevTools      | `0014` | Newspaper |
| `0004` | Education     | `0015` | Video     |
| `0005` | Entertainment | `0016` | Shopping  |
| `0006` | Finance       | `0017` | Sports    |
| `0007` | Food          | `0018` | Social    |
| `0008` | Design        | `0019` | Travel    |
| `0009` | Health        | `0020` | Utilities |
| `0010` | Kids          | `0021` | Weather   |
| `0011` | Lifestyle     | `0022` | Other     |

## 二、子站签名

### 1. 准备签名文件

- 签名空模板：
  - 确保子站已经创建完成并修改了content.json的merged_type字段。
  - 复制根目录publishfiles.json到data文件夹下对应的Site address的文件夹下。

- 签名热更子站：
  - 删除data文件夹下对应Site address的文件夹。
  - 将待签名的子站文件夹复制到data文件夹下。

### 2. 执行签名命令

使用以下命令完成子站签名：

```bash
./cococat siteSign [address] [private key]
```

#### 参数说明：

| 参数          | 描述                            | 示例值                               |
| ------------- | ------------------------------- | ------------------------------------ |
| `address`     | 子站地址（即 Site address）     | `17BB4T8aHw9MJ58MTrtTgUDP73gQJqdDtF` |
| `private key` | 子站私钥（即 Site private key） | `5KGR...cM7a`                        |

### 3. 签名验证

- 签名成功后，`data/{Site address}` 文件夹中将生成签名后的产物（包含加密文件）。
- 后续可通过热更新流程将签名后的子站部署至生产环境。