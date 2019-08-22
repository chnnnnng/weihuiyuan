// pages/cardInfo/cardInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card:{
      "id": 421897901,
      "initial_date": "2019-07-11",
      "card_name": "二蛋理发店积分卡",
      "type": 0
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ card_id: options.card_id});
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
    getCardInfo(this.data.card_id, this);
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

  onPayCodeTapped: function (e){
    var card_id = this.data.card.id;
    wx.request({
      url: getApp().globalData.URL + "/api/transcation/makePretranscation",
      data: {
        user: wx.getStorageSync('id'),
        card: this.data.card.id,
        type: 1, 
        time: parseInt(new Date().getTime() / 1000)
         },
      success(resl) {
        if (resl.data.code == 100) {
          var text = JSON.stringify({ card_id: card_id, transcation_id: resl.data.data });
          wx.navigateTo({
            url: '/pages/qrcode/qrcode?action=pay&data=' + text + '&refresh=30&title=付款码&time=' + new Date().valueOf(),
          })
        } else {
          wx.showToast({
            title: resl.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  onDecreditCodeTapped: function (e) {
    var card_id = this.data.card.id;
    wx.request({
      url: getApp().globalData.URL + "/api/transcation/makePretranscation",
      data: {
        user: wx.getStorageSync('id'),
        card: this.data.card.id,
        type: 3,
        time: parseInt(new Date().getTime() / 1000)
      },
      success(resl) {
        if (resl.data.code == 100) {
          var text = JSON.stringify({ card_id: card_id, transcation_id: resl.data.data });
          wx.navigateTo({
            url: '/pages/qrcode/qrcode?action=decredit&data=' + text + '&refresh=30&title=积分付款码&time=' + new Date().valueOf(),
          })
        } else {
          wx.showToast({
            title: resl.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  onDepositCodeTapped: function (e) {
    var card_id = this.data.card.id;
    wx.request({
      url: getApp().globalData.URL + "/api/transcation/makePretranscation",
      data: {
        user: wx.getStorageSync('id'),
        card: this.data.card.id,
        type: 0,
        time: parseInt(new Date().getTime() / 1000)
      },
      success(resl) {
        if (resl.data.code == 100) {
          var text = JSON.stringify({ card_id: card_id, transcation_id: resl.data.data });
          wx.navigateTo({
            url: '/pages/qrcode/qrcode?action=deposit&data=' + text + '&refresh=0&title=充值码&time=0',
          })
        } else {
          wx.showToast({
            title: resl.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  onCreditCodeTapped: function (e) {
    var card_id = this.data.card.id;
    wx.request({
      url: getApp().globalData.URL + "/api/transcation/makePretranscation",
      data: {
        user: wx.getStorageSync('id'),
        card: this.data.card.id,
        type: 2,
        time: parseInt(new Date().getTime() / 1000)
      },
      success(resl) {
        if (resl.data.code == 100) {
          var text = JSON.stringify({ card_id: card_id, transcation_id: resl.data.data });
          wx.navigateTo({
            url: '/pages/qrcode/qrcode?action=credit&data=' + text + '&refresh=0&title=积分码&time=0',
          })
        } else {
          wx.showToast({
            title: resl.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  onCardInfoCodeTapped: function(){
    var text = JSON.stringify({ card_id: this.data.card.id});
    wx.navigateTo({
      url: '/pages/qrcode/qrcode?action=info&data=' + text + '&refresh=0&title=卡片信息&time=0',
    })
  },

  onBillTapped: function () {
    wx.navigateTo({
      url: '/pages/bill/bill?card=' + this.data.card.id +'&name='+this.data.card.card_name,
    })
  },

  onMerchantInfoTapped: function(){
    wx.navigateTo({
      url: '/pages/merchantinfo/merchantinfo?mid='+this.data.card.merchant_id,
    })
  }
})

function getCardInfo(id, ctx) {
  wx.request({
    url: getApp().globalData.URL + "/api/card/getCardInfo",
    data: { card_id: id },
    success(resl) {
      if (resl.data.code == 100) {
        ctx.setData({card:resl.data.data});
      } else {
        wx.showToast({
          title: resl.data.msg,
          icon: 'none'
        })
      }
    }
  })
}
