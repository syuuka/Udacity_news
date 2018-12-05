// pages/detail.js
Page({
  data: {
    id:"1523074607696",
    detail:"",
  },

  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: "#000000",
      backgroundColor: '#ffffff',
    }),
    wx.setNavigationBarTitle({
      title: '新闻详情',
    }),
    this.getDetail(options.id);
  },
  getDetail(id){
    let news_detail = "";
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id : id,
      },
      success: res => {
        news_detail = res.data.result;
        this.formatDate(news_detail);
        this.setData({
          detail: news_detail
        })
      }
    })
  },
  formatDate(news_detail) {
    let temp = news_detail;
    const d = new Date(temp.date);
    news_detail.date = `${d.getFullYear()}` + '-' + `${d.getMonth() + 1}` + '-' + `${d.getDate()}`;
  }
})