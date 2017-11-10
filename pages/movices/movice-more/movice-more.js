// pages/movices/movice-more/movice-more.js
var util = require("../../../utils/util.js");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		moreMovice: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var category = options.category;
		this.data.category = category;
		switch (category) {
			case "正在热映":
				var url = "/v2/movie/in_theaters";
				break;
			case "即将上映":
				var url = "/v2/movie/coming_soon";
				break;
			case "口碑榜":
				var url = "/v2/movie/top250";

		}
		util.http(url, this, "moreMovice", category);
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		wx.setNavigationBarTitle({
			title: this.data.category,
		})
	},

	onPullDownRefresh: function () {
		console.log(111);
		wx.startPullDownRefresh(console.log(123))
	}
})