// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isInputDiaShow:false,
    inputDiaTitle:'卡号',
    inputDiaInput:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      identity: wx.getStorageSync('identity'),
      id: wx.getStorageSync('id'),
      realName: wx.getStorageSync('realname'),
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

  /**
   * 扫码按钮
   * **/
   onScanTapped: function(){
     /*wx.navigateTo({
       url: '/pages/platform/platform?id=7&action=pay',
     })*/
     
     console.log("开始扫码")
     var that = this;
     wx.scanCode({
       success(res) {
         console.log(res);
         var code = JSON.parse(res.result);
         if (code.time != 0){
           if (new Date().valueOf() - code.time >= 30000) {
             wx.showToast({
               title: '二维码已过期',
               icon: 'none'
             })
           } else {
             if (code.key == md5.hexMD5(code.action + code.data)) {
               console.log("key验证通过");
               var data = JSON.parse(code.data);

               wx.request({
                 url: getApp().globalData.URL + "/api/transcation/setScaned",
                 data: { transcation_id: data.transcation_id, time: parseInt(new Date().getTime() / 1000) }
               })

               wx.navigateTo({
                 url: '/pages/platform/platform?id=' + data.card_id + '&action=' + code.action + '&transcation=' + data.transcation_id,
               })
             }
           }
         }else{
           if (code.key == md5.hexMD5(code.action + code.data)) {
             console.log("key验证通过");
             var data = JSON.parse(code.data);

             wx.request({
               url: getApp().globalData.URL + "/api/transcation/setScaned",
               data: { transcation_id: data.transcation_id, time: parseInt(new Date().getTime() / 1000)}
             })

             wx.navigateTo({
               url: '/pages/platform/platform?id=' + data.card_id + '&action=' + code.action + '&transcation='+data.transcation_id,
             })
           }
         }
       },
       fail(res) {
         wx.showToast({
           title: '扫码失败',
           icon: 'none'
         })
       }
     })
     
   },

  onCardInfoTapped:function(){
    this.setData({ isInputDiaShow:true});
  },
  onInputDiaInput:function(e){
    this.setData({ inputDiaInput:e.detail.value});
  },
  closeDialog:function(){
    this.setData({ isInputDiaShow: false, inputDiaInput:''});
  },
  doDia:function(){
    this.setData({ isInputDiaShow: false});
    wx.navigateTo({
      url: '/pages/platform/platform?id='+this.data.inputDiaInput+'&action=info',
    })
  }
})
const md5 = require("../../static/js/md5.js");