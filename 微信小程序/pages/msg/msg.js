// pages/msg/msg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount:0,
    type:0,
    mark:'',
    transcation:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.URL + "/api/transcation/getTranscationInfo",
      data: { transcation_id: options.transcation },
      success(resl) {
        if (resl.data.code == 100) {
          that.setData({
            transcation:resl.data.data.id,
            type:resl.data.data.type,
            amount:resl.data.data.amount,
            tips: "交易时间:" + new Date(parseInt(resl.data.data.time) * 1000).Format('yy-MM-dd hh:mm:ss')
          });
        } else {
          wx.showToast({
            title: resl.data.msg,
            icon: 'none'
          })
        }
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
  
  },

  buttonTapped: function(){
    var transcation = this.data.transcation;
    var time = parseInt(new Date().getTime() / 1000);
    var mark = this.data.mark;
    wx.request({
      url: getApp().globalData.URL + "/api/transcation/setConfirmed",
      data: { transcation_id: transcation, time: time ,mark:mark}
    })
    wx.navigateBack({
      delta: 1
    })
  },

  onMark: function(e){
    this.setData({mark:e.detail.value});
  }
})


Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}