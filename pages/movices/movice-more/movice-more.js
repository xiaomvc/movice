// pages/movices/movice-more/movice-more.js
var util = require("../../../utils/util.js");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		moreMovice: {},
		total: 0,
		url: {},
		isRefresh: true
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
		this.data.url = url;//获取当前访问的地址
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
	/**
	 * 下拉刷新
	 */
	onPullDownRefresh: function () {
		wx.startPullDownRefresh(
			//重新加载数据
			this.data.total = 0,
			this.data.moreMovice = {},
			util.http(this.data.url, this, "moreMovice")

		)
	},
	//上拉更新更多
	loadMore: function () {

		this.data.total += 20;//每次添加的数量
		//在导航栏中显示加载动画
		wx.showNavigationBarLoading(),
			util.http(this.data.url + "?start=" + this.data.total + "&count=20", this, "moreMovice", '', this.data.isRefresh),
			wx.hideNavigationBarLoading()

	}
})