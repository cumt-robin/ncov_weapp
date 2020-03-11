import Toast from '../../utils/toast.js'
import { GetStatsData, GetProvinceStatsData, GetOverseaStatsData, GetCityStatsByProvinceName } from "../../api/service";

let loadingAreaTime;

Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  data: {
    isLoading: true,
    stats: {},
    provinceStats: [],
    overseaStats: [],
    confirmIncreased: '',
    suspectedIncreased: '',
    seriousIncreased: '',
    deadIncreased: '',
    curedIncreased: '',
    isShowCity: false,
    isLoadingAreaData: true, // van-grid加载时样式有点怪，先用这个变量hack一下
    cityData: []
  },
  lifetimes: {
    attached() {
      GetStatsData().then(res => {
        console.log(res)
        this.setData({
          stats: res,
          isLoading: false,
          confirmIncreased: this.getIncrease(res.confirmedIncr),
          suspectedIncreased: this.getIncrease(res.suspectedIncr),
          seriousIncreased: this.getIncrease(res.seriousIncr),
          deadIncreased: this.getIncrease(res.deadIncr),
          curedIncreased: this.getIncrease(res.curedIncr)
        })
      }).catch(fail => {
        this.setData({
          isLoading: false
        })
        Toast.error('数据异常，请稍候重试')
      })

      GetProvinceStatsData().then(res => {
        console.log(res)
        this.setData({
          provinceStats: res,
          isLoadingAreaData: false
        })
      })

      GetOverseaStatsData().then(res => {
        console.log(res)
        this.setData({
          overseaStats: res
        })
      })
    },
    ready() {
    }
  },
  methods: {
    gobackProvince() {
      this.setData({
        isShowCity: false,
        isLoadingAreaData: true
      })
      wx.showLoading({
        title: '加载中',
      })
      clearTimeout(loadingAreaTime)
      loadingAreaTime = setTimeout(() => {
        wx.hideLoading();
        this.setData({
          isLoadingAreaData: false
        })
      }, 300);
    },
    getIncrease(count) {
      return count > 0 ? ('+' + count) : count
    },
    onTapProvince(e) {
      const areaName = e.currentTarget.dataset.keyword;
      this.setData({
        isLoadingAreaData: true
      })
      wx.showLoading({
        title: '加载中',
      })
      GetCityStatsByProvinceName(areaName).then(res => {
        wx.hideLoading();
        this.setData({
          isShowCity: true,
          cityData: res[0].cities
        })
        clearTimeout(loadingAreaTime)
        loadingAreaTime = setTimeout(() => {
          this.setData({
            isLoadingAreaData: false
          })
        }, 300);
      }).catch(fail => {
        wx.hideLoading();
        Toast.error('查询失败')
      })
    }
  }
})
