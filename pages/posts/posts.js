var postData = require('../../data/post-data.js');
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
		// 绑定数据
		this.setData({
			newslist: postData.postList
		});
		//  this.data.newslist=postData.postList;
	},
	showNews: function (event) {
		// console.log(event.currentTarget.dataset.newsid);
		//页面跳转
		wx.navigateTo({
			url: "post-detail/post-detail?id=" + event.currentTarget.dataset.newsid
		});
		// wx.redirectTo({
		// 	url: 'post-detail/post-detail',
		// })
	},
	onReady:function(){
		wx.setNavigationBarTitle({
			title: '久违的音乐',
		})
	}
})