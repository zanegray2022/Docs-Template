
---
title: CocoApp 签名发布文档_0528

description: CocoApp 签名发布文档_0528
---
## 一、概述

本文档详细说明 CocoApp 的签名发布流程，确保发布过程规范准确，指导完成 CocoApp 子站的打包、构建、签名及更新操作。

## 二、发布流程

#### 1.前端项目打包

使用前端项目指定打包工具进行打包，生成静态资源文件。

#### 2.构建 CocoApp 子站目录结构

1. 创建**以子站地址命名的空文件**夹作为 CocoApp 子站文件夹。
2. 将打包后的静态资源文件复制到该文件夹。
3. 确保文件夹内文件结构如下：

```
CocoApp子站文件夹(子站地址)
├── ...其他静态资源
├── index.html
├── icon.png
├── content.json
├── initpub.cjs
```

4. **关注conent.josn中merged_type字段是否与当前子站对应，对应关系如下：**

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

#### 3.执行初始化脚本

打开终端，进入 CocoApp 子站项目根目录（即上述文件夹），执行命令 node initpub.cjs 完成初始化(保证content.json和publishfiles.josn都成功初始化)。

#### 4.发送文件进行签名

将完整的 CocoApp 子站文件夹（含所有资源及文件）发送至Cococat团队进行签名。

#### 5.子站更新

获取签名后的产物，按系统更新流程部署到子站环境，完成更新。

## 三、注意事项

- 操作中仔细核对文件路径、名称及结构，避免疏漏。