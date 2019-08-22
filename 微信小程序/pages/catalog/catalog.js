// Catalog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curTopCla : 'a',
    cla : [
      { topname: '大小家电',topid : 'a' ,
        subcla : [
          { subname: '电脑', subid: 'a1' },
          { subname: '手机', subid: 'a2' },
          { subname: '平板', subid: 'a3' },
          { subname: '电视', subid: 'a4' },
          { subname: '冰箱', subid: 'a5' },
          { subname: '空调', subid: 'a6' },
          { subname: '洗衣机', subid: 'a7' },
          { subname: '电饭锅', subid: 'a8' },
          { subname: '微波炉', subid: 'a9' },
          { subname: '油烟机', subid: 'a10' },
          { subname: '燃气灶', subid: 'a11' },
          { subname: '热水器', subid: 'a12' },
        ]},
      { topname: '水电煤气', topid: 'b' },
      { topname: '房屋装潢', topid: 'c' },
      { topname: '科教文体', topid: 'd' },
      { topname: '交通出行', topid: 'e' }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //点击事件：左侧大分类被点击
  switchRightItem: function (event){
    let tappedId = event.target.dataset.id;
    console.log("左侧项目被点击，ID为:"+tappedId);
    this.setData({curTopCla:tappedId});
  },

  //点击事件：右侧小分类点击
  rightItemTapped: function (event){
    let tappedId = event.target.dataset.id;
    console.log("右侧项目被点击，ID为:" + tappedId);
    wx.navigateTo({
      url: '../result/result?cla='+tappedId
    })
  },
})