// pages/qrcode/qrcode.js
var QRCode = require('../../static/js/weapp-qrcode.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcodeWidth:200,
    interv:'',
    interv2:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var text = JSON.stringify({ action: options.action, data: options.data, key: md5.hexMD5(options.action + options.data), time: options.time});
    var qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: text,
      width: 200,
      height: 200,
      colorDark: "#e03636",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
    if(options.refresh != 0){//用于刷新二维码
      that.setData({ title: options.title, caption: "请出示以上二维码(每" + options.refresh+"秒刷新一次)" });
      that.data.interv = setInterval(function () { 
        text = JSON.stringify(
          { action: options.action, data: options.data, key: md5.hexMD5(options.action + options.data), time: new Date().valueOf() }
          );
        console.log("重新生成二维码" + text);
        qrcode.makeCode(text)}, options.refresh*1000);
    }else{
      that.setData({ title: options.title, caption: "请出示以上二维码" });
    }
    that.data.interv2 = setInterval(function(){//用于检测二维码被成功识别等,间隔3秒
      checkPayStatus(JSON.parse(options.data).transcation_id,that);
    },3000);
    
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
    var that = this;
    clearInterval(that.data.interv);
    clearInterval(that.data.interv2);
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
const md5 = require("../../static/js/md5.js");
function checkPayStatus(transcation,ctx){
  var interv1 = ctx.data.interv;
  var interv2 = ctx.data.interv2;
  console.log('正在拉取状态码...');
  wx.request({
    url: getApp().globalData.URL + "/api/transcation/checkStatus",
    data: {transcation_id: transcation },
    success(resl) {
      if (resl.data.code == 100) {
        console.log('当前状态码:' + resl.data.data);
        if(resl.data.data == 1){//交易完成
          clearInterval(interv2);
          wx.redirectTo({
            url: '/pages/msg/msg?transcation='+transcation,
          })
        }else if (resl.data.data == 5){//扫码成功
          clearInterval(interv1);
          wx.showToast({
            title: '等待中',
            icon: 'loading',
            duration: 3000
          });
        }else if(resl.data.data == 3){//扫码取消
          clearInterval(interv1);
          clearInterval(interv2);
          wx.showModal({
            title: resl.data.msg,
            content: '已取消',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      } else {
        wx.showToast({
          title: resl.data.msg,
          icon: 'none'
        })
      }
    }
  })
}