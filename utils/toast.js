const Toast = {
    simple: function (msg) {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
    },
    success: function(msg = '操作成功') {
      wx.showToast({
        title: msg
      })
    },
    error: function (msg = '出错了，请稍后重试') {
      this.simple(msg)
    }
  }
  
  export default Toast
  