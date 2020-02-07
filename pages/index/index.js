const app = getApp()

Page({
  data: {
    activeTab: 'home',
    panels: [
      { name: 'home', icon: 'bar-chart-o', label: '疫情地图' },
      { name: 'rumour', icon: 'question-o', label: '辟谣与防护' },
      { name: 'realtime', icon: 'bullhorn-o', label: '事件播报' },
      { name: 'knowledge', icon: 'records', label: '疾病知识' }
    ],
    isIphonex: app.globalData.isIphonex
  },
  onLoad(query) {
    if (query.active) {
      this.setData({
        activeTab: query.active
      })
    }
    app.userinfoCallback = this.onUserinfoReady
  },
  onUserinfoReady(flag, res) {
    console.log('userinfo ready:', res)
  },
  onTabChange(event) {
    this.setData({
      activeTab: event.detail
    })
  }
})
