var imgUrls = [
  { id: 1,image: "https://www.niftydose.cn/User/image/d942b0f1bccc4e6c6081bd5f3398fd4e.jpg" },
  { id: 2,image: "https://www.niftydose.cn/User/image/29af4184e336f82a38ecd3de07a01569.jpg" },
  { id: 3,image: "https://www.niftydose.cn/User/image/eacea6d98f57fdcda835003fd8734c14.jpg" },
  { id: 4,image: "https://www.niftydose.cn/User/image/9416f7ac87e99efd8a179dedec15d0c0.jpg" }
]


Page({
  data: {
    imgUrls: imgUrls,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    current: 0,
    contentItems: ['', '', '', ''],
  },
  imageLoad: function () {
    console.log("已经开始加载图片");
    //bindload 图片加载的时候自动设定宽度  
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    })
  }, 
  
  swiperChange: function (event) {
    
    this.setData({
      current: event.detail.current
    })
 
  },
  swipclick: function () {//点击图片触发事件
    console.log(this.data.imgUrls[this.data.current]);
  }

 
})
