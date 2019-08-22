// pages/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: [
      /*
      {
        "id": 421897901,
        "initial_date": "2019-07-11",
        "card_name": "二蛋理发店积分卡",
        "type": 0
      },
      {
        "id": 178907908,
        "initial_date": "2019-06-17",
        "card_name": "张三童装店充值卡",
        "type": 1
      },
      {
        "id": 789170979,
        "initial_date": "2019-05-25",
        "card_name": "洗不干净干洗店会员卡",
        "type": 2
      },
      {
        "id": 125981923,
        "initial_date": "2019-04-09",
        "card_name": "超级好吃奶茶店八折卡",
        "type": 3
      },
      {
        "id": 7482719201,
        "initial_date": "2019-04-01",
        "card_name": "ABC服装城会员积分卡",
        "type": 0
      }
      */
    ],
    animationData : {},
    cardAnm : {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("id:"+wx.getStorageSync('id'));
    console.log("openid:"+wx.getStorageSync('wechat'));
    console.log("nickname:"+wx.getStorageSync('nickname'));
    console.log("realname:"+wx.getStorageSync('realname'));
    console.log("phone:" + wx.getStorageSync('phone'));
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
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateX(50).step();
    this.setData({
      cardAnm: animation.export()
    });
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
   * 会员卡组件点击事件
   * **/
  cardTapped: function(e){
     var cardId = e.currentTarget.dataset.cardid;
     console.log("会员卡"+cardId+"被点击");
     wx.navigateTo({
       url: '/pages/cardInfo/cardInfo?card_id='+cardId,
     })
   },

  /**
  * 会员卡组件长按事件
  * **/
  cardLongTapped: function (e) {
    var that = this;
    var cardId = e.currentTarget.dataset.cardid;
    console.log("会员卡" + cardId + "被长按");
    wx.showModal({
      title: '隐藏会员卡',
      content: '是否隐藏该会员卡(卡号:'+cardId+')?你可以在‘隐藏的会员卡‘中查看此卡。',
      showCancel:true,
      cancelText:'取消',
      cancelColor:"#99CC00",
      confirmText:'隐藏',
      confirmColor:"#FF0033",
      success : function(res){
        if(res.confirm){
          hideCard(cardId,that);
        }
      }
    })
  },

   /**
    *扫一扫点击事件 
    **/
  scanTapped: function(e){
    console.log("开始扫码")
    var that = this;
    wx.scanCode({
      success(res) {
        console.log(res);
        var code = JSON.parse(res.result);
        if (code.action == "newCard"){
          if (code.key == md5.hexMD5(code.action + code.data)){
            addCard(code.data,that);
          }
        }
      },
      fail(res){
        wx.showToast({
          title: '扫码失败',
          icon: 'none'
        })
      }
    })
  },
})

function getCards(ctx) {
  wx.request({
    url: getApp().globalData.URL+"/api/user/getCards",
    data: { id: wx.getStorageSync('id') },
    success(resl) {
      console.log(resl);
      if(resl.data.code == 103){
        wx.showToast({
          title: '还没有任何会员卡',
          icon: 'none'
        })
        ctx.setData({
          cards: []
        })
      }else{
        ctx.setData({
          cards: resl.data.data
        })
      }
    }
  });
}

function addCard(id,ctx){
  wx.request({
    url: getApp().globalData.URL + "/api/card/create",
    data:{user_id:wx.getStorageSync('id'),card_id:id},
    success(resl){
      if(resl.data.code == 100){
        getCards(ctx);
        wx.showToast({
          title: '添加会员卡成功'
        })
      }else{
        wx.showToast({
          title: resl.data.msg,
          icon: 'none'
        })
      }
    }
  })
}

function hideCard(id, ctx) {
  wx.request({
    url: getApp().globalData.URL + "/api/card/hideCard",
    data: { card_id: id },
    success(resl) {
      if (resl.data.code == 100) {
        getCards(ctx);
        wx.showToast({
          title: '已隐藏会员卡'
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

const md5 = require("../../static/js/md5.js");