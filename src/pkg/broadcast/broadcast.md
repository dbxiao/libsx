## 简介

广播是一种消息通信方式，它可以让多个组件通过广播形式进行数据、交互通信，每一个组件都可以接收和发出广播。

## 示例

<code src='./demo/demo.tsx' ></code>

## 开始

### 安装

```shell
npm install @libsx/cola
pnpm install @libsx/cola
yarn install @libsx/cola
```

### 引用

```javascript
import { broadcast } from '@libsx/cola'
```

### 使用

```javascript
broadcast.listen('linsten1', (data, id) => {
	console.log(data)
})

broadcast.trigger('linsten1', data)
```

---

## API

### trigger(name, data)

-   广播事件，触发事件，通知其他组件

| 参数 | 说明     | 类型   | 默认值 |
| ---- | -------- | ------ | ------ |
| name | 事件名称 | string | -      |
| data | 事件数据 | any    | -      |

```javascript
broadcast.trigger('name', data)
```

### listen(name, callback(data: any, id?: string))

-   监听事件，监听广播事件

| 参数                             | 说明     | 类型                             | 备注 |
| -------------------------------- | -------- | -------------------------------- | ---- |
| name                             | 事件名称 | string                           | -    |
| callback(data: any, id?: string) | 事件回调 | (data: any, id?: string) => void | -    |

```javascript
broadcast.listen('name', (data: any, id: string) => {
	console.log(data)
	// 当广播监听事件处理后，你可以选择cancel掉这个监听器。
	broadcast.cancel(id)
})
```

### remove(name)

-   删除广播监听
-   <code>注意：该操作会删除所有监听该事件的监听器，如果有多个同名监听器，均无法监听。并且无法恢复</code>

```javascript
broadcast.remove(name) // 以name命名的广播将不再接受消息
```

### cancel(id)

-   取消指定的监听器
-   <code>注意：该操作只对指定的监听器取消有效，取消后无法恢复，需要重新注册（listen）。</code>

```javascript
broadcast.cancel(id) // 取消id为1的监听器
```

### getChannel(name)

-   获取指定频道

```javascript
broadcast.getChannel(name) // 获取以name命名的频道
```

### getAllChannels()

-   获取所有频道

```javascript
broadcast.getAllChannels()
```

## 应用场景

### 父子、爷孙组件通信

> 不管你的项目组件是父子还是爷孙组合，无论层级多深，广播通信均会忽略层级的差异

### 平行组件通信

> 平行组件通信是指同一层级的组件之间通信，比如同一层级的组件 A 和组件 B，它们可以相互通信，但它们并不属于同一个父组件，它们之间是平行的，广播可以很好的支持平行组件通信

### SPA 跨页面通信

> 在 SPA 单页面，当你修改了用户头像，虽然用户看不到首页，但你修改头像的操作，可以广播出去，首页监听到广播后，即可异步修改。

### 多组件通信

> 在电商项目中，购买商品行为，会导致网站的购物车、商品数、订单数等多个组件数据更新，这个时候，你可以点击商品时，进行广播通知，页面的其他组件收到广播后，执行交互操作。

## GitHub

https://github.com/dbxiao/libsx
