// pages/establishcard/establishcard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeIndex:2,
    types:['积分卡','充值卡','积分充值一体卡','优惠卡'],
    cardname:'',
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

  onTypeChange: function(e){
    this.setData({
      typeIndex:e.detail.value
    });
  },
  
  onInput: function(e){
    this.setData({
      cardname: e.detail.value
    });
  },

  onSubmit:function(){
    wx.request({
      url: getApp().globalData.URL + "/api/card/establish",
      data: { merchant_id: wx.getStorageSync('merchant_id'), card_name: this.data.cardname, type: this.data.typeIndex },
      success(resl) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})