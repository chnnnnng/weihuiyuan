// filldetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone : '',
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

  onphoneinput: function(e){
    this.setData({phone : e.detail.value})
  },

  onrealnameinput: function (e) {
    this.setData({ realname: e.detail.value })
  },

  onSubmit : function(){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo);
              var nickname = res.userInfo.nickName;
              var phone = this.data.phone;
              var realname = this.data.realname;
              filldetail(nickname,phone,realname);
            },
            fail: res => {
              console.log("获取用户信息失败");
            }
          })
        } else {
          console.log("未授权获取用户信息");
        }
      }
    })
  }
})

function filldetail(nickname,phone,realname){
  var wechat = wx.getStorageSync("wechat");
  wx.request({
    url: getApp().globalData.URL +"/api/user/setUserDetail",
    data: { 
      wechat: wechat,
      nickname : nickname,
      phone : phone,
      realname : realname,
    },
    success(resl) {
      console.log(resl);
      if (resl.data.code == 100) {
        wx.setStorageSync('id', resl.data.data);
        wx.setStorageSync('phone', phone);
        wx.setStorageSync('nickname', nickname);
        wx.setStorageSync('realname', realname);
        wx.setStorageSync('identity', 0);
        wx.switchTab({
          url: '/pages/pocket/pocket'
        })
      } 
    }
  });
}