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
        const list = res.list.map(item => {
          return {
            ...item,
            publishInfo: this.getRelativeTime(item.pubDate) + ' ' + item.infoSource
          }
        })
        let newList = [];
        if (isLoadMore) {
          newList = this.data.eventList.concat(list)
        } else {
          newList = list
        }
        this.setData({
          isLoading: false,
          total: res.total,
          eventList: newList
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
    },
    getRelativeTime(time) {
      const seconds = (Date.now() - time) / 1000
      if (seconds < 60) {
          // 如果小于1分钟
          return seconds + '秒前'
      } else if (seconds >= 60 && seconds < 3600) {
          // 如果大于1分钟，小于1小时
          const minutes = Math.floor(seconds / 60)
          return `${minutes}分钟前`
      } else if (seconds >= 3600 && seconds < 86400) {
          // 如果大于1小时，小于1天
          const hours = Math.floor(seconds / 3600)
          return `${hours}小时前`
      } else if (seconds >= 86400) {
          // 如果大于1天
          const days = Math.floor(seconds / 86400)
          return `${days}天前`
      }
    }
  }
})
