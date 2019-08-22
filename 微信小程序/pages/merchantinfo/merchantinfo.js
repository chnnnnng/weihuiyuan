// pages/merchantinfo/merchantinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchant:{},
    isEditable: false,
    merchant_id:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    if(options.mid == null){
      this.setData({ isEditable: true });
      this.setData({ merchant_id: wx.getStorageSync('merchant_id') });
    }else{
      this.setData({ merchant_id: options.mid });
    }
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
    getMerchantInfo(this.data.merchant_id, this);
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
})

function getMerchantInfo(merchant_id, ctx) {
  wx.request({
    url: getApp().globalData.URL + "/api/merchant/getMerchantInfo",
    data: { merchant_id: merchant_id },
    success(resl) {
      if (resl.data.code == 100) {
        ctx.setData({ merchant: resl.data.data });
      } else {
        wx.showToast({
          title: resl.data.msg,
          icon: 'none'
        })
      }
    }
  })
}