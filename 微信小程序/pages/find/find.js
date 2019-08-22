// pages/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: { "lon": 119.92396, "lat": 31.70173},
    markers: [{
      longitude: 119.92396, latitude: 31.70173, iconPath: "/static/imgs/mylocationpin.png",width: 30,height: 30,}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    goMyLocation(this);
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

  mewant: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '../catalog/catalog'
    })
  },

  backhome: function(event){
    this.setData(
      {
        location: {
          "lon": myLon,
          "lat": myLat
        }
        });
  }

})

var myLon,myLat = null;

function goMyLocation(context){
  wx.getLocation({
    type: 'gcj02',
    success: function (res) {
      console.log("你的经度：" + res.longitude + "纬度：" + res.latitude)
      myLon = res.longitude;
      myLat = res.latitude;
      context.setData(
        {
          location: {
            "lon": myLon,
            "lat": myLat
          },
          markers: [{
            longitude: myLon,
            latitude: myLat,
            iconPath: "/static/imgs/mylocationpin.png",
            width: 30,
            height: 30,
            callout: {
              content: "这是我",
              color: "#FFFFFF",
              fontSize: 13,
              padding: 5,
              borderRadius: 50,
              bgColor: "#72c0f1",
              display: "BYCLICK",
            }
          }]
        }
      );
    }
  })
}
