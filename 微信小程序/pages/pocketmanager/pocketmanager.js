// pages/pocketmanager/pocketmanager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowHide:false,
    sortByRecent:true,
    cards:[],
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
    getHideCards(this);
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

  cardLongTapped: function (e) {
    var that = this;
    var cardId = e.currentTarget.dataset.cardid;
    wx.showModal({
      title: '恢复',
      content: '是否恢复该会员卡(卡号:' + cardId + ')?你可以在‘卡包‘中查看此卡。',
      showCancel: true,
      cancelText: '取消',
      cancelColor: "#666666",
      confirmText: '恢复',
      confirmColor: "#99CC00",
      success: function (res) {
        if (res.confirm) {
          recoverCard(cardId, that);
        }
      }
    })
  },
})

function getHideCards(ctx) {
  wx.request({
    url: getApp().globalData.URL + "/api/user/getHideCards",
    data: { id: wx.getStorageSync('id') },
    success(resl) {
      console.log(resl);
      if (resl.data.code == 103) {
        wx.showToast({
          title: resl.data.data,
          icon: 'none'
        })
        ctx.setData({
          cards: []
        })
      } else {
        ctx.setData({
          cards: resl.data.data
        })
      }
    }
  });
}

function recoverCard(id, ctx) {
  wx.request({
    url: getApp().globalData.URL + "/api/card/recoverCard",
    data: { card_id: id },
    success(resl) {
      if (resl.data.code == 100) {
        getHideCards(ctx);
        wx.showToast({
          title: '已恢复会员卡'
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