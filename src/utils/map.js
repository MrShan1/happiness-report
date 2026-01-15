import countries from '../testData/countries';

export default {
  /** 矢量图地址 */
  geoJsonUrl: {
    /** 地图缩放比1:50 */
    world_50: '/static/json/world_50m.json',
    /** 地图缩放比1:110 */
    world_110: '/static/json/world_110m.json'
  },
  /** 区域名称字段 */
  areaNameKey: 'ADMIN',
  /** kb指数等级划分 */
  gtiPieces: [
    { gte: 6, lt: 7, color: '#c32459' },
    { gte: 5, lt: 6, color: '#c45822' },
    { gte: 4, lt: 5, color: '#dab40d' },
    { gte: 3, lt: 4, color: '#02b0ae' },
    { gte: 2, lt: 3, color: '#02d1ff' },
    { gte: 1, lt: 2, color: '#0874fb' },
    { gte: 0, lt: 1, color: '#0e36b0' }
  ],
  /** kb指数等级对应颜色，从高到低 */
  gtiColors: ['#c32459', '#c45822', '#dab40d', '#02b0ae', '#02d1ff', '#0874fb', '#0e36b0'],
  /**
   * 获取国家字典信息
   *
   * @param {Object} caller 请求页面主体
   * @param {Function} callback 回调处理
   */
  getCountries: (caller, callback) => {
    // caller.$axios.get("/api/api/tsgz/getGjxxList").then(res => {
    //   let countries = {};
    //   if (res.code == 200) {
    //     res.obj.forEach(item => {
    //       countries[item.qyyymc] = item;
    //     });
    //   }
    //   callback(countries);
    // });

    let countryData = {};
    countries.forEach((item) => {
      countryData[item.qyyymc] = item;
    });
    callback(countryData);
  }
};
