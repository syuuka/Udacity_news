//引入Moment.js 用于格式化日期和时间
const dateUtil = require('../../utils/Moment.js');
//导航栏对应的访问类型
const nav_set = {
  "国内": 'gn',
  "国际": 'gj',
  "财经": 'cj',
  "娱乐": 'yl', 
  "军事": 'js',
  "体育":'ty',
  "其他":'other',
};

Page({
  data: {
    navList: ["国内", "国际", "财经", "娱乐", "军事", "体育", "其他"],
    head_news: '',
    list_news:'',
    type:'gn',
    checkedType:'国内',
  }, 
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '快读·资讯'
    });
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#34A1E2",
    });
    let type = this.data.type;
    let list = this.getNewsList(type);
  },
  onPullDownRefresh() {
    this.getNewsList(this.data.type, () => {
      wx.stopPullDownRefresh()
    });
  },
  getNewsList(newsType, callback){
    let head = "";
    let list = "";
    let check = "";
    for (let key in nav_set){
      if (nav_set[key] == newsType){
        check = key;
      }
    }
    if(newsType==""){
      newsType = "gn"
    }
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: newsType
      },
      success: res => {
        let data = res.data.result;
        this.formatDate(data);
        head = res.data.result.slice(0,3);
        list = res.data.result.slice(3);
        this.setData({
          head_news: head,
          list_news: list,
          checkedType: check,
        });
      },
      complete: () =>{
        callback && callback()
      }
    })
  },
  gotoNav(navName){
    let nav = navName.currentTarget.dataset.type;
    let type = nav_set[nav];
    this.getNewsList(type);
  },
  gotoDetail(id){
    let news_id = id.currentTarget.dataset.detail.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id='+news_id,
    });
  },
  formatDate(data){
    let temp = data;
    const c = new Date(temp[0].date);
    for(let i = 0; i < temp.length; i++ ){
      const d = new Date(temp[i].date);
      temp[i].date = `${d.getFullYear()}` + '-' + `${d.getMonth() + 1}` + '-' + `${d.getDate()}`;
      //判断图片链接是否为空，若为空，则用占位图片补上
      if (temp[i].firstImage == '') {
        temp[i].firstImage = '../../images/占位图片.jpg';
      }
    }
  },
  
})