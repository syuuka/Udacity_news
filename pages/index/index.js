// pages/index/index.js
Page({
  data: {
    navList: ["国内", "国际", "财经", "娱乐", "军事", "体育", "其他"],
    head: ''
  }, 
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '快读·资讯'
    })
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#34A1E2",
    })
    let list = this.getNewsList("gn");
    console.log(list)
  },
  getNewsList(newsType){
    console.log(newsType)
    let head_news = ""
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: newsType
      },
      success: res => {
        head_news = res.data.result[0]
        this.setData({
          head: head_news
        })
        console.log(head);
      }
    })
    return head_news
  }
})