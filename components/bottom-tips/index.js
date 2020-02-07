// components/bottom-tips/index.js
Component({
  properties: {
    content: {
      type: String
    },
    customClass: {
      type: String
    },
    top: {
      type: String,
      value: '30rpx'
    },
    bottom: {
      type: String,
      value: '30rpx'
    },
    fontSize: {
      type: String
    },
    line: {
      type: Boolean,
      value: true
    }
  }
})
