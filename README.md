# 概述

用小程序展示新型冠状病毒疫情的实时数据统计，辟谣知识，防护知识，最新事件，疾病知识等信息，为抗击疫情做一点微小的贡献。

这个仓库是小程序**wuhan速报**项目的源码，目前小程序还未通过人工审核，所以暂时还看不了（吐槽：微信小程序审核真的慢），只有体验版可以看（有需要请联系我微信ice_lloly）。

小程序**wuhan速报**二维码如下，扫码可查看实时疫情数据。

![wuhan速报](https://qncdn.wbjiang.cn/武汉速报小程序码.jpg)

# 使用

如果您想试试这个项目，那么需要先进行下面两个步骤


1. 安装依赖

```
npm install
```

2. 构建npm

在微信开发者工具中构建npm，具体操作指南请参考[npm支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

3. 注意

经测试发现，执行完上述两步后，某些情况微信开发者工具打开项目后仍然会报错，建议根据报错提示，找到相应页面对应的`index.json`文件，注释其中一个`vant`组件，保存下，然后撤销注释，再次保存。

![小程序在开发者工具中的bug](https://qncdn.wbjiang.cn/%E7%96%AB%E6%83%85%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%9C%A8%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7%E7%9A%84bug.png)

可能会依次报好几个页面的这类错误，每个页面按上述操作执行一次就可以了！

# 数据来源

[后端服务](https://github.com/cumt-robin/wuhan_best_wishes)采用`nodejs`语言开发，提供了很多接口，支持`https`。详情请点击[后端服务](https://github.com/cumt-robin/wuhan_best_wishes)项目链接查看源码和说明。

# 部分界面

![统计数据](https://qncdn.wbjiang.cn/统计数据.jpg)

![疫情地图及趋势](https://qncdn.wbjiang.cn/疫情地图及趋势.jpg)

![国内疫情](https://qncdn.wbjiang.cn/国内疫情.jpg)

![国外疫情](https://qncdn.wbjiang.cn/海外疫情.jpg)

![辟谣](https://qncdn.wbjiang.cn/谣言与防护.jpg)

![事件播报](https://qncdn.wbjiang.cn/事件播报.jpg)

![疾病知识](https://qncdn.wbjiang.cn/疾病知识.jpg)