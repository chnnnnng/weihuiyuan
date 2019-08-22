// pages/bill/bill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card:'',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      card:options.card,
      name:options.name
    });  
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
    getBills(this);
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

function getBills(ctx) {
  wx.request({
    url: getApp().globalData.URL + "/api/card/getCardBill",
    data: { card_id : ctx.data.card},
    success(resl) {
      console.log(resl);
      if (resl.data.code == 106) {
        wx.showToast({
          title: '还没有任何记录',
          icon: 'none'
        })
        ctx.setData({
          bills: []
        })
      } else {
        resl.data.data.forEach(function(cur){
          cur.time = new Date(parseInt(cur.time) * 1000).Format('yy-MM-dd hh:mm:ss')
        });
        ctx.setData({
          bills: resl.data.data
        })
      }
    }
  });
}

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
