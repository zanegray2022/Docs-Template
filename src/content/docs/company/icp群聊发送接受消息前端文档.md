
---
title: 群聊消息发送与接收流程
description: A guide in my new Starlight docs site.
---

### 一、消息结构

#### 1. 文字消息

- **发送结构**

```json
{
    "createtime": 0,
    "content": {
        "message": "",
        "hasLinks": ""
    }
}
```

- **存储结构**

```json
{
    "recordId": "", // 格式：${groupId}_${gUIs.icpPk}_${time}
    "groupId": "",
    "memberId": "",
    "createtime": 0,
    "type": "text",
    "isSending": 0,
    "content": {
        "message": "",
        "hasLinks": ""
    }
}
```

#### 2. 图片消息

- **发送结构**

```json
{
    "createtime": 0,
    "w": 0,
    "h": 0,
    "content": {
        "fileHash": "",
        "key": "",
        "iv": ""
    }
}
```

- **存储结构**

```json
{
    "recordId": "", // 格式：${groupId}_${gUIs.icpPk}_${time}
    "groupId": "",
    "memberId": "",
    "createtime": 0,
    "type": "image",
    "w": 0,
    "h": 0,
    "localsrc": "",
    "downloaded": 2,
    "isSending": 0,
    "content": {
        "fileHash": "",
        "key": "",
        "iv": ""
    }
}
```

#### 3. 视频消息

- **发送结构**

```json
{
    "createtime": 0,
    "w": 0,
    "h": 0,
    "content": {
        "fileHash": "",
        "thumbnailHash": "",
        "key": "",
        "iv": ""
    }
}
```

- **存储结构**

```json
{
    "recordId": "", // 格式：${groupId}_${gUIs.icpPk}_${time}
    "groupId": "",
    "memberId": "",
    "createtime": 0,
    "type": "video",
    "w": 0,
    "h": 0,
    "link": "",
    "thumbnailsrc": "",
    "downloaded": 2,
    "isSending": 0,
    "content": {
        "fileHash": "",
        "key": "",
        "iv": ""
    }
}
```

#### 4. 语音消息

- **发送结构**

```json
{
    "createtime": 0,
    "dur": 0,
    "content": {
        "fileHash": "",
        "key": "",
        "iv": ""
    }
}
```

- **存储结构**

```json
{
    "recordId": "", // 格式：${groupId}_${gUIs.icpPk}_${time}
    "groupId": "",
    "memberId": "",
    "type": "audio",
    "createtime": 0,
    "dur": 0,
    "downloaded": 2,
    "isSending": 0,
    "content": {
        "fileHash": "",
        "key": "",
        "iv": ""
    }
}
```

#### 5. 文件消息

- **发送结构**

```json
{
    "createtime": 0,
    "filename": "",
    "size": 0,
    "content": {
        "fileHash": "",
        "key": "",
        "iv": ""
    }
}
```

- **存储结构**

```json
{
    "recordId": "", // 格式：${groupId}_${gUIs.icpPk}_${time}
    "groupId": "",
    "memberId": "",
    "createtime": 0,
    "type": "file",
    "filename": "",
    "size": 0,
    "downloaded": 2,
    "isSending": 0,
    "content": {
        "fileHash": "",
        "key": "",
        "iv": ""
    }
}
```

#### 6. 回复消息

- **发送结构**

```json
{
    "createtime": 0,
    "content": {
        "replyType": "", // 可能值：image, video, audio, text, file
        "message": "", // 对什么内容进行回复
        "replyMessage": "", // 回复的内容
        "src": "", // 图片的src，视频的封面src
        "textlink": ""
    }
}
```

- **存储结构**

```json
{
    "recordId": "", // 格式：${groupId}_${gUIs.icpPk}_${time}
    "groupId": "",
    "memberId": "",
    "type": "reply",
    "isSending": 0,
    "createtime": 0,
    "content": {
        "replyType": "", // 可能值：image, video, audio, text, file
        "message": "", // 对什么内容进行回复
        "replyMessage": "", // 回复的内容
        "src": "", // 图片的src，视频的封面src
        "textlink": ""
    }
}
```

#### 7. 表情消息

- **发送结构**

```json
{
    "createtime": 0,
    "w": 0,
    "h": 0,
    "src": "", // 指令
    "content": {}
}
```

- **存储结构**

```json
{
    "recordId": "", // 格式：${groupId}_${gUIs.icpPk}_${time}
    "groupId": "",
    "memberId": "",
    "isSending": 0,
    "type": "expression1",
    "createtime": 0,
    "w": 0,
    "h": 0,
    "src": "", // 指令
    "content": {}
}
```

#### 8. 加入消息

- **发送结构**

```json
{
    "createtime": 0,
    "content": {}
}
```

- **存储结构**

```json
{
    "createtime": 0,
    "type": "join",
    "content": {}
}
```

#### 9. 创建消息

- **发送结构**

```json
{
    "createtime": 0,
    "content": {}
}
```

- **存储结构**

```json
{
    "createtime": 0,
    "type": "create",
    "content": {}
}
```

### 二、发送逻辑

#### 1. 通用发送步骤

- **构建消息体**：根据不同的消息类型，按照对应的发送结构构建消息。
- **加密处理**：使用 `CococatMsg` 和 `groupid` 生成密码，采用如 AES - 256 算法对消息进行加密。
- **内容压缩**：使用 `msgpack` 对加密后的发送内容进行压缩，以减少传输数据量。
- **消息发送**：调用 `actor.send_message(type, sendContent)` 方法发送消息，其中 `type` 表示消息类型，具体对应关系如下：



```plaintext
// 0：文字消息
// 1：表情消息
// 2：文件消息
// 3：图片消息
// 4：视频消息
// 5：语音消息
// 6：创建消息
// 7：加入消息
// 8：回复消息
```

#### 2. 附件类消息上传步骤

- **初始化加密参数**：使用加密库初始化 `key` 和 `iv`。
- **计算文件哈希**：获取文件的哈希值，用于唯一标识文件。
- **上传加密文件**：调用对象存储后端，将加密后的文件进行上传。

#### 3. 不同类型附件消息的处理

- **图片消息**
  - **获取并加密内容**：从客户端获取图片的 base64 内容，进行加密处理，生成加密后的 `.dat` 文件。
  - **上传图片**：将加密后的图片文件上传到对象存储。
  - **发送消息**：按照图片消息的发送结构构建并发送消息。
- **文件消息**
  - **获取文件内容**：从客户端获取文件内容。
  - **上传文件**：将文件上传到对象存储。
  - **发送消息**：按照文件消息的发送结构构建并发送消息。
- **视频消息**
  - **获取视频和封面内容**：从客户端获取视频和封面的内容。
  - **加密封面内容**：对封面内容进行加密，生成加密后的 `.dat` 文件。
  - **分别上传**：将视频和加密后的封面内容分别上传到对象存储。
  - **发送消息**：按照视频消息的发送结构构建并发送消息。
- **语音消息**
  - **获取语音内容**：录音完毕后，从客户端获取语音内容。
  - **上传语音**：将语音文件上传到对象存储。
  - **发送消息**：按照语音消息的发送结构构建并发送消息。

### 三、接收逻辑

- **本地消息获取**：从本地存储中获取已有的消息。
- **线上消息获取**：从ICP获取消息，每次获取 30 条。对于附件消息，需要先从线上下载内容到本地，然后使用消息体中的 `key` 和 `iv` 进行解密，最后解密整个消息。
- **消息合并**：将从本地和线上获取的消息进行合并。
- **本地存储**：将合并后的消息存储到本地，以便后续使用。