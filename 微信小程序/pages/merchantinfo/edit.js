// pages/merchantinfo/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchant:{},
    typeIndex:0,
    types:[],
    name:'',
    location:'',
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getMerchantInfo(wx.getStorageSync('merchant_id'), this);
    getMerchantTypes(wx.getStorageSync('merchant_id'), this);
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
    this.setData({typeIndex:e.detail.value})
  },
  onNameInput: function(e){
    this.setData({ name: e.detail.value })
  },
  onLocationInput: function (e) {
    this.setData({ location: e.detail.value })
  },
  onSubmit: function () {
    wx.request({
      url: getApp().globalData.URL + "/api/merchant/update",
      data: { 
        user_id: wx.getStorageSync('id'),
        merchant_id: wx.getStorageSync('merchant_id'),
        name: this.data.name,
        location: this.data.location,
        type: this.data.types[this.data.typeIndex]
        },
      success(resl) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
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
function getMerchantTypes(merchant_id, ctx) {
  wx.request({
    url: getApp().globalData.URL + "/api/merchant/getMerchantTypes",
    success(resl) {
      ctx.setData({ types: resl.data.data });
      resl.data.data.forEach(function(c,i){
        if(c == ctx.data.merchant.type){
          ctx.setData({typeIndex:i});
        }
      })
    }
  })
}