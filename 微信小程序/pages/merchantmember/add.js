// pages/merchantmember/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId : '',
    realname : '',
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


  onIdInput: function (e) {
    this.setData({
      userId: e.detail.value
    });
  },

  onNameInput: function (e) {
    this.setData({
      realname: e.detail.value
    });
  },

  onSubmit: function () {
    wx.request({
      url: getApp().globalData.URL + "/api/merchant/addMember",
      data: {
        merchant_id: wx.getStorageSync('merchant_id'),
        user_id: this.data.userId,
        user_realname: this.data.realname 
      },
      success(resl) {
        if(resl.data.code == 100){
          wx.navigateBack({
            delta: 1
          })
        }else{
          wx.showToast({
            title: resl.data.msg,
            icon:'none'
          })
        }
      }
    })
  }
})