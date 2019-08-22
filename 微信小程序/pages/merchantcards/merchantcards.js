// pages/merchantcards/mechantcards.js
var QRCode = require('../../static/js/weapp-qrcode.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcodeWidth: 200,
    cards:[],
    isDia : false,
    showFooter:false,
  },

  qrcode:null,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var text = "UNKNOWN";
    this.qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: text,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
    if(wx.getStorageSync('identity') == 2){
      this.setData({showFooter:true});
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
    getCards(this);
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

  cardTapped: function(e){
    var cardid = e.currentTarget.dataset.cardid;
    var text = JSON.stringify(
      {action: 'newCard', data: cardid, key: md5.hexMD5('newCard' + cardid)}
    );
    this.qrcode.makeCode(text);
    this.setData({isDia:true});
  },

  closeDia: function(){
    this.setData({ isDia: false });
  }
})
const md5 = require("../../static/js/md5.js");
function getCards(ctx) {
  wx.request({
    url: getApp().globalData.URL + "/api/merchant/getCardsIds",
    data: { merchant_id: wx.getStorageSync('merchant_id') },
    success(resl) {
      console.log(resl);
      if (resl.data.code == 103) {
        wx.showToast({
          title: '没有会员卡',
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