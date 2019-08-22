// pages/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: { "lon": 119.92396, "lat": 31.70173 },
    items:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    goMyLocation(this);
    fetchItems(this,options.cla);
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

  backhome: function (event) {
    this.setData(
      {
        location: {
          "lon": myLon,
          "lat": myLat
        }
      });
  }
})

var myLon, myLat = null;

function goMyLocation(context) {
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

function fetchItems(con,cla){
  console.log("正在为您查找"+cla);
  con.setData({
    items:[
      {
        pointid:1000000,
        pointname:"青松电脑数码科技",
        phone:"15151962448",
        contactname:"陈先生",
        location:"庙桥邮电路17号",
        knockdoor:true,
        lon:119.98134,
        lat: 31.65161,
        timeavailable:"24小时",
      }
    ]
  });
}
