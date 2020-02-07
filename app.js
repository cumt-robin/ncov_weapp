import Toast from "./utils/toast.js"

// app.js
App({
  onLaunch: function () {
    console.log('onLaunch', this)
    this.checkUpdate()
    // 登录
    wx.login({
      success: res => {
        console.log('login', res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    this.checkDevice();
    this.checkUserSetting();
  },
  globalData: {
    userInfo: null,
    systemInfo: null,
    isIphonex: false
  },
  checkUpdate() {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(res => {
      if (res.hasUpdate) {
        // 有新版本
        Toast.simple('发现新版本，请稍候')
        updateManager.onUpdateReady(() => {
          wx.showModal({
            title: '版本更新',
            content: '新版本已经准备好，是否重新加载小程序？',
            success(res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })

        updateManager.onUpdateFailed(() => {
          Toast.simple('网络出了点问题，新版本下载失败')
        })
      }
    })
  },
  checkUserSetting() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userinfoCallback) {
                this.userinfoCallback(true, res)
              }
            }
          })
        } else {
          // 未授权，也回调
          if (this.userinfoCallback) {
            this.userinfoCallback(false, res)
          }
        }
      }
    })
  },
  checkDevice() {
    wx.getSystemInfo({
      success: res => {
        console.log('system info:', res)
        this.globalData.systemInfo = res
        // 根据 model 进行判断
        if (res.model.indexOf('iPhone X') !== -1) {
          this.globalData.isIphonex = true
        }
      }
    })
  }
})