// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.login({
          success: function (res) {
            console.log(res.code);
            wx.request({
              url: getApp().globalData.URL +"/api/user/login",
              data: { code: res.code },
              success(resl) {
                console.log(resl.data.code);
                if(resl.data.code == 101) {//登录成功
                  var data = resl.data.data;
                  wx.setStorageSync('id', data.id);
                  wx.setStorageSync('wechat', data.wechat);
                  wx.setStorageSync('phone', data.phone);
                  wx.setStorageSync('nickname', data.nickname);
                  wx.setStorageSync('realname', data.realname);
                  wx.setStorageSync('identity', data.identity);
                  if (data.identity == 2 || data.identity == 1){
                    wx.setStorageSync('merchant_id', data.merchant_id);
                  }
                  wx.switchTab({
                    url: '/pages/pocket/pocket'
                  })
                }
                else if (resl.data.code == 102) {//请完善信息
                  wx.setStorage({
                    key: 'wechat',
                    data: resl.data.data,
                  })
                  wx.redirectTo({
                    url: '/pages/filldetail/filldetail'
                  })
                } 
              }
            });
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
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
  
  }
})