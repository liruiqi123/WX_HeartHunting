const app = getApp();

/*
 小程序利用canvas实现一键保存图片功能 */
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cname: '',
        renwu: '',
        yuyan: '',
        fan: '',
        xg: '',
        imgurl: '',
        canvasHidden: true,     //设置画板的显示与隐藏，画板不隐藏会影响页面正常显示
        wxappName: '页面生成图片',    //小程序名称
        shareImgPath: '',
        screenWidth: '',       //设备屏幕宽度
        shareImgSrc: '',

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;

        wx.getImageInfo({
            src: '../../images/bj.png',
            success: function (res) {
                console.log(res)
                that.setData({
                    shareImgSrc: '../../' + res.path
                });
            }
        })

        wx.getImageInfo({
            src: '../../images/11.png',
            success: function (res) {
                console.log(res)
                that.setData({
                    shareImgPath: '../../' + res.path
                });
            }
        })

        //获取用户设备信息，屏幕宽度
        wx.getSystemInfo({
                success: res => {
                that.setData({
                screenWidth: res.screenWidth
            })
        console.log(that.data.screenWidth)
    }
    })


        that.setData({
            cname: options.id
        });
        var yuyan = new Array('多注意外表，近期将有桃花运', '不要留钱在手，近期将走财运', '留意新认识的人，将遇改变人生的贵人', '走路留意，可能会走狗屎运', '放开吃喝，三个月内你不会发胖', '身边有人正在准备一个惊喜给你');
        var c = Math.floor(Math.random() * 6);
        var renwu = new Array('富察容音', '弘历', '魏璎珞', '娴妃', '高贵妃', '叶太医', '富察·傅恒', '海兰察', '陆晚晚', '明玉');
        var a = Math.floor(Math.random() * 6);
        var fan = new Array('因皇子去世一直耿耿于怀，内心苦闷。富察容音常有胸闷、乳房疼痛的症状，是情志失意导致的乳腺问题。', '前朝政务繁多，后宫妃嫔争宠，后宫女人几乎都有乳腺困扰，皇上命叶太医制出乳丹，帮助解决嫔妃的乳腺问题。', '长期想着复仇，情志不畅，所以月经紊乱，乳房有肿块都不知道。幸得叶太医乳丹相助，帮其解决乳腺问题。', '不能保家人周全，无奈黑化，也一直深受乳腺问题的烦恼。', '唯恐失去皇上宠爱，天天苦于宫斗，饱受乳腺问题烦恼。', '苦于没有疑难杂症给他医治，后被皇上指派解决嫔妃的乳腺问题，研发出乳丹。', '因为没有和心爱的女人在一起，从而抱恨终身。', '心爱的女人在成亲当天自杀，让海兰察心痛一生。', '自身实力与家庭背景都很薄弱，不求富贵，只求安保。', '因体内被纯贵妃扎的针重伤加之受顺嫔挑唆，以金剪插心，自尽而亡。');
        var xg = new Array(
            '管理能力很强。擅长有计划地工作和学习，尤其适合管理大型组织',
            '管理能力较强。能稳重、扎实地做好工作，很少出现意外或有损组织发展的失误',
            '管理能力一般，对你的专业方面的事务性管理尚可。管理方法经常受到情绪的干扰是最大的遗憾',
            '管理能力较差。这可能与你言行自由，不服约束有关',
            '管理能力很差。但你具有较高的艺术创造力，适合从事与艺术有关的具体工作'
           );
        var img = new Array('https://www.niftydose.cn/User/image/4c9b626b59d6a0b38a03089d1da4d906.jpg',
            'https://www.niftydose.cn/User/image/d942b0f1bccc4e6c6081bd5f3398fd4e.jpg',
            'https://www.niftydose.cn/User/image/29af4184e336f82a38ecd3de07a01569.jpg',
            'https://www.niftydose.cn/User/image/eacea6d98f57fdcda835003fd8734c14.jpg',
            'https://www.niftydose.cn/User/image/9416f7ac87e99efd8a179dedec15d0c0.jpg',
            'https://www.niftydose.cn/User/image/1ee16bba3d950f8fce32d8e6d01025b3.jpg',
            'https://www.niftydose.cn/User/image/2114ed95f319b23afa498b6064b90517.jpg',
            'https://www.niftydose.cn/User/image/07682aa82440bd48bec9cfcdf8830fb0.jpg',
            'https://www.niftydose.cn/User/image/2f71cd25f32922035c08071042cda134.jpg',
            'https://www.niftydose.cn/User/image/ff6f46a6ad3c15200f1d380aa1ccde25.jpg');

        if (true) {
            that.setData({
                fan: fan[app.setConfig.answer_flag],
                xg: xg[app.setConfig.answer_flag],
            });
            wx.getImageInfo({
                src: img[app.setConfig.answer_flag],
                success: function (res) {
                    console.log(res)
                    that.setData({
                        imgurl: res.path
                    });
                }
            })
        }

        that.setData({
            yuyan:yuyan[c],
            renwu: renwu[a]
        });

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var that = this;
        var context = wx.createCanvasContext('share')
        context.setStrokeStyle("#00ff00")
        context.setLineWidth(1)
        context.stroke()
        context.draw(false, this.getTempFilePath)
    },

    //获取临时路径
    getTempFilePath: function () {
        wx.canvasToTempFilePath({
                canvasId: 'share',
                success: (res) => {
                this.setData({
                shareTempFilePath: res.tempFilePath
            })
    }
    })
    },
    /**
     * 绘制多行文本，由于文字比较多，这里我们写了一个函数处理
     */
    drawText: function (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
        var lineWidth = 0;
        var lastSubStrIndex = 0; //每次开始截取的字符串的索引
        for (let i = 0; i < str.length; i++) {
            lineWidth += ctx.measureText(str[i]).width;
            if (lineWidth > canvasWidth) {
                ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
                initHeight += 16; //16为字体的高度
                lineWidth = 0;
                lastSubStrIndex = i;
                titleHeight += 30;
            }
            if (i == str.length - 1) { //绘制剩余部分
                ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
            }
        }
        // 标题border-bottom 线距顶部距离
        titleHeight = titleHeight + 10;
        return titleHeight
    },

    //保存至相册
    saveImageToPhotosAlbum: function () {
        var that = this;
        var unit = that.data.screenWidth / 375
        //2. canvas绘制文字和图片
        const ctx = wx.createCanvasContext('share');
        var bgImgPath = that.data.shareImgSrc;
        var fanstr = '前世烦恼：' + that.data.fan;
        var rwxg = '人物性格：' + that.data.xg;

        //这里很重要，主要就是布局
        ctx.drawImage(bgImgPath, 0, 0, 375, 580);
        ctx.drawImage(that.data.shareImgPath, 50, 450, 284, 80);
        ctx.drawImage(that.data.imgurl, 146, 100, 100, 100);
        ctx.setFontSize(13)
        ctx.setFillStyle('#5e7436')
        ctx.fillText('姓名：' + that.data.cname, 50, 241)
        ctx.fillText('人物匹配：' + that.data.renwu, 50, 271);
        ctx.fillText('近期预言：' + that.data.yuyan, 50, 300);

        this.drawText(ctx, fanstr, 50, 330, 145, 280);
        this.drawText(ctx, rwxg, 50, 400, 145, 280);
        //ctx.fillText('前世烦恼：' + that.data.fan, 50, 330);
        //ctx.fillText('人物性格：' + that.data.xg, 50, 360);
        ctx.stroke()
        ctx.draw(false, function() {
            // 3. canvas画布转成图片
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 375,
                height: 580,
                destWidth: 375,
                destHeight: 580,
                canvasId: 'share',
                success: function (res) {
                    console.log(res);
                    that.setData({
                        shareImgSrc: res.tempFilePath
                    })
                    if (!res.tempFilePath) {
                        wx.showModal({
                            title: '提示',
                            content: '图片绘制中，请稍后重试',
                            showCancel: false
                        })
                    }
                    //4. 当用户点击分享到朋友圈时，将图片保存到相册
                    wx.saveImageToPhotosAlbum({
                        filePath: that.data.shareImgSrc,
                        success(res) {
                            console.log(res);
                            wx.showModal({
                                title: '图片保存成功',
                                content: '图片成功保存到相册了，去发圈噻~',
                                showCancel: false,
                                confirmText: '好哒',
                                confirmColor: '#72B9C3',
                                success: function (res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定');
                                    }
                                    that.setData({
                                        canvasHidden: true
                                    })
                                }
                            })
                        }
                    })
                },
                fail: function (res) {
                    console.log(res)
                }
            })
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const that = this;
        wx.downloadFile({
            url: that.data.shareImgSrc,
            success: function (res) {
                that.data.shareImgSrc = res.tempFilePath
            }, fail: function (res) {
            }
        })
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
