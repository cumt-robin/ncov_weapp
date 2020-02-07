import api from "./index";

// 获取统计数据
export const GetStatsData = params => api.get(`stats`, params);

// 获取省份统计数据
export const GetProvinceStatsData = params => api.get(`province_stats`, params);

// 按省份查疫情数据
export const GetCityStatsByProvinceName = areaName => api.get(`city_stats/${areaName}`);

// 获取国外统计数据
export const GetOverseaStatsData = params => api.get(`oversea_stats`, params);

// 查询最新辟谣
export const GetRumourData = params => api.get(`rumour`, params);

// 查询知识wiki
export const GetWikiData = params => api.get(`wiki`, params);

// 查询发生事件
export const GetTimelinePageData = params => api.get(`timeline`, params);
