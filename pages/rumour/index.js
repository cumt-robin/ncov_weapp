import Toast from '../../utils/toast.js'
import { GetRumourData } from "../../api/service";

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  data: {
    isLoading: true,
    rumourList: [],
  },
  lifetimes: {
    attached() {
      GetRumourData().then(res => {
        console.log(res)
        this.setData({
          isLoading: false,
          rumourList: res.map(item => {
            return {
              ...item,
              status: this.getRumorTypeText(item.rumorType)
            }
          })
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
    getRumorTypeText(type) {
      return type === 0 ? '谣言' : type === 1 ? '真相' : type === 2 ? '尚无定论' : '未求证'
    }
  }
})
