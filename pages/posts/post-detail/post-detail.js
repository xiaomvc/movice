
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options);
		// this.data.news=options;
		this.setData({
			"news": options
		})
	},

	shareItem: function (event) {
		// wx.showToast({
		// 	title:'demo',
		// 	icon:'loading',
		// 	duration:1000
		// })
		// wx.showLoading({
		// 	title:'正在加载'
		// })
		// wx.showModal({
		// 	title: '提示',
		// 	content: '是否删除',
		// 	success: function (res) {
		// 		if (res.confirm) {
		// 			console.log(1);
		// 		} else {
		// 			console.log(2);
		// 		}
		// 	},
		// })

		// wx.showActionSheet({
		// 	itemList:["1","2","3","4","5","6"],
		// 	success:function(res){
		// 		console.log(res.tapIndex);
		// 	}
		// })
		wx.playBackgroundAudio({
			dataUrl: 'http://119.23.14.98/小嫦娥.mp3',
			title: '小嫦娥'
		})



	}

})