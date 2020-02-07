import Toast from '../../utils/toast.js'
import { GetTimelinePageData } from "../../api/service";
import { throttle } from "weapp-utils"

// 监听滚动节流
const loadMoreThrottle = throttle(func => func(), 300)

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  data: {
    isLoading: true,
    pageNo: 1,
    pageSize: 6,
    total: 0,
    eventList: []
  },
  lifetimes: {
    attached() {
      this.getDataList();
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
    },
    getDataList(isLoadMore = false) {
      GetTimelinePageData({
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize
      }).then(res => {
        console.log(res)
        let list = [];
        if (isLoadMore) {
          list = this.data.eventList.concat(res.list)
        } else {
          list = res.list
        }
        this.setData({
          isLoading: false,
          total: res.total,
          eventList: list
        })
      }).catch(fail => {
        this.setData({
          isLoading: false
        })
        Toast.error('数据异常，请稍候重试')
      })
    },
    loadMore() {
      if (this.data.eventList.length < this.data.total) {
        this.setData({
          pageNo: this.data.pageNo + 1
        })
        this.getDataList(true)
      }
    },
    onScrollToLower() {
      loadMoreThrottle(() => {
        this.loadMore()
      })
    }
  }
})
