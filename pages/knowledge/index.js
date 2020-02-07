import Toast from '../../utils/toast.js'
import { GetWikiData } from "../../api/service";

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  data: {
    isLoading: true,
    wikiList: []
  },
  lifetimes: {
    attached() {
      GetWikiData().then(res => {
        console.log(res)
        this.setData({
          isLoading: false,
          wikiList: res.result
        })
      }).catch(fail => {
        this.setData({
          isLoading: false
        })
        Toast.error('数据异常，请稍候重试')
      })
    }
  },
  methods: {
    copy(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.linkurl,
        success(res) {
          wx.showToast({
            title: '链接已复制'
          })
        }
      })
    }
  }
})
