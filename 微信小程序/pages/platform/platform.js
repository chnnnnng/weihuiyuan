// pages/platform/platform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card:{},
    isPayDiaShow: false,
    isDepositDiaShow: false,
    isCreditDiaShow: false,
    isDecreditDiaShow: false,
    status:100,
    payInput:'',
    depositInput:'',
    creditInput: '',
    decreditInput: '',
    action:'',
    transcation:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getCardInfo(options.id, this);
    this.setData({ action: options.action});
    switch(options.action){
      case 'pay':
        this.setData({ isPayDiaShow:true,transcation:options.transcation});
        break;
      case 'deposit':
        this.setData({ isDepositDiaShow: true, transcation: options.transcation});
        break;
      case 'credit':
        this.setData({ isCreditDiaShow: true, transcation: options.transcation});
        break;
      case 'decredit':
        this.setData({ isDecreditDiaShow: true , transcation: options.transcation});
        break;
      case 'info':
        break;
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

  onPayInput: function (e){
    this.setData({ payInput: e.detail.value});
    if (e.detail.value > this.data.card.balance){
      this.setData({ status:11});
    }else{
      this.setData({ status:100});
    }
  },

  onDepositInput: function (e) {
    this.setData({ depositInput: e.detail.value });
  },

  onCreditInput: function (e) {
    this.setData({ creditInput: e.detail.value });
  },

  onDecreditInput: function (e) {
    this.setData({ decreditInput: e.detail.value });
    if (e.detail.value > this.data.card.credit) {
      this.setData({ status: 12 });
    } else {
      this.setData({ status: 100 });
    }
  },

  onPayTapped:function(){
    if(this.data.payInput == ''){
      wx.showToast({
        title: '请输入金额',
        icon: 'none'
      })
    }else{
      doPay(this.data.card.id,this.data.payInput,this);
    }
  },

  onDepositTapped: function () {
    if (this.data.depositInput == '') {
      wx.showToast({
        title: '请输入金额',
        icon: 'none'
      })
    } else {
      doDeposit(this.data.card.id, this.data.depositInput,this);
    }
  },

  onCreditTapped: function () {
    if (this.data.creditInput == '') {
      wx.showToast({
        title: '请输入数值',
        icon: 'none'
      })
    } else {
      doCredit(this.data.card.id, this.data.creditInput,this);
    }
  },

  onDecreditTapped: function () {
    if (this.data.decreditInput == '') {
      wx.showToast({
        title: '请输入数值',
        icon: 'none'
      })
    } else {
      doDecredit(this.data.card.id, this.data.decreditInput,this);
    }
  },

  closeDialog:function(){
    this.setData({
      isPayDiaShow:false,
      isDepositDiaShow:false,
      isCreditDiaShow:false,
      isDecreditDiaShow: false,

      payInput: '',
      depositInput: '',
      creditInput: '',
      decreditInput: '',
    });
    
  },

  onPayDiaShowTapped: function () {
    this.setData({
      isPayDiaShow: true
    });
  },

  onDepositDiaShowTapped: function () {
    this.setData({
      isDepositDiaShow: true
    });
  },

  onCreditDiaShowTapped: function () {
    this.setData({
      isCreditDiaShow: true
    });
  },

  onDecreditDiaShowTapped: function () {
    this.setData({
      isDecreditDiaShow: true
    });
  },
})

function getCardInfo(id, ctx) {
  wx.request({
    url: getApp().globalData.URL + "/api/card/getCardInfo",
    data: { card_id: id },
    success(resl) {
      if (resl.data.code == 100) {
        if(resl.data.data.merchant_id !== wx.getStorageSync('merchant_id')){
          wx.showModal({
            title: '警告',
            content: '您没有权限进行该操作',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }else{
          ctx.setData({ card: resl.data.data });
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
function doPay(id,amt,ctx){
  var transcation = ctx.data.transcation;
  wx.request({
    url: getApp().globalData.URL + "/api/merchant/minusBalance",
    data: { card_id: id,balance:amt ,transcation_id:transcation},
    success(resl) {
      if (resl.data.code == 100) {
        ctx.closeDialog();
        wx.showModal({
          title: resl.data.msg,
          content: '收款成功，会员卡余额：'+resl.data.data,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
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
function doDeposit(id, amt, ctx) {
  var transcation = ctx.data.transcation;
  wx.request({
    url: getApp().globalData.URL + "/api/merchant/plusBalance",
    data: { card_id: id, balance: amt, transcation_id: transcation },
    success(resl) {
      if (resl.data.code == 100) {
        ctx.closeDialog();
        wx.showModal({
          title: resl.data.msg,
          content: '充值成功，会员卡余额：' + resl.data.data,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
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
function doCredit(id, amt, ctx) {
  var transcation = ctx.data.transcation;
  wx.request({
    url: getApp().globalData.URL + "/api/merchant/plusCredit",
    data: { card_id: id, credit: amt, transcation_id: transcation },
    success(resl) {
      if (resl.data.code == 100) {
        ctx.closeDialog();
        wx.showModal({
          title: resl.data.msg,
          content: '积分成功，现有积分：' + resl.data.data,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
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
function doDecredit(id, amt, ctx) {
  var transcation = ctx.data.transcation;
  wx.request({
    url: getApp().globalData.URL + "/api/merchant/minusCredit",
    data: { card_id: id, credit: amt, transcation_id: transcation },
    success(resl) {
      if (resl.data.code == 100) {
        ctx.closeDialog();
        wx.showModal({
          title: resl.data.msg,
          content: '收款成功，剩余积分：' + resl.data.data,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
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