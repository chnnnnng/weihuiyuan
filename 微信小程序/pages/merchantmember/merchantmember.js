// pages/merchantmember/merchantmember.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    members:[],
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
    getMembers(this);
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

  memberLongTapped: function (e) {
    var that = this;
    var userId = e.currentTarget.dataset.memberid;
    var userType = e.currentTarget.dataset.membertype;
    console.log(e.currentTarget.dataset);
    if(userType == 1){
      wx.showModal({
        title: '删除成员',
        content: '是否删除该成员(ID:' + userId + ')?',
        showCancel: true,
        cancelText: '取消',
        cancelColor: "#99CC00",
        confirmText: '删除',
        confirmColor: "#FF0033",
        success: function (res) {
          if (res.confirm) {
            removeMember(userId, that);
          }
        }
      })
    }else if(userType == 2){
      wx.showToast({
        title: '管理员不能删除',
        icon: 'none'
      })
    }
    
  },
})

function getMembers(ctx) {
  wx.request({
    url: getApp().globalData.URL + "/api/merchant/getMember",
    data: { merchant_id: wx.getStorageSync('merchant_id') },
    success(resl) {
      console.log(resl);
      if (resl.data.code == 100) {
        ctx.setData({
          members: resl.data.data
        })
      } else {
        wx.showToast({
          title: '发生未知错误',
        })
      }
    }
  });
}
function removeMember(userid, ctx) {
  wx.request({
    url: getApp().globalData.URL + "/api/merchant/removeMember",
    data: { user_id: userid },
    success(resl) {
      if (resl.data.code == 100) {
        getMembers(ctx);
        wx.showToast({
          title: '已删除'
        })
      } else {
        wx.showToast({
          title: resl.data.msg,
          icon: 'none'
        })
      }
    }
  })
}